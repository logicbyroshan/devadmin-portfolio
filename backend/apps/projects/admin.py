from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'website', 'category', 'status', 'completed_date', 'visible', 'featured', 'created_at')
    list_filter = ('website', 'status', 'category', 'visible', 'featured')
    search_fields = ('title', 'description', 'technologies', 'slug')
    prepopulated_fields = {'slug': ('title',)}
