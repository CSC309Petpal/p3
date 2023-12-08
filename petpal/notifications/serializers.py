from rest_framework import serializers
from .models import Notification
from .permissions import IsSuperUser

class NotificationSerializer(serializers.ModelSerializer):
    sender_avatar = serializers.SerializerMethodField()
    class Meta:
        model = Notification
        fields = "__all__"
        permission_classes = [IsSuperUser]

    def get_sender_avatar(self, obj):
        request = self.context.get('request')
        avatar = obj.sender_avatar()

        if(avatar and avatar.name):
            return request.build_absolute_uri(avatar.url)
        else:
            return None