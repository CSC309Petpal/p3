from django.shortcuts import render

# Create your views here.
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name="pets"

urlpatterns = [
    path("creation/", views.PetCreationView.as_view(), name="pet_creation"),
    path("list/", views.PetListView.as_view(), name="pet_list"),
    path("update/<int:pk>/", views.PetUpdateView.as_view(), name="pet_update"),
    path("search/", views.PetSearchView.as_view(), name="pet_search"),
    path("delete/<int:pk>/", views.PetDeleteView.as_view(), name="pet_delete"),
    path("detail/<int:pk>/", views.PetDetailView.as_view(), name="pet_detail"),

]

