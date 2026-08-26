from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.common.mixins import MultiTenantViewSetMixin
from apps.common.services.mail_service import NotificationService
from .models import ContactInquiry
from .serializers import ContactInquirySerializer

class ContactInquiryViewSet(MultiTenantViewSetMixin, viewsets.ModelViewSet):
    """
    Contact Inquiries & Messaging API.
    Supports email inquiries, message starring, read toggles, and authenticated SMTP replies.
    - Public visitors can submit contact inquiries (POST).
    - Only authenticated administrators can read, star, delete, or reply to messages.
    """
    queryset = ContactInquiry.objects.select_related('website').all()
    serializer_class = ContactInquirySerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        queryset = super().get_queryset()
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

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def reply(self, request, pk=None):
        """Dispatches an email reply via NotificationService."""
        inquiry = self.get_object()
        reply_text = request.data.get('reply_text', '')
        reply_subject = request.data.get('reply_subject', f"Re: {inquiry.subject}")

        if not reply_text:
            return Response({'error': 'reply_text is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            result = NotificationService.dispatch_inquiry_reply(inquiry, reply_subject, reply_text)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as ex:
            return Response({'error': str(ex)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def toggle_star(self, request, pk=None):
        """Toggle starred status."""
        inquiry = self.get_object()
        inquiry.starred = not inquiry.starred
        inquiry.save(update_fields=['starred'])
        return Response({'id': inquiry.id, 'starred': inquiry.starred}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def mark_read(self, request, pk=None):
        """Mark message as read."""
        inquiry = self.get_object()
        inquiry.is_read = True
        inquiry.save(update_fields=['is_read'])
        return Response({'id': inquiry.id, 'is_read': True}, status=status.HTTP_200_OK)
