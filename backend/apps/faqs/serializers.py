from rest_framework import serializers
from .models import Faq

class FaqSerializer(serializers.ModelSerializer):
    website_name = serializers.ReadOnlyField(source='website.name')

    class Meta:
        model = Faq
        fields = '__all__'
