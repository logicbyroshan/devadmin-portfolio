from django.db import models
from django.utils import timezone
from apps.websites.models import Website

class Skill(models.Model):
    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='skills', db_index=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, default='Frontend', db_index=True)
    level = models.PositiveIntegerField(default=85, help_text="Percentage 0-100")
    icon_name = models.CharField(max_length=50, blank=True, null=True, help_text="Lucide icon name (e.g. Code2, Layers, Server, Database)")
    visible = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['category', 'name']
        indexes = [
            models.Index(fields=['website', 'category'], name='idx_skill_site_cat'),
            models.Index(fields=['website', 'visible'], name='idx_skill_site_vis'),
            models.Index(fields=['website', 'created_at'], name='idx_skill_site_created'),
        ]

    def __str__(self):
        return f"{self.name} ({self.level}%) - {self.website.name}"
