from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PortfolioProfileViewSet

router = DefaultRouter()
router.register(r'', PortfolioProfileViewSet, basename='profile')

urlpatterns = [
    path('', include(router.urls)),
]
