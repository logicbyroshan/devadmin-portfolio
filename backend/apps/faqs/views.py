from rest_framework import viewsets, permissions
from apps.common.mixins import MultiTenantViewSetMixin
from .models import Faq
from .serializers import FaqSerializer

class FaqViewSet(MultiTenantViewSetMixin, viewsets.ModelViewSet):
    """
    Frequently Asked Questions API.
    Supports multi-tenant scoping, category grouping, ordering, and visibility toggling.
    """
    queryset = Faq.objects.select_related('website').all()
    serializer_class = FaqSerializer
    permission_classes = [permissions.AllowAny]
