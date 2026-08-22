"""
Reusable Notification & SMTP Dispatch Service
Encapsulates contact inquiry reply dispatch, email formatting, and delivery logging.
"""

import logging
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from apps.contacts.models import ContactInquiry

logger = logging.getLogger(__name__)

class NotificationService:
    @staticmethod
    def dispatch_inquiry_reply(inquiry: ContactInquiry, reply_subject: str, reply_text: str) -> dict:
        """
        Validates, persists, and dispatches an email reply to a contact inquiry.
        """
        clean_subject = (reply_subject or f"Re: {inquiry.subject}").strip()
        clean_text = reply_text.strip()

        if not clean_text:
            raise ValueError("Reply text message body is required.")

        # Persist reply state on inquiry model
        inquiry.replied = True
        inquiry.is_read = True
        inquiry.reply_subject = clean_subject
        inquiry.reply_text = clean_text
        inquiry.replied_at = timezone.now()
        inquiry.save(update_fields=['replied', 'is_read', 'reply_subject', 'reply_text', 'replied_at'])

        # Attempt SMTP dispatch if configured, otherwise simulate delivery
        try:
            from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'support@devadmin.io')
            send_mail(
                subject=clean_subject,
                message=clean_text,
                from_email=from_email,
                recipient_list=[inquiry.email],
                fail_silently=True
            )
        except Exception as ex:
            logger.warning(f"[NotificationService] SMTP delivery skipped (simulation mode): {ex}")

        return {
            'status': 'sent',
            'inquiry_id': inquiry.id,
            'recipient': inquiry.email,
            'subject': clean_subject,
            'replied_at': inquiry.replied_at.isoformat()
        }
