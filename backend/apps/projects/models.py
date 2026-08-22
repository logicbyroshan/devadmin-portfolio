from django.db import models
from apps.websites.models import Website

class Project(models.Model):
    STATUS_CHOICES = (
        ('LIVE', 'Live'),
        ('OFFLINE', 'Offline'),
        ('PLANNED', 'Planned'),
        ('IN_PROGRESS', 'In Progress'),
        ('DONE', 'Done'),
    )

    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='projects', db_index=True)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    description = models.TextField(help_text="Detailed project technical documentation, architecture, and markdown")
    category = models.CharField(max_length=100, default="Web Application", db_index=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='LIVE', db_index=True)
    completed_date = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. 2025-05-15")
    image = models.TextField(blank=True, null=True, help_text="Cover screenshot image URL")
    demo_url = models.URLField(blank=True, null=True, max_length=500)
    github_url = models.URLField(blank=True, null=True, max_length=500)
    technologies = models.CharField(max_length=255, blank=True, default="", help_text="Comma-separated tags")
    visible = models.BooleanField(default=True, db_index=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['website', 'status'], name='idx_proj_site_status'),
            models.Index(fields=['website', 'category'], name='idx_proj_site_cat'),
            models.Index(fields=['website', 'visible'], name='idx_proj_site_vis'),
            models.Index(fields=['website', 'created_at'], name='idx_proj_site_created'),
        ]

    def __str__(self):
        return f"{self.title} ({self.website.name})"
