from rest_framework import serializers
from .models import Blog, Shelter

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['shelter','content']
        read_only_fields = ['shelter']

class BlogListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['shelter','content','created','likes']
        read_only_fields = ['shelter','content','created','likes']

