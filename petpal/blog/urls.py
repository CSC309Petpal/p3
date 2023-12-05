from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name="blog"

urlpatterns = [
    path("creation/<int:shelter_id>/", views.BlogCreationView.as_view(), name="creation"),
    path("list/<int:shelter_id>/", views.BlogListView.as_view(), name="list"),
    path("detail/<int:blog_id>/",views.BlogRetrieveView.as_view(),name="blog_detail"),
    path('blogs/<int:blog_id>/like/', views.like_blog, name='blog-like'),
    
]