from django.contrib import admin
from .models import Achievement

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuer', 'category', 'date_earned', 'is_featured', 'is_active', 'website')
    list_filter = ('website', 'category', 'is_featured', 'is_active')
    search_fields = ('title', 'issuer', 'description', 'credential_id')
