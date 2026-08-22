from django.contrib import admin
from .models import Faq

@admin.register(Faq)
class FaqAdmin(admin.ModelAdmin):
    list_display = ('question', 'website', 'category', 'order', 'visible', 'created_at')
    list_filter = ('website', 'category', 'visible')
    search_fields = ('question', 'answer')
