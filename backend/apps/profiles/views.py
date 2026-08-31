import os
from django.conf import settings
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.websites.models import Website
from .models import PortfolioProfile
from .serializers import PortfolioProfileSerializer

def get_or_create_devmate_profile():
    website = Website.objects.filter(slug='dev-mate').first() or Website.objects.first()
    if not website:
        website = Website.objects.create(
            slug='dev-mate',
            name='DevMate',
            badge='DevMate',
            tag='In-Browser Cloud Sandbox & Code IDE',
            primary_color='violet'
        )
    profile, _ = PortfolioProfile.objects.get_or_create(website=website)
    return profile


class PortfolioProfileViewSet(viewsets.ModelViewSet):
    """
    Standard Multi-Site Profile ViewSet.
    """
    queryset = PortfolioProfile.objects.select_related('website').all()
    serializer_class = PortfolioProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        website_param = self.request.query_params.get('website', None)
        if website_param:
            if website_param.isdigit():
                queryset = queryset.filter(website_id=int(website_param))
            else:
                queryset = queryset.filter(website__slug=website_param)
        return queryset


class AdminProfileView(APIView):
    """
    Staff Admin Profile & Hero Customization Endpoint.
    GET /api/v1/admin/profile/
    PUT/PATCH /api/v1/admin/profile/
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request):
        profile = get_or_create_devmate_profile()
        serializer = PortfolioProfileSerializer(profile)
        return Response({
            'success': True,
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    def put(self, request):
        return self.patch(request)

    def patch(self, request):
        profile = get_or_create_devmate_profile()
        serializer = PortfolioProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'message': 'Profile and hero settings updated successfully.',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UploadProfileImageView(APIView):
    """POST /api/v1/admin/profile/upload-image/"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        file = request.FILES.get('profile_image') or request.FILES.get('image')
        if not file:
            return Response({'error': 'profile_image file is required.'}, status=status.HTTP_400_BAD_REQUEST)

        os.makedirs(os.path.join(settings.MEDIA_ROOT, 'profile'), exist_ok=True)
        file_path = os.path.join(settings.MEDIA_ROOT, 'profile', file.name)
        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        media_url = f"/media/profile/{file.name}"
        profile = get_or_create_devmate_profile()
        profile.profile_image = media_url
        profile.avatar = media_url
        profile.save(update_fields=['profile_image', 'avatar', 'updated_at'])

        return Response({
            'success': True,
            'message': 'Profile picture uploaded.',
            'profile_image': media_url
        }, status=status.HTTP_200_OK)


class DeleteProfileImageView(APIView):
    """DELETE /api/v1/admin/profile/delete-image/"""
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        profile = get_or_create_devmate_profile()
        profile.profile_image = ""
        profile.avatar = ""
        profile.save(update_fields=['profile_image', 'avatar', 'updated_at'])
        return Response({'success': True, 'message': 'Profile image removed.'}, status=status.HTTP_200_OK)


class UploadHeroImageView(APIView):
    """POST /api/v1/admin/profile/upload-hero-image/"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        file = request.FILES.get('hero_image') or request.FILES.get('image')
        if not file:
            return Response({'error': 'hero_image file is required.'}, status=status.HTTP_400_BAD_REQUEST)

        os.makedirs(os.path.join(settings.MEDIA_ROOT, 'hero'), exist_ok=True)
        file_path = os.path.join(settings.MEDIA_ROOT, 'hero', file.name)
        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        media_url = f"/media/hero/{file.name}"
        profile = get_or_create_devmate_profile()
        profile.hero_image = media_url
        profile.save(update_fields=['hero_image', 'updated_at'])

        return Response({
            'success': True,
            'message': 'Hero banner image uploaded.',
            'hero_image': media_url
        }, status=status.HTTP_200_OK)


class DeleteHeroImageView(APIView):
    """DELETE /api/v1/admin/profile/delete-hero-image/"""
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        profile = get_or_create_devmate_profile()
        profile.hero_image = "/media/hero/custom_hero.webp"
        profile.save(update_fields=['hero_image', 'updated_at'])
        return Response({'success': True, 'message': 'Hero image reverted to default.'}, status=status.HTTP_200_OK)


class UploadDocumentView(APIView):
    """POST /api/v1/admin/profile/upload-document/"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        file = request.FILES.get('file') or request.FILES.get('document')
        doc_type = request.data.get('doc_type', 'resume').lower()

        if not file:
            return Response({'error': 'file is required.'}, status=status.HTTP_400_BAD_REQUEST)

        os.makedirs(os.path.join(settings.MEDIA_ROOT, 'documents'), exist_ok=True)
        file_path = os.path.join(settings.MEDIA_ROOT, 'documents', file.name)
        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        media_url = f"/media/documents/{file.name}"
        profile = get_or_create_devmate_profile()
        if doc_type == 'cover_letter':
            profile.cover_letter = media_url
            profile.save(update_fields=['cover_letter', 'updated_at'])
        else:
            profile.resume = media_url
            profile.save(update_fields=['resume', 'updated_at'])

        return Response({
            'success': True,
            'message': f'Document ({doc_type}) uploaded successfully.',
            'url': media_url,
            'doc_type': doc_type
        }, status=status.HTTP_200_OK)


class DeleteDocumentView(APIView):
    """DELETE /api/v1/admin/profile/delete-document/?type=resume"""
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        doc_type = request.query_params.get('type', 'resume').lower()
        profile = get_or_create_devmate_profile()
        if doc_type == 'cover_letter':
            profile.cover_letter = None
            profile.save(update_fields=['cover_letter', 'updated_at'])
        else:
            profile.resume = None
            profile.save(update_fields=['resume', 'updated_at'])

        return Response({'success': True, 'message': f'{doc_type} deleted.'}, status=status.HTTP_200_OK)
