from rest_framework import serializers
from .models import Blog, Shelter

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['shelter','content','created', 'title', 'image', 'id']
        read_only_fields = ['shelter']


