from django.db import models
from apps.websites.models import Website

class Faq(models.Model):
    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='faqs', db_index=True)
    question = models.CharField(max_length=255)
    answer = models.TextField()
    category = models.CharField(max_length=100, default="General", db_index=True)
    order = models.PositiveIntegerField(default=0)
    visible = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']
        indexes = [
            models.Index(fields=['website', 'category'], name='idx_faq_site_cat'),
            models.Index(fields=['website', 'visible'], name='idx_faq_site_vis'),
            models.Index(fields=['website', 'created_at'], name='idx_faq_site_created'),
        ]

    def __str__(self):
        return f"{self.question[:50]}... ({self.website.name})"
