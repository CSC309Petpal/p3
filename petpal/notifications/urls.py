from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NotificationViewSet

app_name="notifications"

# urlpatterns = [
#     # path("creation/", views.NotificationCreateAPIView.as_view(), name="creation"),
#     # path("list/", views.NotificationListAPIView.as_view(), name="list"),
#     # path("deletion/<int:pk>/", views.NotificationDeleteAPIView.as_view(), name="deletion"),
#     # path("retrieval/<int:pk>/", views.NotificationRetreiveAPIView.as_view(), name="retrieve"),
#     path("<int:pk>/", views.NotificationViewSet.as_view(), name="viewset"),
# ]

router = DefaultRouter()
router.register(r'', NotificationViewSet, basename='notification')

urlpatterns = [
    path('', include(router.urls)),
]
