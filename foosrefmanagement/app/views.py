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


class RefereeGames(views.APIView):
    def get(self, request):
        try:
            referee_id = int(request.GET['id'])
            referee = models.Referee.objects.get(id=referee_id)
            print(referee.get_games())
            games_serializer = serializers.RefereedGameSerializer(referee.get_games(), many=True)
            return Response(games_serializer.data)
        except KeyError:
            return Response('id is required', status=HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response('id must be a number', status=HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response('No referee with required id found', status=HTTP_400_BAD_REQUEST)
