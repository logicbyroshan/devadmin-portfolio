from rest_framework import viewsets, permissions
from apps.common.mixins import MultiTenantViewSetMixin
from .models import BlogPost
from .serializers import BlogPostSerializer

class BlogPostViewSet(MultiTenantViewSetMixin, viewsets.ModelViewSet):
    """
    Technical Blog Posts API.
    Supports rich markdown, multi-tenant scoping, category filtering, and visibility toggling.
    """
    queryset = BlogPost.objects.select_related('website').all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.AllowAny]
