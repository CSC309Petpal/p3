from .permissions import IsSuperUser
from .models import Notification
from rest_framework import viewsets
from .serializers import NotificationSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema


class NotificationPagination(PageNumberPagination):
    page_size = 5  # Set the number of items per page

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [OrderingFilter, DjangoFilterBackend]
    ordering_fields = ['creation_time']
    filterset_fields = ['read']
    pagination_class = NotificationPagination

    def perform_create(self, serializer):
        if not self.request.user.is_superuser:
            raise PermissionDenied("Only superusers can create notifications.")
        serializer.save()
    
    def get_queryset(self):
        if self.request.user.is_authenticated:
            user = self.request.user
            return Notification.objects.filter(receiver=user)
        else:
            return Notification.objects.none()
        
    def update(self, request, *args, **kwargs):
        raise PermissionDenied("Notification can't be updated")

    def perform_destroy(self, instance):
        if instance.receiver != self.request.user:
            raise PermissionDenied("You do not have permission to delete this notification.")
        super().perform_destroy(instance)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.receiver != request.user:
            raise PermissionDenied("You do not have permission to view this notification.")
        instance.read = True
        instance.save()
        return super().retrieve(request, *args, **kwargs)