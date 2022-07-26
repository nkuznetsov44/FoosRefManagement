from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import TelegramLoginTokenObtainPairSerializer, TelegramUserSerializer
from .models import TelegramUser


class TelegramLoginTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = TelegramLoginTokenObtainPairSerializer


class TelegramUserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = TelegramUserSerializer
    permission_classes = (IsAdminUser,)
    queryset = TelegramUser.objects.all()
