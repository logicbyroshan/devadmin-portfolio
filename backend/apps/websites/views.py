from rest_framework import viewsets, permissions
from .models import Website
from .serializers import WebsiteSerializer

class WebsiteViewSet(viewsets.ModelViewSet):
    queryset = Website.objects.filter(is_active=True)
    serializer_class = WebsiteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
