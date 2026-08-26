from django.contrib import admin
from .models import BlogPost

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'website', 'category', 'status', 'date', 'read_time', 'views_count', 'visible', 'created_at')
    list_filter = ('website', 'status', 'category', 'visible')
    search_fields = ('title', 'summary', 'content', 'slug')
    prepopulated_fields = {'slug': ('title',)}
