from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name="blog"

urlpatterns = [
    path("", views.BlogListCreateAPIView.as_view(), name="blog_list_create"),
    path("<int:pk>/", views.BlogRetrieveUpdateDestroyView.as_view(), name="blog_retrieve_update_destroy"),
    path('shelter/<int:shelter_id>/', views.BlogListCreateAPIView.as_view(), name='shelter-blogs'),
    
]