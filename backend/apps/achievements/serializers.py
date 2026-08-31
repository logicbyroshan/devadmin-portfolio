from rest_framework import serializers
from apps.common.serializers import WebsiteSlugOrPkRelatedField
from apps.websites.models import Website
from .models import Achievement

class AchievementSerializer(serializers.ModelSerializer):
    website = WebsiteSlugOrPkRelatedField(queryset=Website.objects.all(), required=False)
    website_name = serializers.ReadOnlyField(source='website.name')
    website_slug = serializers.ReadOnlyField(source='website.slug')

    class Meta:
        model = Achievement
        fields = '__all__'

    def create(self, validated_data):
        if 'website' not in validated_data or not validated_data['website']:
            default_site = Website.objects.filter(slug='dev-mate').first() or Website.objects.first()
            validated_data['website'] = default_site
        return super().create(validated_data)
