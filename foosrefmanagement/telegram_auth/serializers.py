from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import TelegramUser


class TelegramLoginTokenObtainPairSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    username = serializers.CharField(required=False)
    photo_url = serializers.CharField(required=False)
    auth_date = serializers.IntegerField()
    hash = serializers.CharField()

    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)

    def validate(self, data):
        authenticate_kwargs = {
            'data': dict(data)
        }

        try:
            authenticate_kwargs['request'] = self.context['request']
        except KeyError:
            pass

        user = authenticate(**authenticate_kwargs)

        refresh = self.get_token(user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data


class TelegramUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramUser
        fields = ('telegram_user_id', 'is_superuser', 'first_name', 'last_name', 'username', 'photo_url')
