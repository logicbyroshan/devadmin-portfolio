from django.db import models
from django.utils import timezone
from apps.websites.models import Website

class Experience(models.Model):
    STATUS_CHOICES = (
        ('CURRENT', 'Current Role'),
        ('PAST', 'Past Experience'),
    )

    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='experiences', db_index=True)
    role = models.CharField(max_length=150)
    company = models.CharField(max_length=150)
    category = models.CharField(max_length=100, default="Engineering", db_index=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    period = models.CharField(max_length=100, blank=True, null=True, help_text="e.g. 2022 - Present")
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True, help_text="Null if currently working here")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='CURRENT', db_index=True)
    is_current = models.BooleanField(default=True)
    description = models.TextField()
    visible = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['website', 'status'], name='idx_exp_site_status'),
            models.Index(fields=['website', 'category'], name='idx_exp_site_cat'),
            models.Index(fields=['website', 'visible'], name='idx_exp_site_vis'),
            models.Index(fields=['website', 'created_at'], name='idx_exp_site_created'),
        ]

    def __str__(self):
        return f"{self.role} at {self.company} ({self.website.name})"
