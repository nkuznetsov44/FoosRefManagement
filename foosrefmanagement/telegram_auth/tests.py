from django.test import TestCase, Client
from django.conf import settings
from .models import TelegramUser


class AuthenticationTestCase(TestCase):
    login_request_data = {
        'id': 1,
        'first_name': 'John',
        'last_name': 'Doe',
        'username': 'johndoe',
        'photo_url': 'https://userpic.invalid',
        'auth_date': 1658848885,
        'hash': '15d66636a9f6d1b5fb1d1dea16f7b293827a3ceadc9ac1920af58618dd1714fd'
    }

    def setUp(self):
        TelegramUser.objects.create(
            telegram_user_id=1,
            first_name='John',
            last_name='Doe',
            username='johndoe',
            photo_url='https://userpic.invalid'
        )

    def testAuthenticationSuccess(self):
        settings.TELEGRAM_BOT_API_TOKEN = 'TEST_TELEGRAM_BOT_API_TOKEN'  # TODO: mock settings correctly
        settings.TELEGRAM_AUTH_DATA_LIFETIME = 2147483647

        client = Client()
        response = client.post('/api/auth/token/', data=self.login_request_data, content_type='application/json')
        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertDictContainsSubset(self.login_request_data, data)
        self.assertTrue(data['access'])
        self.assertTrue(data['refresh'])

    def testAuthenticationFailOutdated(self):
        settings.TELEGRAM_BOT_API_TOKEN = 'TEST_TELEGRAM_BOT_API_TOKEN'  # TODO: mock settings correctly
        settings.TELEGRAM_AUTH_DATA_LIFETIME = 0

        client = Client()
        response = client.post('/api/auth/token/', data=self.login_request_data, content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.assertDictEqual({'detail': 'Authentication data is outdated.'}, response.json())

    def testAuthenticationFailBadHash(self):
        settings.TELEGRAM_BOT_API_TOKEN = 'TEST_TELEGRAM_BOT_API_TOKEN'  # TODO: mock settings correctly
        settings.TELEGRAM_AUTH_DATA_LIFETIME = 2147483647

        request_data = self.login_request_data.copy()
        request_data['hash'] = 'bad'

        client = Client()
        response = client.post('/api/auth/token/', data=request_data, content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.assertDictEqual(
            {
                'detail': (
                    'Data integrity was not verified. Hash recieved from authentication '
                    'data does not match the calculated hash based on bot token.'
                )
            },
            response.json()
        )

    def testAccessToken(self):
        pass

    def testRefreshToken(self):
        pass
