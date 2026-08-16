from rest_framework import serializers
from .models import ContactInquiry

class ContactInquirySerializer(serializers.ModelSerializer):
    website_name = serializers.ReadOnlyField(source='website.name')

    class Meta:
        model = ContactInquiry
        fields = '__all__'
