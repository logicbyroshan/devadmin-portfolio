from rest_framework import viewsets, permissions
from apps.common.mixins import MultiTenantViewSetMixin
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(MultiTenantViewSetMixin, viewsets.ModelViewSet):
    """
    Projects Management API.
    Supports multi-tenant scoping, category filtering, search, and visibility toggling.
    """
    queryset = Project.objects.select_related('website').all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
