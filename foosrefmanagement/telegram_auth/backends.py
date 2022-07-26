from typing import Dict, Any, Optional
import jwt
import time
import hashlib
import hmac
from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from rest_framework.authentication import BaseAuthentication, get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
from .models import TelegramUser


ONE_HOUR_IN_SECONDS = 3600
ONE_DAY_IN_SECONDS = 86400


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

        if unix_time_now - unix_time_auth_date > ONE_DAY_IN_SECONDS:
            # TODO: logger
            raise TelegramDataNotValid('Authentication data is outdated.')

        if _hash != hash:
            # TODO: logger
            print(_hash)
            raise TelegramDataNotValid(
                'Data integrity was not verified. Hash recieved from authentication data does not match '
                'the calculated hash based on bot token.'
            )


class JWTAuthenticationError(AuthenticationFailed):
    pass


class JWTSessionExpired(JWTAuthenticationError):
    pass


class DRFJWTAuthentication(BaseAuthentication):
    authentication_header_prefix = 'Bearer'

    def authenticate(self, request):
        try:
            token = self._get_token(request)
            user = self._auth_from_token(token)
            return user, token
        except:
            return None

    def _get_token(self, request):
        auth_header = get_authorization_header(request).split()
        if not auth_header:
            # If authentication is not attempted, return None. Any other authentication schemes also in use will still be checked.
            return None

        if len(auth_header) != 2:
            # If authentication is attempted but fails, raise an AuthenticationFailed exception.
            # An error response will be returned immediately, regardless of any permissions checks,
            # and without checking any other authentication schemes.
            raise JWTAuthenticationError('Authentication header is incorrect')

        prefix = auth_header[0].decode('utf-8')
        token = auth_header[1].decode('utf-8')

        auth_header_prefix = self.authentication_header_prefix.lower()
        if prefix.lower() != auth_header_prefix:
            raise JWTAuthenticationError('Authentication header prefix is incorrect')

        return token

    def _auth_from_token(self, token):
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        token_create_date = payload['token_create_date']
        unix_time_now = int(time.time())

        if unix_time_now - token_create_date > ONE_HOUR_IN_SECONDS:
            raise JWTAuthenticationError('Session expired')

        try:
            user = TelegramUser.objects.get(pk=payload['id'])
        except TelegramUser.DoesNotExist:
            raise JWTAuthenticationError('User does not exist')