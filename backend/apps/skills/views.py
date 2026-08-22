from rest_framework import viewsets, permissions
from apps.common.mixins import MultiTenantViewSetMixin
from .models import Skill
from .serializers import SkillSerializer

class SkillViewSet(MultiTenantViewSetMixin, viewsets.ModelViewSet):
    """
    Technical Skills & Proficiency API.
    Supports multi-tenant scoping, proficiency percentage, and visibility toggling.
    """
    queryset = Skill.objects.select_related('website').all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.AllowAny]
