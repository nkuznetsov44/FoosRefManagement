import logging
from rest_framework.response import Response
from rest_framework import status


logger = logging.getLogger(__name__)


class BadRequestResponse(Response):
    def __init__(self, data) -> None:
        message = None

        if isinstance(data, str):
            message = {}
            message['detail'] = data
        else:
            message = data

        # TODO: to custom exception handler, push request to logger context
        logger.info(f'Bad request: {message}')
        super().__init__(message, status=status.HTTP_400_BAD_REQUEST)
