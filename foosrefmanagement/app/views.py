from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, views, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from . import models
from . import serializers


class RefereeViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.Referee.objects.all()
    serializer_class = serializers.RefereeSerializer


class RefereedGameViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.RefereedGame.objects.all()
    serializer_class = serializers.RefereedGameSerializer


class RefereedEventViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = models.RefereedEvent.objects.all()
    serializer_class = serializers.RefereedEventSerializer


class EventTypeLookup(views.APIView):
    def get(self, request):
        return Response([{
            'value': choice[0],
            'display': choice[1]
        } for choice in models.RefereedEventType.choices])


class GameCategoryLookup(views.APIView):
    def get(self, request):
        return Response([{
            'value': choice[0],
            'display': choice[1]
        } for choice in models.GameCategory.choices])


class GameStageLookup(views.APIView):
    def get(self, request):
        return Response([{
            'value': choice[0],
            'display': choice[1]
        } for choice in models.GameStage.choices])


class RefereeGames(views.APIView):
    def get(self, request, referee_id):
        try:
            referee = models.Referee.objects.get(id=referee_id)
            games_serializer = serializers.RefereedGameSerializer(referee.get_games(), many=True)
            return Response(games_serializer.data)
        except ObjectDoesNotExist:
            return Response('No referee with required id found', status=HTTP_400_BAD_REQUEST)
