from django.db import transaction
from django.db.models import Q
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.common.mixins import MultiTenantViewSetMixin
from .models import Skill
from .serializers import SkillSerializer

class SkillViewSet(MultiTenantViewSetMixin, viewsets.ModelViewSet):
    """
    Technical Skills & Taxonomy API.
    Supports categorization, proficiency scaling, multi-tenant scoping, and reordering.
    """
    queryset = Skill.objects.select_related('website').all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category', None)
        is_top = self.request.query_params.get('is_top', None)
        search = self.request.query_params.get('search', None)

        if category:
            queryset = queryset.filter(category__icontains=category)
        if is_top is not None:
            val = str(is_top).lower() in ['true', '1']
            queryset = queryset.filter(is_top=val)
        if search:
            queryset = queryset.filter(Q(name__icontains=search) | Q(category__icontains=search))
        return queryset

    @action(detail=False, methods=['post'], url_path='reorder', permission_classes=[permissions.IsAuthenticated])
    def reorder_skills(self, request):
        """Reorder skills via order map {"order_map": {"1": 0, "2": 1}}"""
        order_map = request.data.get('order_map', {})
        if not isinstance(order_map, dict):
            return Response({'error': 'order_map must be a dictionary of id -> order index.'}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            for skill_id, order_val in order_map.items():
                Skill.objects.filter(id=skill_id).update(order=int(order_val))

        return Response({'success': True, 'message': 'Skills order updated.'}, status=status.HTTP_200_OK)
