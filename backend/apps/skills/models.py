from django.db import models
from apps.websites.models import Website

class Skill(models.Model):
    CATEGORY_CHOICES = (
        ('FRONTEND', 'Frontend Development'),
        ('BACKEND', 'Backend Development'),
        ('DATABASE', 'Databases & Storage'),
        ('DEVOPS', 'DevOps & Tools'),
        ('OTHER', 'Other Technical Skills'),
    )

    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='FRONTEND')
    proficiency_percentage = models.PositiveIntegerField(default=85)
    icon_name = models.CharField(max_length=50, blank=True, null=True, help_text="Lucide icon name")

    class Meta:
        ordering = ['category', 'name']

    def __str__(self):
        return f"{self.name} ({self.proficiency_percentage}%)"
