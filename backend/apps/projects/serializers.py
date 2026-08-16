from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    website_name = serializers.ReadOnlyField(source='website.name')

    class Meta:
        model = Project
        fields = '__all__'
