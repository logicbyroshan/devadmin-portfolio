from django.contrib import admin
from .models import Skill

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'category', 'level', 'icon_name', 'visible', 'created_at')
    list_filter = ('website', 'category', 'visible')
    search_fields = ('name', 'category', 'icon_name')
