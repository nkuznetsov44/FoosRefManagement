from django.urls import path, include
from rest_framework import routers
from . import views
from .auth import views as auth_views


router = routers.DefaultRouter()
router.register(r'auth/login', auth_views.LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', auth_views.RefreshViewSet, basename='auth-refresh')
router.register(r'referees', views.RefereeViewSet)
router.register(r'games', views.RefereedGameViewSet)
router.register(r'events', views.RefereedEventViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('gamesByReferee', views.RefereeGames.as_view())
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
