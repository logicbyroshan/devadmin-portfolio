from django.db import models
from django.utils import timezone
from apps.websites.models import Website

class Experience(models.Model):
    STATUS_CHOICES = (
        ('CURRENT', 'Current Role'),
        ('PAST', 'Past Experience'),
    )

    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='experiences', db_index=True)
    role = models.CharField(max_length=150, help_text="Job title or position")
    company = models.CharField(max_length=150, help_text="Company name")
    category = models.CharField(max_length=100, default="Engineering", db_index=True)
    category_id_val = models.IntegerField(blank=True, null=True)
    employment_type = models.CharField(max_length=50, default="full-time")
    location = models.CharField(max_length=150, blank=True, null=True)
    company_website = models.URLField(max_length=300, blank=True, null=True)
    company_logo = models.TextField(blank=True, null=True, help_text="Company logo URL or media path")
    period = models.CharField(max_length=100, blank=True, null=True, help_text="e.g. 2022 - Present")
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True, help_text="Null if currently working here")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='CURRENT', db_index=True)
    is_current = models.BooleanField(default=True)
    currently_working = models.BooleanField(default=True)
    short_description = models.TextField(blank=True, default="")
    description = models.TextField(blank=True, default="", help_text="Detailed key responsibilities and highlights")
    visible = models.BooleanField(default=True, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        indexes = [
            models.Index(fields=['website', 'status'], name='idx_exp_site_status'),
            models.Index(fields=['website', 'category'], name='idx_exp_site_cat'),
            models.Index(fields=['website', 'visible'], name='idx_exp_site_vis'),
            models.Index(fields=['website', 'created_at'], name='idx_exp_site_created'),
        ]

    def save(self, *args, **kwargs):
        self.is_active = self.visible
        self.currently_working = self.is_current
        if not self.short_description and self.description:
            self.short_description = self.description[:200]
        if not self.description and self.short_description:
            self.description = self.short_description
        super().save(*args, **kwargs)

    @property
    def position(self):
        return self.role

    @property
    def company_name(self):
        return self.company

    @property
    def detailed_description(self):
        return self.description

    def __str__(self):
        return f"{self.role} at {self.company} ({self.website.name})"


class ExperienceImage(models.Model):
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE, related_name='images', db_index=True)
    image = models.TextField(help_text="Workplace photo URL or media path")
    caption = models.CharField(max_length=255, blank=True, default="")
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"Image for {self.experience.role} (#{self.id})"
