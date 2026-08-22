from rest_framework import serializers
from .models import PortfolioProfile

class PortfolioProfileSerializer(serializers.ModelSerializer):
    website_name = serializers.ReadOnlyField(source='website.name')

    class Meta:
        model = PortfolioProfile
        fields = '__all__'
