from django.db import models
from apps.websites.models import Website

class Experience(models.Model):
    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='experiences')
    role = models.CharField(max_length=150)
    company = models.CharField(max_length=150)
    location = models.CharField(max_length=100, blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True, help_text="Null if currently working here")
    is_current = models.BooleanField(default=False)
    description = models.TextField()

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.role} at {self.company}"
