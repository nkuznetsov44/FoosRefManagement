from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.exceptions import AuthenticationFailed
from django.db import transaction
from django.contrib.auth import authenticate
from django.conf import settings
from django.http import HttpResponseRedirect
from telegram_auth.permissions import IsReferee
from .models import InvitationToken, InvitationTokenError
from telegram_auth.backends import TelegramAuthenticationError
from telegram_bot.bot import TelegramBot, TelegramApiError


@api_view(['GET'])
@permission_classes([IsAdminUser|IsReferee])
def issue_invitation_url(request):
    issued_for_referee_id = request.GET.get('refereeId')
    if not issued_for_referee_id:
        return Response('Parameter "refereeId" is required', status=status.HTTP_400_BAD_REQUEST)

    try:
        invitation_token = InvitationToken.objects.issue_token(
            issued_by_telegram_user_id=request.user.telegram_user_id,
            issued_for_referee_id=issued_for_referee_id
        )
        TelegramBot().send_invitation_link(
            from_telegram_user_id=request.user.telegram_user_id,
            for_referee_id=issued_for_referee_id,
            invitation_token=invitation_token.token
        )
        return Response(status=status.HTTP_200_OK)
    except InvitationTokenError as ite:
        # TODO: logger
        error_desc = getattr(ite, 'message', str(ite))
        return Response(f'Invitation token error: {error_desc}', status=status.HTTP_400_BAD_REQUEST)
    except TelegramApiError as tae:
        # TODO: logger
        error_desc = getattr(tae, 'message', str(tae))
        return Response(f'Invitation token issue failed because of telegram api error {error_desc}')


@api_view(['POST'])
@permission_classes([AllowAny])
def create_and_bind_user_with_token(request):
    token_str = request.data.pop('invitationToken')
    if not token_str:
        return Response('Parameter "invitationToken" is required', status=status.HTTP_400_BAD_REQUEST)

    telegram_user_id = request.data.get('id')
    if not telegram_user_id:
        return Response('Parameter "id" (telegram user id) is required', status=status.HTTP_400_BAD_REQUEST)

    try:
        token = InvitationToken.objects.get(token=token_str)
        with transaction.atomic():
            user = token.create_and_bind_user(
                telegram_user_id=telegram_user_id,
                first_name=request.data.get('first_name'),
                last_name=request.data.get('last_name'),
                username=request.data.get('username'),
                photo_url=request.data.get('photo_url')
            )
            user = authenticate(request, data=request.data)
            if not user:
                raise AuthenticationFailed('Unexpected authentication error')
        return HttpResponseRedirect(redirect_to=f'/refereeProfile/{user.referee.id}')
    except InvitationToken.DoesNotExist:
        return Response(f'invitationToken {token_str} does not exist',  status=status.HTTP_400_BAD_REQUEST)
    except InvitationTokenError as ite:
        # TODO: logger
        error_desc = getattr(ite, 'message', str(ite))
        return Response(f'Invitation token error: {error_desc}', status=status.HTTP_400_BAD_REQUEST)
    except TelegramAuthenticationError as tae:
        # TODO: logger
        error_desc = getattr(tae, 'message', str(tae))
        return Response(f'Telegram authentication error: {error_desc}', status=status.HTTP_403_FORBIDDEN)
