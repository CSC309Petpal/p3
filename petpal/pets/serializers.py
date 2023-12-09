from rest_framework import serializers
from .models import Pet, Shelter

class PetSerializer(serializers.ModelSerializer):

    shelterName = serializers.SerializerMethodField()
    class Meta:
        model = Pet
        fields = ['id', 'name', 'shelter', 'status', 'breed', 'age', 'size', 'color', 'gender', 'image', 'shelterName']
        read_only_fields = ['shelter']

    def get_shelterName(self, obj):
        return obj.shelter.user.username