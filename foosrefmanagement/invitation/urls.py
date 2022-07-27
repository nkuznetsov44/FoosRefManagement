from django.urls import path
from . import views
# from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('issue/', views.issue_invitation_url, name='invitation_issue'),
    path('complete/', views.create_and_bind_user_with_token, name='invitation_complete'),
    # path('complete/', csrf_exempt(views.create_and_bind_user_with_token), name='invitation_complete'),
]
