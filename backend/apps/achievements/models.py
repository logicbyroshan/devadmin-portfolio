from django.db import models
from apps.websites.models import Website

class Achievement(models.Model):
    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='achievements', db_index=True)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100, default="Certification", db_index=True)
    issuer = models.CharField(max_length=150, blank=True, default="")
    date_earned = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. 2024-11-20")
    description = models.TextField(blank=True, default="")
    credential_id = models.CharField(max_length=150, blank=True, default="")
    credential_url = models.URLField(max_length=500, blank=True, null=True)
    badge_image = models.TextField(blank=True, null=True, help_text="Badge image URL or media path")
    certificate_pdf = models.TextField(blank=True, null=True, help_text="Certificate PDF URL or media path")
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True, db_index=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        indexes = [
            models.Index(fields=['website', 'is_active'], name='idx_ach_site_active'),
            models.Index(fields=['website', 'category'], name='idx_ach_site_cat'),
        ]

    def __str__(self):
        return f"{self.title} - {self.issuer} ({self.website.name})"
