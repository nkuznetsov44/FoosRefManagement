import logging
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.db import transaction
from django.contrib.auth import authenticate
from django.http import HttpResponseRedirect
from common.http_response import BadRequestResponse
from telegram_auth.permissions import IsReferee
from .models import InvitationToken, InvitationTokenError
from .serializers import InvitationTokenSerializer
from telegram_auth.backends import TelegramAuthenticationError
from telegram_bot.bot import TelegramBot, TelegramApiError


logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([IsAdminUser|IsReferee])
def issue_invitation_url(request):
    issued_for_referee_id = request.data.get('refereeId')
    if not issued_for_referee_id:
        return BadRequestResponse('Parameter "refereeId" is required')

    try:
        invitation_token = InvitationToken.objects.issue_token(
            issued_by_telegram_user_id=request.user.telegram_user_id,
            issued_for_referee_id=issued_for_referee_id
        )
        TelegramBot().send_invitation_link(
            from_telegram_user_id=request.user.telegram_user_id,
            for_referee_id=issued_for_referee_id,
            invitation_token=invitation_token.token,
            expires_timestamp=invitation_token.expires_at
        )
        return Response(status=status.HTTP_200_OK)
    except InvitationTokenError as ite:
        error_desc = getattr(ite, 'message', str(ite))
        logger.info(error_desc)
        return BadRequestResponse(f'Invitation token error: {error_desc}')
    except TelegramApiError as tae:
        logger.exception('Failed to issue invitation token', tae)
        error_desc = getattr(tae, 'message', str(tae))
        return BadRequestResponse(
            f'Invitation token issue failed because of telegram api error {error_desc}'
        )


@api_view(['GET'])
@permission_classes([AllowAny])
def create_and_bind_user_with_token(request):
    params = {key: value[0] for key, value in dict(request.query_params).items()}

    token_str = params.pop('invitationToken')
    if not token_str:
        return BadRequestResponse('Parameter "invitationToken" is required')

    telegram_user_id = params.get('id')
    if not telegram_user_id:
        return BadRequestResponse('Parameter "id" (telegram user id) is required')

    try:
        token = InvitationToken.objects.get(token=token_str)
        with transaction.atomic():
            token.create_and_bind_user(
                telegram_user_id=telegram_user_id,
                first_name=params.get('first_name'),
                last_name=params.get('last_name'),
                username=params.get('username'),
                photo_url=params.get('photo_url')
            )
            user = authenticate(request, data=params)  # validates that data comes from telegram
            if not user:
                raise AuthenticationFailed('Unexpected authentication error')
        return HttpResponseRedirect(redirect_to=f'/refereeProfile/{user.referee.id}')
    except InvitationToken.DoesNotExist as dne:
        return BadRequestResponse(f'invitationToken {token_str} does not exist')
    except InvitationTokenError as ite:
        error_desc = getattr(ite, 'message', str(ite))
        return BadRequestResponse(f'Invitation token error: {error_desc}')
    except TelegramAuthenticationError as tae:
        logger.exception('Telegram authentication error', tae)
        error_desc = getattr(tae, 'message', str(tae))
        raise AuthenticationFailed(f'Telegram authentication error: {error_desc}')


class InvitationTokenViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = InvitationTokenSerializer
    permission_classes = (IsReferee|IsAdminUser,)
    queryset = InvitationToken.objects.all()
