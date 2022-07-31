import logging
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import ProtectedError
from common.http_response import BadRequestResponse
from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from telegram_auth.permissions import ReadOnly, IsReferee, IsNationalReferee
from telegram_auth.models import TelegramUser
from app.serializers import RefereeSerializer
from . import models
from . import serializers


logger = logging.getLogger(__name__)


class ActionBasedSerializerMixin:
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, self.default_serializer_class)


class RefereeViewSet(viewsets.ModelViewSet):
    permission_classes = (IsNationalReferee|IsAdminUser|ReadOnly,)
    queryset = models.Referee.objects.all()
    serializer_class = serializers.RefereeSerializer

    def destroy(self, request, pk=None):
        if not pk:
            return super().destroy(request, pk)
        referee = self.queryset.get(pk=pk)
        referee.is_active = False
        referee.save()
        return Response(referee.id)


class RefereedGameViewSet(ActionBasedSerializerMixin, viewsets.ModelViewSet):
    permission_classes = (IsReferee|IsAdminUser|ReadOnly,)
    queryset = models.RefereedGame.objects.all()

    serializer_classes = {
        'create': serializers.RefereedGameDeserializer,
        'partial_update': serializers.RefereedGameDeserializer,
    }
    default_serializer_class = serializers.RefereedGameSerializer


class RefereedEventViewSet(viewsets.ModelViewSet):
    permission_classes = (IsReferee|IsAdminUser|ReadOnly,)
    queryset = models.RefereedEvent.objects.all()
    serializer_class = serializers.RefereedEventSerializer

    def destroy(self, request, pk=None):
        try:
            return super().destroy(request, pk)
        except ProtectedError as pe:
            return BadRequestResponse(
                f'Can\'t delete tournament id="{pk}" because it has games bound to it. '
                'Cancelling operation on protected error.'
            )


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


class RefereeLanguageLookup(LookupView):
    model = models.RefereeLanguage


class RefereeGames(views.APIView):
    def get(self, request, referee_id):
        try:
            referee = models.Referee.objects.get(id=referee_id)
            games_serializer = serializers.RefereedGameSerializer(referee.get_games(), many=True)
            return Response(games_serializer.data)
        except ObjectDoesNotExist:
            return BadRequestResponse(f'No referee with id = "{referee_id}" found')


class RefereeBoundUser(views.APIView):
    permission_classes = (IsReferee|IsAdminUser,)

    def get(self, request, referee_id):
        try:
            referee = models.Referee.objects.get(id=referee_id)
            bound_user = referee.user
            if not bound_user:
                return Response(None)
            referee_bound_user_serializer = serializers.RefereeBoundUserSerializer(bound_user)
            return Response(referee_bound_user_serializer.data)
        except ObjectDoesNotExist:
            return BadRequestResponse(f'No referee with id = "{referee_id}" found')


class RefereeByUser(views.APIView):
    permission_classes = (IsReferee|IsAdminUser,)

    def get(self, request, telegram_user_id):
        try:
            user = TelegramUser.objects.get(telegram_user_id=telegram_user_id)
            return Response(RefereeSerializer(user.referee).data)
        except ObjectDoesNotExist:
            return BadRequestResponse(
                f'User with id = "{telegram_user_id} does not exist '
                'or not bound to referee'
            )
