import os
from django.conf import settings
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.common.mixins import MultiTenantViewSetMixin
from .models import Experience, ExperienceImage
from .serializers import ExperienceSerializer, ExperienceImageSerializer

class ExperienceViewSet(MultiTenantViewSetMixin, viewsets.ModelViewSet):
    """
    Work Experience API.
    Supports multi-tenant scoping, workplace imagery upload, and CRUD.
    """
    queryset = Experience.objects.select_related('website').prefetch_related('images').all()
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=['post'], url_path='upload-images', permission_classes=[permissions.IsAuthenticated])
    def upload_images(self, request, pk=None):
        """Upload additional workplace photos for an experience."""
        experience = self.get_object()
        files = request.FILES.getlist('images') or request.FILES.getlist('workplace_images') or request.FILES.getlist('image')
        image_urls = request.data.get('image_urls', [])

        created = []
        if files:
            for idx, f in enumerate(files):
                filename = f"experience/{experience.id}_{f.name}"
                os.makedirs(os.path.join(settings.MEDIA_ROOT, 'experience'), exist_ok=True)
                file_path = os.path.join(settings.MEDIA_ROOT, filename)
                with open(file_path, 'wb+') as destination:
                    for chunk in f.chunks():
                        destination.write(chunk)
                media_url = f"/media/{filename}"
                img = ExperienceImage.objects.create(
                    experience=experience,
                    image=media_url,
                    order=experience.images.count() + idx
                )
                created.append(ExperienceImageSerializer(img).data)

        if isinstance(image_urls, list):
            for idx, url in enumerate(image_urls):
                if url:
                    img = ExperienceImage.objects.create(
                        experience=experience,
                        image=url,
                        order=experience.images.count() + idx
                    )
                    created.append(ExperienceImageSerializer(img).data)

        return Response({
            'success': True,
            'message': f'Uploaded {len(created)} workplace images.',
            'images': created
        }, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['delete'], url_path=r'images/(?P<image_id>\d+)', permission_classes=[permissions.IsAuthenticated])
    def delete_image(self, request, pk=None, image_id=None):
        """Remove a specific workplace image."""
        experience = self.get_object()
        try:
            img = experience.images.get(id=image_id)
            img.delete()
            return Response({'success': True, 'message': 'Image deleted.'}, status=status.HTTP_200_OK)
        except ExperienceImage.DoesNotExist:
            return Response({'error': 'Image not found.'}, status=status.HTTP_404_NOT_FOUND)
