from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AchievementViewSet

router = DefaultRouter()
router.register(r'', AchievementViewSet, basename='achievements')

urlpatterns = [
    path('', include(router.urls)),
]
