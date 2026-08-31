from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    CATEGORY_TYPE_CHOICES = (
        ('project', 'Project'),
        ('skill', 'Skill'),
        ('experience', 'Experience'),
        ('achievement', 'Achievement'),
        ('blog', 'Blog'),
    )

    name = models.CharField(max_length=100)
    category_type = models.CharField(max_length=50, choices=CATEGORY_TYPE_CHOICES, default='project', db_index=True)
    slug = models.SlugField(max_length=120, unique=True, db_index=True, blank=True)
    icon = models.CharField(max_length=100, blank=True, default="fas fa-tag")
    color = models.CharField(max_length=50, blank=True, default="#38bdf8")
    description = models.TextField(blank=True, default="")
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name_plural = 'Categories'

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name) or "category"
            candidate = base_slug
            idx = 1
            while Category.objects.filter(slug=candidate).exclude(pk=self.pk).exists():
                candidate = f"{base_slug}-{idx}"
                idx += 1
            self.slug = candidate
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.get_category_type_display()})"
