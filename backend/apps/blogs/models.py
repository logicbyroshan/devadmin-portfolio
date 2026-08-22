from django.db import models
from apps.websites.models import Website

class BlogPost(models.Model):
    STATUS_CHOICES = (
        ('DRAFT', 'Draft'),
        ('SCHEDULED', 'Scheduled'),
        ('PUBLISHED', 'Published'),
    )

    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='blogs', db_index=True)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    category = models.CharField(max_length=100, default="Software Engineering", db_index=True)
    summary = models.TextField(blank=True, null=True)
    content = models.TextField(help_text="Full markdown article, code blocks, diagrams, benchmarks")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='DRAFT', db_index=True)
    date = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. June 20, 2025")
    scheduled_date = models.DateField(blank=True, null=True)
    read_time = models.CharField(max_length=50, default="5 min read")
    views_count = models.PositiveIntegerField(default=0)
    visible = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['website', 'status'], name='idx_blog_site_status'),
            models.Index(fields=['website', 'category'], name='idx_blog_site_cat'),
            models.Index(fields=['website', 'visible'], name='idx_blog_site_vis'),
            models.Index(fields=['website', 'created_at'], name='idx_blog_site_created'),
        ]

    def __str__(self):
        return f"{self.title} ({self.website.name})"
