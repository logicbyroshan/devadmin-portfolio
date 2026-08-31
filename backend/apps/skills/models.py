from django.db import models
from django.utils import timezone
from apps.websites.models import Website

class Skill(models.Model):
    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='skills', db_index=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, default='Frontend', db_index=True)
    category_id_val = models.IntegerField(blank=True, null=True)
    proficiency = models.PositiveIntegerField(default=85, help_text="Percentage 0-100")
    level = models.PositiveIntegerField(default=85, help_text="Percentage 0-100")
    years_of_experience = models.PositiveIntegerField(default=3)
    icon = models.CharField(max_length=100, blank=True, default="fas fa-code", help_text="FontAwesome or Lucide icon name")
    icon_name = models.CharField(max_length=100, blank=True, default="Code2")
    is_top = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True, db_index=True)
    visible = models.BooleanField(default=True, db_index=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'category', 'name']
        indexes = [
            models.Index(fields=['website', 'category'], name='idx_skill_site_cat'),
            models.Index(fields=['website', 'visible'], name='idx_skill_site_vis'),
            models.Index(fields=['website', 'created_at'], name='idx_skill_site_created'),
        ]

    def save(self, *args, **kwargs):
        if not self.proficiency and self.level:
            self.proficiency = self.level
        if not self.level and self.proficiency:
            self.level = self.proficiency
        if not self.icon and self.icon_name:
            self.icon = self.icon_name
        if not self.icon_name and self.icon:
            self.icon_name = self.icon
        self.is_active = self.visible
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.proficiency}%) - {self.website.name}"
