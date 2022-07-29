from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'referees', views.RefereeViewSet)
router.register(r'games', views.RefereedGameViewSet)
router.register(r'events', views.RefereedEventViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('gamesByReferee/<int:referee_id>', views.RefereeGames.as_view()),
    path('refereeBoundUser/<int:referee_id>', views.RefereeBoundUser.as_view()),
    path('lookup/eventType', views.EventTypeLookup.as_view()),
    path('lookup/gameCategory', views.GameCategoryLookup.as_view()),
    path('lookup/gameStage', views.GameStageLookup.as_view()),
    path('lookup/refereeRank', views.RefereeRankLookup.as_view()),
    path('lookup/refereeCity', views.RefereeCityLookup.as_view()),
]
