from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class TelegramUserManager(BaseUserManager):
    def create_user(self, telegram_user_id, password=None, is_superuser=False):
        if telegram_user_id is None:
            raise TypeError('Telegram user must have an id')

        if password is not None and not is_superuser:
            raise TypeError('Regular TelegramUser cannot have a password')

        user = self.model(telegram_user_id=telegram_user_id)
        if is_superuser:
            user.set_password(password)
            user.is_superuser = True
            user.is_staff = True
        else:
            user.set_unusable_password()

        user.save()
        return user

    def create_superuser(self, telegram_user_id, password=None):
        if password is None:
            raise TypeError('Superusers must have a password')

        return self.create_user(telegram_user_id, password, is_superuser=True)


class TelegramUser(AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = 'telegram_user_id'
    objects = TelegramUserManager()

    telegram_user_id = models.IntegerField(primary_key=True, unique=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(max_length=255, blank=True, null=True)
    photo_url = models.CharField(max_length=255, blank=True, null=True)

    @property
    def is_staff(self):
        return self.is_superuser

    def __str__(self):
        if self.username:
            return f'@{self.username}'
        if self.first_name or self.last_name:
            return f'{self.first_name} {self.last_name}'
        return f'<TelegramUser id="{self.telegram_user_id}">'
