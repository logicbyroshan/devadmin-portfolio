from rest_framework import serializers
from apps.common.serializers import WebsiteSlugOrPkRelatedField
from apps.websites.models import Website
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    website = WebsiteSlugOrPkRelatedField(queryset=Website.objects.all())
    website_name = serializers.ReadOnlyField(source='website.name')
    website_slug = serializers.ReadOnlyField(source='website.slug')

    class Meta:
        model = BlogPost
        fields = '__all__'
