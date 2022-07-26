from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import TelegramLoginTokenObtainPairSerializer, TelegramUserSerializer


class TelegramLoginTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = TelegramLoginTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def login(request):
    user = request.user
    serializer = TelegramUserSerializer(user)
    return Response(serializer.data)
