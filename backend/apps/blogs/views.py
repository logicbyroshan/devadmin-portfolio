from django.db.models import F, Q
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.common.mixins import MultiTenantViewSetMixin
from .models import BlogPost
from .serializers import (
    BlogPostSerializer,
    PublicBlogPostListSerializer,
    PublicBlogPostDetailSerializer
)

class BlogPostViewSet(MultiTenantViewSetMixin, viewsets.ModelViewSet):
    """
    Technical Blog Posts API.
    Supports rich markdown, multi-tenant scoping, category filtering, and visibility toggling.
    """
    queryset = BlogPost.objects.select_related('website').all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        category_param = self.request.query_params.get('category', None)
        status_param = self.request.query_params.get('status', None)
        is_active = self.request.query_params.get('is_active', None)
        search_query = self.request.query_params.get('search', None)

        if category_param:
            queryset = queryset.filter(category__icontains=category_param)
        if status_param:
            queryset = queryset.filter(status__iexact=status_param)
        if is_active is not None:
            val = str(is_active).lower() in ['true', '1']
            queryset = queryset.filter(Q(visible=val) | Q(is_active=val))
        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(subtitle__icontains=search_query) |
                Q(summary__icontains=search_query) |
                Q(content__icontains=search_query)
            )
        return queryset

    @action(detail=True, methods=['post', 'get'], url_path='toggle-active', permission_classes=[permissions.IsAuthenticated])
    def toggle_active(self, request, pk=None):
        """Fast toggle active/inactive visibility for a blog post."""
        post = self.get_object()
        post.visible = not post.visible
        post.is_active = post.visible
        post.save(update_fields=['visible', 'is_active', 'updated_at'])
        return Response({
            'success': True,
            'id': post.id,
            'is_active': post.is_active,
            'visible': post.visible
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='view', permission_classes=[permissions.AllowAny])
    def record_view(self, request, pk=None):
        """Atomic view tracking for a blog article."""
        post = self.get_object()
        BlogPost.objects.filter(pk=post.pk).update(views_count=F('views_count') + 1)
        post.refresh_from_db(fields=['views_count'])
        return Response({'success': True, 'views_count': post.views_count}, status=status.HTTP_200_OK)
