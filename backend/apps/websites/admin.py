from django.contrib import admin
from .models import Website

@admin.register(Website)
class WebsiteAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'badge', 'primary_color', 'is_active', 'created_at')
    list_filter = ('is_active', 'primary_color')
    search_fields = ('name', 'slug', 'tag', 'badge')
    prepopulated_fields = {'slug': ('name',)}
