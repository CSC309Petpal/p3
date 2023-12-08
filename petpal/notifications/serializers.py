from rest_framework import serializers
from .models import Notification
from .permissions import IsSuperUser

class NotificationSerializer(serializers.ModelSerializer):
    sender_avatar = serializers.SerializerMethodField()
    application_image = serializers.SerializerMethodField()
    pet_image = serializers.SerializerMethodField()
    class Meta:
        model = Notification
        fields = "__all__"
        permission_classes = [IsSuperUser]

    def get_sender_avatar(self, obj):
        if obj.type in ['new_review']:
            if obj.sender.avatar and obj.sender.avatar.name:
                request = self.context.get('request')
                avatar_url = obj.sender.avatar.url
                return request.build_absolute_uri(avatar_url)
            else:
                print("sender image not found")
                return None
        else:
            return None


    def get_application_image(self, obj):
        if obj.type in ['message','status_update','new_application']:
            if obj.application.pet.image:
                request = self.context.get('request')
                avatar_url = obj.application.pet.image.url
                print(request.build_absolute_uri(avatar_url))
                return request.build_absolute_uri(avatar_url)
            else:
                print('Application image not found')
                return None
        else:
            return None

    def get_pet_image(self, obj):
        if obj.type in ['new_pet_listings']:
            if obj.pet.image and obj.pet.image.name:
                request = self.context.get('request')
                avatar_url = obj.pet.image.url
                return request.build_absolute_uri(avatar_url)
            else:
                print("pet image not found")
                return None
        else:
            return None