from django.db import models
from apps.websites.models import Website

class ContactInquiry(models.Model):
    TAG_CHOICES = (
        ('Inquiry', 'Inquiry'),
        ('Hire', 'Hire'),
        ('Feedback', 'Feedback'),
        ('Consultation', 'Consultation'),
    )

    STATUS_CHOICES = (
        ('new', 'New'),
        ('read', 'Read'),
        ('replied', 'Replied'),
        ('spam', 'Spam'),
        ('archived', 'Archived'),
    )

    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='contacts', db_index=True)
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=255, blank=True, default="General Inquiry")
    message = models.TextField()
    tag = models.CharField(max_length=50, choices=TAG_CHOICES, default='Inquiry', db_index=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='new', db_index=True)
    is_read = models.BooleanField(default=False, db_index=True)
    starred = models.BooleanField(default=False, db_index=True)
    admin_notes = models.TextField(blank=True, default="")
    replied = models.BooleanField(default=False)
    reply_subject = models.CharField(max_length=255, blank=True, null=True)
    reply_text = models.TextField(blank=True, null=True)
    replied_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['website', 'status'], name='idx_msg_site_status'),
            models.Index(fields=['website', 'is_read'], name='idx_msg_site_read'),
            models.Index(fields=['website', 'tag'], name='idx_msg_site_tag'),
            models.Index(fields=['website', 'starred'], name='idx_msg_site_starred'),
            models.Index(fields=['website', 'created_at'], name='idx_msg_site_created'),
        ]

    def save(self, *args, **kwargs):
        if self.is_read and self.status == 'new':
            self.status = 'read'
        elif self.status in ['read', 'replied', 'archived']:
            self.is_read = True
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Message from {self.name} ({self.tag}) - {self.website.name}"
