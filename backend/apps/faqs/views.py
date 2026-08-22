from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Faq
from .serializers import FaqSerializer

class FaqViewSet(viewsets.ModelViewSet):
    queryset = Faq.objects.select_related('website').all()
    serializer_class = FaqSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Faq.objects.select_related('website').all()
        website_slug = self.request.query_params.get('website', None)
        if website_slug:
            queryset = queryset.filter(website__slug=website_slug)
            
        category_param = self.request.query_params.get('category', None)
        if category_param and category_param.upper() != 'ALL':
            queryset = queryset.filter(category__iexact=category_param)
            
        visible_param = self.request.query_params.get('visible', None)
        if visible_param is not None:
            queryset = queryset.filter(visible=(visible_param.lower() == 'true'))
            
        return queryset

    @action(detail=True, methods=['post'])
    def toggle_visibility(self, request, pk=None):
        faq = self.get_object()
        faq.visible = not faq.visible
        faq.save(update_fields=['visible', 'updated_at'])
        return Response({'id': faq.id, 'visible': faq.visible, 'status': 'success'}, status=status.HTTP_200_OK)
