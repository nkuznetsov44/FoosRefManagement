from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
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
