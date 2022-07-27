from typing import Optional
import uuid
import time
from django.conf import settings
from django.db import models, transaction
from app.models import Referee
from telegram_auth.models import TelegramUser


class InvitationTokenError(ValueError):
    pass


class InvitationTokenStatus(models.TextChoices):
    ISSUED = 'ISSUED', 'Issued'
    COMPLETED = 'COMPLETED', 'Completed'
    CANCELLED = 'CANCELLED', 'Cancelled'


class InvitationTokenManager(models.Manager):
    def issue_token(self, issued_by_telegram_user_id: int, issued_for_referee_id: int):
        issued_for = Referee.objects.get(id=issued_for_referee_id)
        if issued_for.user:
            raise InvitationTokenError(f'Referee {issued_for} is already linked to user {issued_for.user}')
        issued_by = TelegramUser.objects.get(telegram_user_id=issued_by_telegram_user_id)
        
        token = InvitationToken(
            issued_by=issued_by,
            issue_timestamp=int(time.time()),
            issued_for_referee=issued_for,
            status=InvitationTokenStatus.ISSUED
        )
        token.save()

        return token


class InvitationToken(models.Model):
    objects = InvitationTokenManager()

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    issued_by = models.ForeignKey(TelegramUser, on_delete=models.CASCADE, related_name='issued_invitation_tokens')
    issue_timestamp = models.IntegerField()
    issued_for_referee = models.ForeignKey(Referee, on_delete=models.CASCADE, related_name='invitation_tokens')
    status = models.CharField(
        max_length=63, choices=InvitationTokenStatus.choices, default=InvitationTokenStatus.ISSUED
    )

    @property
    def is_expired(self):
        return int(time.time()) - self.issue_timestamp > settings.INVITATION_TOKEN_LIFETIME

    @property
    def is_valid(self):
        return self.status == InvitationTokenStatus.ISSUED

    @transaction.atomic
    def create_and_bind_user(
        self,
        telegram_user_id: int,
        first_name: Optional[str] = None,
        last_name: Optional[str] = None,
        username: Optional[str] = None,
        photo_url: Optional[str] = None
    ):
        if self.is_expired:
            # TODO: logger
            raise InvitationTokenError('Token expired')
        if not self.is_valid:
            # TODO: logger
            raise InvitationTokenError('Token is invalid')

        user = TelegramUser(
            telegram_user_id=telegram_user_id,
            first_name=first_name,
            last_name=last_name,
            username=username,
            photo_url=photo_url
        )
        user.save()

        self.issued_for_referee.user = user
        self.issued_for_referee.save()

        self.status = InvitationTokenStatus.COMPLETED
        self.save()

        (
            InvitationToken.objects
            .filter(issued_for_referee=self.issued_for_referee)
            .exclude(uuid=self.uuid)
            .update(status=InvitationTokenStatus.CANCELLED)
        )

        return user
