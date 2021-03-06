from rest_framework import serializers
from .models import InvitationToken
from telegram_auth.serializers import TelegramUserSerializer
from app.serializers import RefereeSerializer


class InvitationTokenSerializer(serializers.ModelSerializer):
    issued_by = TelegramUserSerializer()
    issued_for_referee = RefereeSerializer()

    class Meta:
        model = InvitationToken
        fields = ('issued_by', 'issued_for_referee', 'expires_at', 'is_expired', 'status')
