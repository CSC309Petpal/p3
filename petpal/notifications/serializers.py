from rest_framework import serializers
from .models import Notification
from .permissions import IsSuperUser

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"
        permission_classes = [IsSuperUser]