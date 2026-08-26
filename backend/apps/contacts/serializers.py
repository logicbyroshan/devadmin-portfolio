from rest_framework import serializers
from apps.common.serializers import WebsiteSlugOrPkRelatedField
from apps.websites.models import Website
from .models import ContactInquiry

class ContactInquirySerializer(serializers.ModelSerializer):
    website = WebsiteSlugOrPkRelatedField(queryset=Website.objects.all())
    website_name = serializers.ReadOnlyField(source='website.name')
    website_slug = serializers.ReadOnlyField(source='website.slug')

    class Meta:
        model = ContactInquiry
        fields = '__all__'
        read_only_fields = ('replied', 'replied_at', 'reply_subject', 'reply_text', 'created_at')
