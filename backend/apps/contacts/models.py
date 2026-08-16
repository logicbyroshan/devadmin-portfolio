from django.db import models
from apps.websites.models import Website

class ContactInquiry(models.Model):
    TAG_CHOICES = (
        ('Inquiry', 'Inquiry'),
        ('Hire', 'Hire'),
        ('Feedback', 'Feedback'),
        ('Consultation', 'Consultation'),
    )

    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='contacts')
    name = models.CharField(max_length=150)
    email = models.EmailField()
    message = models.TextField()
    tag = models.CharField(max_length=50, choices=TAG_CHOICES, default='Inquiry')
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} ({self.tag}) - {self.website.name}"
