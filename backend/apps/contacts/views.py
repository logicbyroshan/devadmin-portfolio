from rest_framework import viewsets, permissions
from .models import ContactInquiry
from .serializers import ContactInquirySerializer

class ContactInquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer
    permission_classes = [permissions.AllowAny] # Anyone can submit contact form

    def get_queryset(self):
        queryset = super().get_queryset()
        website_slug = self.request.query_params.get('website', None)
        if website_slug:
            queryset = queryset.filter(website__slug=website_slug)
        return queryset
