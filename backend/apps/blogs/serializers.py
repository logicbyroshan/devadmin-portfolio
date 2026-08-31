from rest_framework import serializers
from apps.common.serializers import WebsiteSlugOrPkRelatedField
from apps.websites.models import Website
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    website = WebsiteSlugOrPkRelatedField(queryset=Website.objects.all(), required=False)
    website_name = serializers.ReadOnlyField(source='website.name')
    website_slug = serializers.ReadOnlyField(source='website.slug')
    author = serializers.ReadOnlyField(source='author_dict')
    readTime = serializers.CharField(source='read_time', required=False)

    class Meta:
        model = BlogPost
        fields = '__all__'

    def create(self, validated_data):
        if 'website' not in validated_data or not validated_data['website']:
            default_site = Website.objects.filter(slug='dev-mate').first() or Website.objects.first()
            validated_data['website'] = default_site
        return super().create(validated_data)


class PublicBlogPostListSerializer(serializers.ModelSerializer):
    readTime = serializers.CharField(source='read_time')

    class Meta:
        model = BlogPost
        fields = ['id', 'slug', 'title', 'subtitle', 'category', 'date', 'readTime', 'image', 'tags', 'summary', 'views_count']


class PublicBlogPostDetailSerializer(serializers.ModelSerializer):
    readTime = serializers.CharField(source='read_time')
    author = serializers.ReadOnlyField(source='author_dict')

    class Meta:
        model = BlogPost
        fields = [
            'id', 'slug', 'title', 'subtitle', 'category', 'date', 'readTime',
            'image', 'tags', 'author', 'tldr', 'toc', 'sections', 'content',
            'views_count', 'created_at'
        ]
