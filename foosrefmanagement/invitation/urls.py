from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'token', views.InvitationTokenViewSet, basename='invitation_token')


urlpatterns = [
    path('', include(router.urls)),
    path('issue/', views.issue_invitation_url, name='invitation_issue'),
    path('complete/', views.create_and_bind_user_with_token, name='invitation_complete'),
]
