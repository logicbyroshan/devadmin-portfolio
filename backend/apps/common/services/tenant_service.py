"""
Reusable Multi-Tenant Query & Scoping Service
Standardizes filtering, category scoping, visibility toggling, and query optimizations.
"""

from typing import Optional
from django.db.models import QuerySet, Model
from apps.websites.models import Website

class MultiTenantQueryService:
    @staticmethod
    def get_website_by_identifier(identifier: str) -> Optional[Website]:
        """Resolve a website instance by slug or ID with error safety."""
        if not identifier:
            return None
        try:
            if identifier.isdigit():
                return Website.objects.get(id=int(identifier))
            return Website.objects.get(slug=identifier)
        except Website.DoesNotExist:
            return None

    @staticmethod
    def filter_by_website(queryset: QuerySet, request) -> QuerySet:
        """Apply website filtering from query parameters (?website=slug or ?website=id)."""
        website_param = request.query_params.get('website', None)
        if website_param:
            if website_param.isdigit():
                return queryset.filter(website_id=int(website_param))
            return queryset.filter(website__slug=website_param)
        return queryset

    @staticmethod
    def filter_by_category(queryset: QuerySet, request) -> QuerySet:
        """Apply category filtering if the model contains a category field."""
        category_param = request.query_params.get('category', None)
        if category_param and category_param.upper() != 'ALL':
            return queryset.filter(category__iexact=category_param)
        return queryset

    @staticmethod
    def filter_by_status(queryset: QuerySet, request) -> QuerySet:
        """Apply status filtering if the model contains a status field."""
        status_param = request.query_params.get('status', None)
        if status_param and status_param.upper() != 'ALL':
            return queryset.filter(status=status_param.upper())
        return queryset

    @staticmethod
    def filter_by_visibility(queryset: QuerySet, request) -> QuerySet:
        """Apply visibility filtering (?visible=true/false)."""
        visible_param = request.query_params.get('visible', None)
        if visible_param is not None:
            return queryset.filter(visible=(visible_param.lower() == 'true'))
        return queryset

    @classmethod
    def apply_standard_filters(cls, queryset: QuerySet, request) -> QuerySet:
        """Chain all standard multi-tenant, category, status, and visibility filters."""
        qs = cls.filter_by_website(queryset, request)
        qs = cls.filter_by_category(qs, request)
        qs = cls.filter_by_status(qs, request)
        qs = cls.filter_by_visibility(qs, request)
        return qs

    @staticmethod
    def toggle_object_visibility(instance: Model) -> bool:
        """Safely toggle the visible boolean field on any model instance."""
        if hasattr(instance, 'visible'):
            instance.visible = not instance.visible
            update_fields = ['visible']
            if hasattr(instance, 'updated_at'):
                update_fields.append('updated_at')
            instance.save(update_fields=update_fields)
            return instance.visible
        return True
