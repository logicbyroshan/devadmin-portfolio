from rest_framework import serializers
from apps.common.serializers import WebsiteSlugOrPkRelatedField
from apps.websites.models import Website
from .models import Project, ProjectScreenshot

class ProjectScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectScreenshot
        fields = ['id', 'image', 'caption', 'order', 'created_at']


class ProjectSerializer(serializers.ModelSerializer):
    website = WebsiteSlugOrPkRelatedField(queryset=Website.objects.all(), required=False)
    website_name = serializers.ReadOnlyField(source='website.name')
    website_slug = serializers.ReadOnlyField(source='website.slug')
    screenshots = ProjectScreenshotSerializer(many=True, read_only=True)
    technologies_list = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = '__all__'

    def create(self, validated_data):
        if 'website' not in validated_data or not validated_data['website']:
            default_site = Website.objects.filter(slug='dev-mate').first() or Website.objects.first()
            validated_data['website'] = default_site
        return super().create(validated_data)
