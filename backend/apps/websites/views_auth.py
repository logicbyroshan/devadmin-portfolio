from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterView(APIView):
    """
    Public User Registration Endpoint.
    Creates a new user account with validated credentials and returns a JWT token pair.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username', '').strip()
        email = request.data.get('email', '').strip()
        password = request.data.get('password', '').strip()
        first_name = request.data.get('first_name', '').strip() or 'Admin'
        last_name = request.data.get('last_name', '').strip() or 'User'

        if not username or not password:
            return Response(
                {'error': 'Username and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username__iexact=username).exists():
            return Response(
                {'error': f'Username "{username}" is already taken.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if email and User.objects.filter(email__iexact=email).exists():
            return Response(
                {'error': f'Email "{email}" is already registered.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate password strength against Django password validators
        try:
            validate_password(password)
        except ValidationError as e:
            return Response(
                {'error': ' '.join(e.messages)},
                status=status.HTTP_400_BAD_REQUEST
            )

        is_first_user = not User.objects.exists()
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            is_staff=is_first_user
        )

        refresh = RefreshToken.for_user(user)

        return Response({
            'status': 'success',
            'message': 'Account successfully created.',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'is_staff': user.is_staff,
                'is_superuser': user.is_superuser,
            },
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_201_CREATED)


class CurrentUserView(APIView):
    """
    Returns the currently authenticated user profile based on the JWT Bearer token.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
        }, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    """
    Authenticated endpoint to change user password with verification.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        current_password = request.data.get('current_password', '')
        new_password = request.data.get('new_password', '')

        if not current_password or not new_password:
            return Response(
                {'error': 'Both current_password and new_password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not user.check_password(current_password):
            return Response(
                {'error': 'Current password is incorrect.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            validate_password(new_password, user=user)
        except ValidationError as e:
            return Response(
                {'error': ' '.join(e.messages)},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(new_password)
        user.save()

        # Generate new token pair for user session
        refresh = RefreshToken.for_user(user)

        return Response({
            'status': 'success',
            'message': 'Password updated successfully.',
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_200_OK)
