from rest_framework import serializers
from .models import Comments, Shelter

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['sender','shelter','content','created']
        read_only_fields = ['sender','shelter','created']

class CommentsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['sender','shelter','content','created']
        read_only_fields = ['sender','shelter','content','created']

