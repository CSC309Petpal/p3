from rest_framework import serializers
from .models import Comments, Shelter

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['sender','shelter','content','created','username','rating']
        read_only_fields = ['sender','shelter','created','username']

class CommentsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['sender','shelter','content','created','username','rating']
        read_only_fields = ['sender','shelter','content','created','username','rating']

