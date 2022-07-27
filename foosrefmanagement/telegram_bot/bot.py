import requests
import json
from typing import Optional, Dict, Any
from django.conf import settings


TELEGRAM_API_URL = 'https://api.telegram.org'


class TelegramApiError(Exception):
    def __init__(self, *args, error_code: Optional[int] = None, description: Optional[str] = None) -> None:
        super().__init__(*args)
        self.error_code = error_code
        self.description = description

    def __repr__(self) -> str:
        return (
            super().__repr__() +
            f'\nErrorCode: "{self.error_code}"\nDescription: "{self.description}"'
        )

    def __str__(self):
        return self.__repr__()


class TelegramBot:
    TELEGRAM_BOT_API_TOKEN = settings.TELEGRAM_BOT_API_TOKEN

    @classmethod
    def _method_url(cls, method: str) -> str:
        return f'{TELEGRAM_API_URL}/bot{cls.TELEGRAM_BOT_API_TOKEN}/{method}'

    @staticmethod
    def _check_response(response: requests.Response) -> Any:
        if response.status_code != requests.codes.ok:
            error_code = None
            description = None
            try:
                response_json = response.json()
                error_code = response_json['error_code'],
                description = response_json['description']
            except Exception:
                pass
            raise TelegramApiError(
                f'Got status code {response.status_code}: {response.reason}\n{response.text.encode("utf8")}',
                error_code=error_code,
                description=description
            )

        try:
            response_json = response.json()
        except json.JSONDecodeError as jde:
            raise TelegramApiError(f'Got invalid json\n{response.text.encode("utf8")}', jde)

        try:
            if not response_json['ok']:
                raise TelegramApiError(
                    error_code=response_json['error_code'],
                    description=response_json['description']
                )
            return response_json['result']
        except KeyError as ke:
            raise TelegramApiError(f'Got unexpected json\n{response_json}', ke)

    def send_message(
        self,
        chat_id: int,
        text: str,
        parse_mode: Optional[str] = None,
        disable_web_page_preview: Optional[bool] = None,
        disable_notification: Optional[bool] = None,
        reply_to_message_id: Optional[int] = None,
        reply_markup: Dict[str, Any] = None
    ):
        response = requests.post(
            self._method_url('sendMessage'),
            {
                'chat_id': chat_id,
                'text': text,
                'parse_mode': parse_mode,
                'disable_web_page_preview': disable_web_page_preview,
                'disable_notification': disable_notification,
                'reply_to_message_id': reply_to_message_id,
                'reply_markup': json.dumps(reply_markup)
            }
        )
        return self._check_response(response)
