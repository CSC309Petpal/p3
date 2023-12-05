# serializers.py

from rest_framework import serializers
from .models import Application

class ApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'details']  # status is not included as it defaults to 'pending'

class ApplicationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id','status']

class ApplicationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
