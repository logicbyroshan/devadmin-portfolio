from django.db import models

class Website(models.Model):
    slug = models.SlugField(max_length=50, unique=True, help_text="e.g. dev-meet, dev-mitra, dev-mate")
    name = models.CharField(max_length=100)
    badge = models.CharField(max_length=20, help_text="e.g. MEET, MITRA, MATE")
    tag = models.CharField(max_length=255, help_text="Description or tagline")
    primary_color = models.CharField(max_length=20, default="blue", help_text="blue, sky, or violet")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f"{self.name} [{self.badge}]"
