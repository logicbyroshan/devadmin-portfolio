from django.contrib import admin
from .models import ContactInquiry

@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'website', 'tag', 'is_read', 'starred', 'replied', 'created_at')
    list_filter = ('website', 'tag', 'is_read', 'starred', 'replied')
    search_fields = ('name', 'email', 'subject', 'message', 'reply_text')
    readonly_fields = ('created_at', 'replied_at')
