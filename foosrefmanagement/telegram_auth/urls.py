from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView
from . import views


router = routers.DefaultRouter()
router.register(r'user', views.TelegramUserViewSet, basename='user')


urlpatterns = [
    path('', include(router.urls)),
    path('token/', views.TelegramLoginTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
