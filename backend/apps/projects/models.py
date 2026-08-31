from django.db import models
from django.utils.text import slugify
from apps.websites.models import Website

class Project(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('pilot', 'Pilot'),
        ('completed', 'Completed'),
        ('draft', 'Draft'),
        ('archived', 'Archived'),
        ('LIVE', 'Live'),
        ('OFFLINE', 'Offline'),
        ('PLANNED', 'Planned'),
        ('IN_PROGRESS', 'In Progress'),
        ('DONE', 'Done'),
    )

    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='projects', db_index=True)
    title = models.CharField(max_length=255)
    project_name = models.CharField(max_length=150, blank=True, default="", help_text="Short display name e.g. CardFlow")
    slug = models.SlugField(max_length=255, unique=True, db_index=True, blank=True)
    category = models.CharField(max_length=100, default="Web Application", db_index=True)
    category_id_val = models.IntegerField(blank=True, null=True, help_text="Optional Taxonomy Category ID")
    description = models.TextField(blank=True, default="", help_text="Short summary pitch")
    documentation = models.TextField(blank=True, default="", help_text="Full case study & architecture breakdown in Markdown/HTML")
    technologies = models.CharField(max_length=350, blank=True, default="", help_text="Comma-separated tags e.g. Python, React, PostgreSQL")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active', db_index=True)
    completed_date = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. 2025-05-15")
    image = models.TextField(blank=True, null=True, help_text="Cover screenshot / thumbnail image URL")
    thumbnail = models.TextField(blank=True, null=True, help_text="Cover thumbnail URL or media path")
    demo_url = models.URLField(blank=True, null=True, max_length=500)
    live_url = models.URLField(blank=True, null=True, max_length=500)
    github_url = models.URLField(blank=True, null=True, max_length=500)
    visible = models.BooleanField(default=True, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)
    featured = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    views = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        indexes = [
            models.Index(fields=['website', 'status'], name='idx_proj_site_status'),
            models.Index(fields=['website', 'category'], name='idx_proj_site_cat'),
            models.Index(fields=['website', 'visible'], name='idx_proj_site_vis'),
            models.Index(fields=['website', 'created_at'], name='idx_proj_site_created'),
        ]

    def save(self, *args, **kwargs):
        if not self.project_name and self.title:
            self.project_name = self.title
        if not self.slug:
            base_slug = slugify(self.project_name or self.title) or "project"
            candidate = base_slug
            idx = 1
            while Project.objects.filter(slug=candidate).exclude(pk=self.pk).exists():
                candidate = f"{base_slug}-{idx}"
                idx += 1
            self.slug = candidate
        if not self.documentation and self.description:
            self.documentation = self.description
        if not self.description and self.documentation:
            self.description = self.documentation[:200]
        # Sync visibility & featured aliases
        self.is_active = self.visible
        self.is_featured = self.featured
        super().save(*args, **kwargs)

    @property
    def technologies_list(self):
        if not self.technologies:
            return []
        return [t.strip() for t in self.technologies.split(',') if t.strip()]

    def __str__(self):
        return f"{self.title} ({self.website.name})"


class ProjectScreenshot(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='screenshots', db_index=True)
    image = models.TextField(help_text="Screenshot URL or media path")
    caption = models.CharField(max_length=255, blank=True, default="")
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"Screenshot for {self.project.title} (#{self.id})"
