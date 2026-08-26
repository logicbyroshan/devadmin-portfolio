"""
Reusable ViewSet Mixins & DRY Architecture
Standardizes multi-tenant query resolution, zero N+1 optimizations, and common actions.
"""

from rest_framework import status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .services.tenant_service import MultiTenantQueryService

class MultiTenantViewSetMixin:
    """
    Standardizes:
    1. Zero N+1 query optimization via select_related('website')
    2. Multi-tenant website scoping (?website=dev-meet or ?website=1)
    3. Category, status, and visibility filtering
    4. Reusable toggle_visibility action protected with IsAuthenticated
    """
    website_field = 'website'
    enable_select_related = True

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.enable_select_related and hasattr(self.queryset.model, 'website'):
            queryset = queryset.select_related('website')
        return MultiTenantQueryService.apply_standard_filters(queryset, self.request)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def toggle_visibility(self, request, pk=None):
        """Standardized action to toggle visible status on any model instance."""
        instance = self.get_object()
        new_status = MultiTenantQueryService.toggle_object_visibility(instance)
        return Response({
            'id': instance.id,
            'visible': new_status,
            'status': 'success'
        }, status=status.HTTP_200_OK)
