from rest_framework.routers import DefaultRouter
from .views import ContactInquiryViewSet

router = DefaultRouter()
router.register(r'', ContactInquiryViewSet, basename='contact')

urlpatterns = router.urls
