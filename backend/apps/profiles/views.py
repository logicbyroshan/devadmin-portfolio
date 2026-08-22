from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import PortfolioProfile
from .serializers import PortfolioProfileSerializer

class PortfolioProfileViewSet(viewsets.ModelViewSet):
    queryset = PortfolioProfile.objects.select_related('website').all()
    serializer_class = PortfolioProfileSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = PortfolioProfile.objects.select_related('website').all()
        website_slug = self.request.query_params.get('website', None)
        if website_slug:
            queryset = queryset.filter(website__slug=website_slug)
        return queryset
