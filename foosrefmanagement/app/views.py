from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, views, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from . import models
from . import serializers


class ActionBasedSerializerMixin:
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, self.default_serializer_class)


class RefereeViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.Referee.objects.all()
    serializer_class = serializers.RefereeSerializer


class RefereedGameViewSet(ActionBasedSerializerMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.RefereedGame.objects.all()

    serializer_classes = {
        'create': serializers.RefereedGameDeserializer
    }
    default_serializer_class = serializers.RefereedGameSerializer


class RefereedEventViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.RefereedEvent.objects.all()
    serializer_class = serializers.RefereedEventSerializer


class LookupView(views.APIView):
    def get(self, request):
        return Response([{
            'value': choice[0],
            'display': choice[1]
        } for choice in self.model.choices])


class EventTypeLookup(LookupView):
    model = models.RefereedEventType


class GameCategoryLookup(LookupView):
    model = models.GameCategory


class GameStageLookup(LookupView):
    model = models.GameStage


class RefereeRankLookup(LookupView):
    model = models.RefereeRank


class RefereeCityLookup(LookupView):
    model = models.RefereeCity


class RefereeGames(views.APIView):
    def get(self, request, referee_id):
        try:
            referee = models.Referee.objects.get(id=referee_id)
            games_serializer = serializers.RefereedGameSerializer(referee.get_games(), many=True)
            return Response(games_serializer.data)
        except ObjectDoesNotExist:
            return Response('No referee with required id found', status=HTTP_400_BAD_REQUEST)
