from rest_framework import viewsets, permissions
from apps.common.mixins import MultiTenantViewSetMixin
from .models import Experience
from .serializers import ExperienceSerializer

class ExperienceViewSet(MultiTenantViewSetMixin, viewsets.ModelViewSet):
    """
    Work Experience Milestones API.
    Supports multi-tenant scoping, career tenure, and visibility toggling.
    """
    queryset = Experience.objects.select_related('website').all()
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.AllowAny]
