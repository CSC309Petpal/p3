from rest_framework import serializers
from .models import Pet, Shelter

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ['id', 'name', 'shelter', 'status', 'breed', 'age', 'size', 'color', 'gender', 'image']
        read_only_fields = ['shelter']