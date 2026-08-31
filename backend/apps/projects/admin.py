from django.contrib import admin
from .models import Project, ProjectScreenshot

class ProjectScreenshotInline(admin.TabularInline):
    model = ProjectScreenshot
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'project_name', 'category', 'status', 'visible', 'featured', 'order', 'website')
    list_filter = ('website', 'status', 'category', 'visible', 'featured')
    search_fields = ('title', 'project_name', 'description', 'technologies', 'slug')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectScreenshotInline]
