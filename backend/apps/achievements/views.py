from rest_framework import viewsets, permissions
from apps.common.mixins import MultiTenantViewSetMixin
from .models import Achievement
from .serializers import AchievementSerializer

class AchievementViewSet(MultiTenantViewSetMixin, viewsets.ModelViewSet):
    """
    Achievements & Certifications API.
    Supports multi-tenant scoping, featured filtering, and CRUD.
    """
    queryset = Achievement.objects.select_related('website').all()
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
