from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PortfolioProfileViewSet,
    AdminProfileView,
    UploadProfileImageView,
    DeleteProfileImageView,
    UploadHeroImageView,
    DeleteHeroImageView,
    UploadDocumentView,
    DeleteDocumentView,
)

router = DefaultRouter()
router.register(r'', PortfolioProfileViewSet, basename='profiles')

urlpatterns = [
    path('admin-profile/', AdminProfileView.as_view(), name='admin_profile_direct'),
    path('upload-image/', UploadProfileImageView.as_view(), name='upload_profile_image'),
    path('delete-image/', DeleteProfileImageView.as_view(), name='delete_profile_image'),
    path('upload-hero-image/', UploadHeroImageView.as_view(), name='upload_hero_image'),
    path('delete-hero-image/', DeleteHeroImageView.as_view(), name='delete_hero_image'),
    path('upload-document/', UploadDocumentView.as_view(), name='upload_document'),
    path('delete-document/', DeleteDocumentView.as_view(), name='delete_document'),
    path('', include(router.urls)),
]
