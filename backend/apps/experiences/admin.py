from django.contrib import admin
from .models import Experience

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'company', 'website', 'category', 'status', 'is_current', 'period', 'visible', 'created_at')
    list_filter = ('website', 'status', 'is_current', 'category', 'visible')
    search_fields = ('role', 'company', 'description', 'location')
