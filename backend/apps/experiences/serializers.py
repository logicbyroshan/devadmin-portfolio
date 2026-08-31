from rest_framework import serializers
from apps.common.serializers import WebsiteSlugOrPkRelatedField
from apps.websites.models import Website
from .models import Experience, ExperienceImage

class ExperienceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceImage
        fields = ['id', 'image', 'caption', 'order', 'created_at']


class ExperienceSerializer(serializers.ModelSerializer):
    website = WebsiteSlugOrPkRelatedField(queryset=Website.objects.all(), required=False)
    website_name = serializers.ReadOnlyField(source='website.name')
    website_slug = serializers.ReadOnlyField(source='website.slug')
    images = ExperienceImageSerializer(many=True, read_only=True)
    position = serializers.CharField(source='role', required=False)
    company_name = serializers.CharField(source='company', required=False)
    detailed_description = serializers.CharField(source='description', required=False)

    class Meta:
        model = Experience
        fields = '__all__'

    def create(self, validated_data):
        if 'website' not in validated_data or not validated_data['website']:
            default_site = Website.objects.filter(slug='dev-mate').first() or Website.objects.first()
            validated_data['website'] = default_site
        return super().create(validated_data)
