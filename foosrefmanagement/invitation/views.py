from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, AllowAny
from django.db import transaction
from django.contrib.auth import authenticate
from telegram_auth.permissions import IsReferee
from .models import InvitationToken, InvitationTokenError
from telegram_auth.serializers import TelegramUserSerializer
from telegram_auth.backends import TelegramAuthenticationError


@api_view(['GET'])
@permission_classes([IsAdminUser|IsReferee])
def issue_invitation_url(request):
    issued_for_referee_id = request.GET.get('refereeId')
    if not issued_for_referee_id:
        return Response('Parameter "refereeId" is required', status=status.HTTP_400_BAD_REQUEST)
    invitation_token = InvitationToken.objects.issue_token(
        issued_by_telegram_user_id=request.user.telegram_user_id,
        issued_for_referee_id=issued_for_referee_id
    )
    return Response({
        'token': invitation_token.uuid
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def create_and_bind_user_with_token(request):
    token_uuid = request.data.pop('invitationToken')
    if not token_uuid:
        return Response('Parameter "invitationToken" is required', status=status.HTTP_400_BAD_REQUEST)

    telegram_user_id = request.data.get('id')
    if not telegram_user_id:
        return Response('Parameter "id" (telegram user id) is required', status=status.HTTP_400_BAD_REQUEST)

    try:
        token = InvitationToken.objects.get(uuid=token_uuid)
        with transaction.atomic():
            user = token.create_and_bind_user(
                telegram_user_id=telegram_user_id,
                first_name=request.data.get('first_name'),
                last_name=request.data.get('last_name'),
                username=request.data.get('username'),
                photo_url=request.data.get('photo_url')
            )
            authenticate(request, data=request.data)
        serializer = TelegramUserSerializer(user)
        return Response(serializer.data)
    except InvitationToken.DoesNotExist:
        return Response(f'invitationToken {token_uuid} does not exist',  status=status.HTTP_400_BAD_REQUEST)
    except InvitationTokenError as ite:
        # TODO: logger
        error_desc = getattr(ite, 'message', str(ite))
        return Response(f'Invitation token error: {error_desc}', status=status.HTTP_400_BAD_REQUEST)
    except TelegramAuthenticationError as tae:
        # TODO: logger
        error_desc = getattr(tae, 'message', str(tae))
        return Response(f'Telegram authentication error: {error_desc}', status=status.HTTP_403_FORBIDDEN)
