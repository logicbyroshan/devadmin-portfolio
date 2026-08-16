from rest_framework import viewsets, permissions
from .models import Experience
from .serializers import ExperienceSerializer

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        website_slug = self.request.query_params.get('website', None)
        if website_slug:
            queryset = queryset.filter(website__slug=website_slug)
        return queryset
