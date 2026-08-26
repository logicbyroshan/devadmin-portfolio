from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

from apps.websites.views_auth import RegisterView, CurrentUserView, ChangePasswordView
from apps.common.views_health import HealthCheckView, ApiRootView

urlpatterns = [
    path('', ApiRootView.as_view(), name='root_index'),
    path('api/', ApiRootView.as_view(), name='api_root_index'),
    path('admin/', admin.site.urls),
    
    # OpenAPI 3.0 & Interactive Swagger UI Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    
    # Health Check Endpoint
    path('api/health/', HealthCheckView.as_view(), name='health_check'),
    path('health/', HealthCheckView.as_view(), name='health_check_root'),
    
    # JWT Authentication Endpoints
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/register/', RegisterView.as_view(), name='auth_register'),
    path('api/auth/me/', CurrentUserView.as_view(), name='auth_current_user'),
    path('api/auth/change-password/', ChangePasswordView.as_view(), name='auth_change_password'),
    
    # Multi-Site App Domain API Endpoints
    path('api/websites/', include('apps.websites.urls')),
    path('api/blogs/', include('apps.blogs.urls')),
    path('api/projects/', include('apps.projects.urls')),
    path('api/experiences/', include('apps.experiences.urls')),
    path('api/skills/', include('apps.skills.urls')),
    path('api/contacts/', include('apps.contacts.urls')),
    path('api/faqs/', include('apps.faqs.urls')),
    path('api/profiles/', include('apps.profiles.urls')),
    path('api/dashboard/', include('apps.dashboard.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
