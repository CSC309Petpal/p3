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
    petname = serializers.SerializerMethodField()
    sheltername = serializers.SerializerMethodField()
    seekername = serializers.SerializerMethodField()
    class Meta:
        model = Application
        fields = '__all__'
    def get_petname(self, obj):
        
        return obj.pet.name
    def get_sheltername(self,obj):
            return obj.shelter.user.username
    def get_seekername(self,obj):
            return obj.seeker.user.username
    
class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'


