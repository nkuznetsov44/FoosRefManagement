from django.urls import path
from . import views


urlpatterns = [
    path('issue/', views.issue_invitation_url, name='invitation_issue'),
    path('complete/', views.create_and_bind_user_with_token, name='invitation_complete'),
]
