from rest_framework import serializers
from .models import Referee, RefereedGame, RefereedEvent


class RefereeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Referee
        fields = '__all__'


class RefereedGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefereedGame
        fields = '__all__'


class RefereedEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefereedEvent
        fields = '__all__'
