"""
Reusable Serializer Fields & Mixins
"""

from rest_framework import serializers
from apps.websites.models import Website


class WebsiteSlugOrPkRelatedField(serializers.PrimaryKeyRelatedField):
    """
    Accepts either a Website integer PK (e.g. 1) or slug (e.g. 'dev-meet')
    when deserializing incoming payloads, and serializes to integer PK.
    """
    def to_internal_value(self, data):
        if isinstance(data, str) and not data.isdigit():
            try:
                return Website.objects.get(slug=data)
            except Website.DoesNotExist:
                raise serializers.ValidationError(f'Website with slug "{data}" does not exist.')
        return super().to_internal_value(data)
