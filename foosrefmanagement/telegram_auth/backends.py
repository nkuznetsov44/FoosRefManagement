from typing import Dict, Any, Optional
import jwt
import time
import hashlib
import hmac
from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from rest_framework.exceptions import AuthenticationFailed
from .models import TelegramUser


class TelegramAuthenticationError(AuthenticationFailed):
    pass


class TelegramDataNotValid(TelegramAuthenticationError):
    pass


class TelegramAuthentication(BaseBackend):
    def authenticate(self, request, *, data: Dict[str, Any]) -> Optional[TelegramUser]:
        _data = data.copy()

        try:
            telegram_user_id = _data['id']
            auth_date = _data['auth_date']
            hash = _data.pop('hash')
        except KeyError as ke:
            raise TelegramAuthenticationError('"id", "auth_date" and "hash" fields are required') from ke

        data_check_string = '\n'.join(f'{key}={value}' for key, value in sorted(_data.items()))
        self._verify_telegram_data(hash, data_check_string, auth_date)

        try:
            return TelegramUser.objects.get(telegram_user_id=telegram_user_id)
        except TelegramUser.DoesNotExist as dne:
            # TODO: logger
            raise TelegramAuthenticationError(f'User with id = "{telegram_user_id}" does not exist') from dne

    def _verify_telegram_data(self, hash: str, data_check_string: str, auth_date: str) -> None:
        secret_key = hashlib.sha256(settings.TELEGRAM_BOT_API_TOKEN.encode()).digest()
        _hash = hmac.new(secret_key, msg=data_check_string.encode(), digestmod=hashlib.sha256).hexdigest()

        unix_time_now = int(time.time())
        unix_time_auth_date = int(auth_date)

        if unix_time_now - unix_time_auth_date > settings.TELEGRAM_AUTH_DATA_LIFETIME:
            # TODO: logger
            raise TelegramDataNotValid('Authentication data is outdated.')

        if _hash != hash:
            # TODO: logger
            print(_hash)
            raise TelegramDataNotValid(
                'Data integrity was not verified. Hash recieved from authentication data does not match '
                'the calculated hash based on bot token.'
            )
