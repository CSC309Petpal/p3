from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name="notifications"

urlpatterns = [
    path("creation/", views.NotificationCreateAPIView.as_view(), name="creation"),
    path("list/", views.NotificationListAPIView.as_view(), name="list"),
    path("deletion/<int:pk>/", views.NotificationDeleteAPIView.as_view(), name="deletion"),
    path("retrieve/<int:pk>/", views.NotificationRetreiveAPIView.as_view(), name="retrieve"),
]