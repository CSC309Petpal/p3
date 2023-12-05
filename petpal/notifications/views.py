from .permissions import IsSuperUser
from .models import Notification
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, RetrieveAPIView
from .serializers import NotificationSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from django_filters.rest_framework import DjangoFilterBackend

class NotificationCreateAPIView(CreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsSuperUser]

class NotificationPagination(PageNumberPagination):
    page_size = 10  # Set the number of items per page

class NotificationListAPIView(ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [OrderingFilter, DjangoFilterBackend]
    ordering_fields = ['creation_time']
    filterset_fields = ['read']
    pagination_class = NotificationPagination

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(receiver=user)
    
class NotificationDeleteAPIView(DestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        notification = self.get_object()
        if notification.receiver != request.user:
            raise PermissionDenied("You do not have permission to delete this notification.")
        return super().delete(request, *args, **kwargs)
    
class NotificationRetreiveAPIView(RetrieveAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        notification = self.get_object()
        if notification.receiver != request.user:
            raise PermissionDenied("You do not have permission to delete this notification.")
        notification.read = True
        notification.save()
        return super().retrieve(request, *args, **kwargs)