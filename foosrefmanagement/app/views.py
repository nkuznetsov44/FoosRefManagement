from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from .authentication import CsrfExemptSessionAuthentication
from . import models
from . import serializers


def index(request):
    return HttpResponse('foosrefmanagement/app index')


class RefereeViewSet(viewsets.ModelViewSet):
    queryset = models.Referee.objects.all()
    serializer_class = serializers.RefereeSerializer


class RefereedGameViewSet(viewsets.ModelViewSet):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    queryset = models.RefereedGame.objects.all()
    serializer_class = serializers.RefereedGameSerializer


class RefereedEventViewSet(viewsets.ModelViewSet):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    queryset = models.RefereedEvent.objects.all()
    serializer_class = serializers.RefereedEventSerializer
