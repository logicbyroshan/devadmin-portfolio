from rest_framework import serializers
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    website_name = serializers.ReadOnlyField(source='website.name')

    class Meta:
        model = BlogPost
        fields = '__all__'
