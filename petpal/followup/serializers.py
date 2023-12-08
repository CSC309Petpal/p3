from rest_framework import serializers
from .models import Followup, Shelter

class FollowupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followup
        fields = ['id','sender','application','content']
        read_only_fields = ['id','sender','application']

class FollowupListSerializer(serializers.ModelSerializer):
    senderusername = serializers.SerializerMethodField()
    class Meta:
        model = Followup
        fields = ['sender','application','content','created','senderusername']
        read_only_fields = ['sender','application','content','created','senderusername']
    def get_senderusername(self, obj):
        
        return obj.sender.username
