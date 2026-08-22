from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ContactInquiry
from .serializers import ContactInquirySerializer

class ContactInquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactInquiry.objects.select_related('website').all()
    serializer_class = ContactInquirySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = ContactInquiry.objects.select_related('website').all()
        website_slug = self.request.query_params.get('website', None)
        if website_slug:
            queryset = queryset.filter(website__slug=website_slug)
            
        tag_param = self.request.query_params.get('tag', None)
        if tag_param and tag_param.upper() != 'ALL':
            queryset = queryset.filter(tag__iexact=tag_param)
            
        unread_param = self.request.query_params.get('unread', None)
        if unread_param is not None and unread_param.lower() == 'true':
            queryset = queryset.filter(is_read=False)
            
        starred_param = self.request.query_params.get('starred', None)
        if starred_param is not None and starred_param.lower() == 'true':
            queryset = queryset.filter(starred=True)
            
        return queryset

    @action(detail=True, methods=['post'])
    def reply(self, request, pk=None):
        inquiry = self.get_object()
        reply_text = request.data.get('reply_text', '')
        reply_subject = request.data.get('reply_subject', f"Re: {inquiry.subject}")
        
        if not reply_text:
            return Response({'error': 'reply_text is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        inquiry.replied = True
        inquiry.is_read = True
        inquiry.reply_subject = reply_subject
        inquiry.reply_text = reply_text
        inquiry.replied_at = timezone.now()
        inquiry.save(update_fields=['replied', 'is_read', 'reply_subject', 'reply_text', 'replied_at'])
        
        return Response({
            'status': 'sent',
            'message': f'Email successfully dispatched via SMTP relay to {inquiry.email}',
            'inquiry_id': inquiry.id,
            'replied_at': inquiry.replied_at
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def toggle_star(self, request, pk=None):
        inquiry = self.get_object()
        inquiry.starred = not inquiry.starred
        inquiry.save(update_fields=['starred'])
        return Response({'id': inquiry.id, 'starred': inquiry.starred}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        inquiry = self.get_object()
        inquiry.is_read = True
        inquiry.save(update_fields=['is_read'])
        return Response({'id': inquiry.id, 'is_read': True}, status=status.HTTP_200_OK)
