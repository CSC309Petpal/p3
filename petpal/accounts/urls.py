from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name="accounts"

urlpatterns = [
    path("creation/", views.UserCreateAPIView.as_view(), name="creation"),
    path("update/", views.UserUpdateAPIView.as_view(), name="update"),
    path('shelters/list/', views.ShelterListView.as_view(), name='shelter-list'),
    path('shelters/detail/<int:pk>', views.ShelterDetailView.as_view(), name='shelter-list'),
    path('seeker/detail/<int:seeker_id>', views.SeekerDetailProfileView.as_view(), name='seeker-detail')
]