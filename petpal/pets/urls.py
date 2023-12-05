from django.shortcuts import render

# Create your views here.
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name="pets"

urlpatterns = [
    path("", views.PetListCreateAPIView.as_view(), name="pet_list_create"),
    path("<int:pk>/", views.PetRetrieveUpdateDestroyView.as_view(), name="pet_retrieve_update_destroy")

]

