from app.models import RefereeRank, Referee
from rest_framework import permissions


class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS


class IsReferee(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user:
            return False
        if request.user.is_anonymous:
            return False
        try:
            request.user.referee
            return True
        except Referee.DoesNotExist:
            return False

    def has_object_permission(self, request, view, obj):
        # TODO: setup object permissions on games where the referee
        # is either a main ref or an assistant.
        # https://www.django-rest-framework.org/api-guide/permissions/#examples
        # https://www.django-rest-framework.org/api-guide/permissions/#overview-of-access-restriction-methods
        return True


class IsNationalReferee(IsReferee):
    def has_permission(self, request, view):
        return (
            super().has_permission(request, view)
            and request.user.referee.rank in (RefereeRank.NATIONAL, RefereeRank.INTERNATIONAL)
        )
