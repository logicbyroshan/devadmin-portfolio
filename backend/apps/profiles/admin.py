from django.contrib import admin
from .models import PortfolioProfile

@admin.register(PortfolioProfile)
class PortfolioProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'website', 'email', 'updated_at')
    search_fields = ('name', 'title', 'email', 'bio')
