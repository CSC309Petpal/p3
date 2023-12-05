from rest_framework import serializers
from .models import Followup, Shelter

class FollowupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followup
        fields = ['id','sender','application','content']
        read_only_fields = ['id','sender','application']

class FollowupListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followup
        fields = ['sender','application','content','created']
        read_only_fields = ['sender','application','content','created']