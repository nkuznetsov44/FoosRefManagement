from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('referees', views.RefereeViewSet)
router.register('games', views.RefereedGameViewSet)
router.register('events', views.RefereedEventViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
