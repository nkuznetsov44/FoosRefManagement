from datetime import datetime
from django.test import TestCase
from .models import InvitationToken, InvitationTokenStatus
from app.models import Referee
from telegram_auth.models import TelegramUser


class InvitationTokenTestCase(TestCase):
    def setUp(self):
        Referee.objects.create(
            first_name='John',
            last_name='Doe',
            first_name_en='John',
            last_name_en='Doe',
            languages=['EN'],
            rank_update=datetime.now()
        )
        TelegramUser.objects.create(
            telegram_user_id=2,
            first_name='Jane',
            last_name='Roe',
            username='janeroe',
            photo_url='https://janeroe.invalid'
        )

    def testTokenFlowSuccess(self):
        johndoe_referee = Referee.objects.get(first_name='John', last_name='Doe')
        janeroe = TelegramUser.objects.get(first_name='Jane', last_name='Roe')

        token = InvitationToken.objects.issue_token(
            issued_by_telegram_user_id=janeroe.telegram_user_id,
            issued_for_referee_id=johndoe_referee.id
        )
        self.assertEquals(token.status, InvitationTokenStatus.ISSUED)

        another_token = InvitationToken.objects.issue_token(
            issued_by_telegram_user_id=janeroe.telegram_user_id,
            issued_for_referee_id=johndoe_referee.id
        )
        self.assertEquals(another_token.status, InvitationTokenStatus.ISSUED)

        johndoe = token.create_and_bind_user(
            telegram_user_id=1,
            first_name='John',
            last_name='Doe',
            username='johndoe',
            photo_url='https://johndoe.invalid'
        )

        johndoe_referee = Referee.objects.get(first_name='John', last_name='Doe')
        token = InvitationToken.objects.get(token=token.token)
        another_token = InvitationToken.objects.get(token=another_token.token)

        self.assertEquals(johndoe_referee.user, johndoe)
        self.assertEquals(token.status, InvitationTokenStatus.COMPLETED)
        self.assertEquals(another_token.status, InvitationTokenStatus.CANCELLED)
