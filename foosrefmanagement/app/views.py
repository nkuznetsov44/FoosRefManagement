from django.http import HttpResponse
from rest_framework import viewsets
from . import models
from . import serializers


def index(request):
    return HttpResponse('foosrefmanagement/app index')


class RefereeViewSet(viewsets.ModelViewSet):
    queryset = models.Referee.objects.all()
    serializer_class = serializers.RefereeSerializer


class RefereedGameViewSet(viewsets.ModelViewSet):
    queryset = models.RefereedGame.objects.all()
    serializer_class = serializers.RefereedGameSerializer


class RefereedEventViewSet(viewsets.ModelViewSet):
    queryset = models.RefereedEvent.objects.all()
    serializer_class = serializers.RefereedEventSerializer
