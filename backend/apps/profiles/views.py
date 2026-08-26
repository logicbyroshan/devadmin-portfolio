from rest_framework import viewsets, permissions
from .models import PortfolioProfile
from .serializers import PortfolioProfileSerializer

class PortfolioProfileViewSet(viewsets.ModelViewSet):
    """
    Portfolio Profile Details API.
    """
    queryset = PortfolioProfile.objects.select_related('website').all()
    serializer_class = PortfolioProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = PortfolioProfile.objects.select_related('website').all()
        website_slug = self.request.query_params.get('website', None)
        if website_slug:
            if website_slug.isdigit():
                queryset = queryset.filter(website_id=int(website_slug))
            else:
                queryset = queryset.filter(website__slug=website_slug)
        return queryset
