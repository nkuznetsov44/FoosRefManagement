from datetime import datetime
from io import UnsupportedOperation
from rest_framework import serializers
from .models import Referee, RefereedGame, RefereedEvent


class RefereeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(write_only=False)

    class Meta:
        model = Referee
        fields = '__all__'


class RefereedEventSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(write_only=False)

    class Meta:
        model = RefereedEvent
        fields = '__all__'


class RefereedGameSerializer(serializers.ModelSerializer):
    referee = RefereeSerializer()
    assistant = RefereeSerializer()
    event = RefereedEventSerializer()

    class Meta:
        model = RefereedGame
        fields = '__all__'
        depth = 1

    def create(self, validated_data):
        referee = Referee.objects.get(id=validated_data['referee']['id'])
        assistant = Referee.objects.get(id=validated_data['assistant']['id'])
        event = RefereedEvent.objects.get(id=validated_data['event']['id'])
        return RefereedGame.objects.create(
            referee=referee,
            assistant=assistant,
            event=event,
            date=validated_data['date'],
            first_player=validated_data['first_player'],
            second_player=validated_data['second_player']
        )

    def update(self, instance, validated_data):
        raise UnsupportedOperation('Updating games is not supported')
