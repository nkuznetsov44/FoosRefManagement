from datetime import datetime
from io import UnsupportedOperation
from rest_framework import serializers
from .models import Referee, RefereedGame, RefereedEvent


class RefereeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Referee
        fields = '__all__'
        read_only_fields = ('photo',)


class RefereedEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefereedEvent
        fields = '__all__'


class RefereedGameSerializer(serializers.ModelSerializer):
    referee = RefereeSerializer()
    assistant = RefereeSerializer(required=False)
    event = RefereedEventSerializer()

    class Meta:
        model = RefereedGame
        fields = '__all__'
        depth = 1

    def create(self, validated_data):
        raise UnsupportedOperation()

    def update(self, instance, validated_data):
        raise UnsupportedOperation()


class RefereedGameDeserializer(serializers.ModelSerializer):
    referee = serializers.IntegerField(write_only=True)
    assistant = serializers.IntegerField(write_only=True)
    event = serializers.IntegerField(write_only=True)
    category = serializers.CharField(write_only=True)
    stage = serializers.CharField(write_only=True)

    class Meta:
        model = RefereedGame
        fields = '__all__'

    def create(self, validated_data):
        referee = Referee.objects.get(id=validated_data['referee'])
        assistant = None
        if validated_data.get('assistant'):
            assistant = Referee.objects.get(id=validated_data['assistant'])
        event = RefereedEvent.objects.get(id=validated_data['event'])
        return RefereedGame.objects.create(
            referee=referee,
            assistant=assistant,
            event=event,
            date=validated_data['date'],
            first_player=validated_data['first_player'],
            second_player=validated_data['second_player'],
            category=validated_data['category'],
            stage=validated_data['stage']
        )

    def update(self, instance, validated_data):
        raise UnsupportedOperation()
