from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # JWT Authentication Endpoints
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
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
