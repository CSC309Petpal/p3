# serializers.py

from rest_framework import serializers
from .models import Application

class ApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'details']  # status is not included as it defaults to 'pending'

class ApplicationUpdateSerializer(serializers.ModelSerializer):
    seekername = serializers.SerializerMethodField()
    petname = serializers.SerializerMethodField()
    class Meta:
        model = Application
        fields = ['id','status', 'details', 'seekername', 'pet', 'petname', 'seeker', 'shelter']
    def get_seekername(self,obj):
            return obj.seeker.user.username
    def get_petname(self,obj):
            return obj.pet.name

class ApplicationListSerializer(serializers.ModelSerializer):
    petname = serializers.SerializerMethodField()
    sheltername = serializers.SerializerMethodField()
    seekername = serializers.SerializerMethodField()
    detail = serializers.SerializerMethodField()
    class Meta:
        model = Application
        fields = '__all__'
    def get_petname(self, obj):
        
        return obj.pet.name
    def get_sheltername(self,obj):
            return obj.shelter.user.username
    def get_seekername(self,obj):
            return obj.seeker.user.username
    def get_detail(self,obj):
            return obj.details
    
class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'


