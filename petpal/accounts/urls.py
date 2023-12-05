from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name="accounts"

urlpatterns = [
    path('shelter/<int:pk>/', views.ShelterRetrieveUpdateDestroyView.as_view(), name='shelter-detail'),
    path('seeker/<int:pk>/', views.SeekerRetrieveUpdateDestroyView.as_view(), name='seeker-detail'),
    path('shelter/', views.ShelterListCreateAPIView.as_view(), name='shelter-create'),
    path('seeker/', views.SeekerCreateAPIView.as_view(), name='seeker-create'),

]