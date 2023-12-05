"""
URL configuration for petpal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

schema_view = get_schema_view(
    openapi.Info(
        title="Petpal API",
        default_version='P2',
        description="API documentation for P2 Petpal",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        
        data['user_type'] = self.user.user_type
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('accounts/', include("accounts.urls", namespace='accounts')),
    path('pets/', include("pets.urls", namespace='pets')),
    path('notifications/', include("notifications.urls", namespace='notifications')),
    path('comments/', include("comments.urls", namespace='comments')),
    path('applications/', include("applications.urls", namespace='applications')),
    path('followup/', include("followup.urls", namespace='followup')),
    path('blog/', include("blog.urls", namespace='blog')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)