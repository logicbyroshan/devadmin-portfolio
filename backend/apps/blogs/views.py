from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import BlogPost
from .serializers import BlogPostSerializer

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.select_related('website').all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = BlogPost.objects.select_related('website').all()
        website_slug = self.request.query_params.get('website', None)
        if website_slug:
            queryset = queryset.filter(website__slug=website_slug)
            
        category_param = self.request.query_params.get('category', None)
        if category_param and category_param.upper() != 'ALL':
            queryset = queryset.filter(category__iexact=category_param)
            
        status_param = self.request.query_params.get('status', None)
        if status_param:
            queryset = queryset.filter(status=status_param.upper())
            
        visible_param = self.request.query_params.get('visible', None)
        if visible_param is not None:
            queryset = queryset.filter(visible=(visible_param.lower() == 'true'))
            
        return queryset

    @action(detail=True, methods=['post'])
    def toggle_visibility(self, request, pk=None):
        blog = self.get_object()
        blog.visible = not blog.visible
        blog.save(update_fields=['visible', 'updated_at'])
        return Response({'id': blog.id, 'visible': blog.visible, 'status': 'success'}, status=status.HTTP_200_OK)
