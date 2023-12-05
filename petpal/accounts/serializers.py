from rest_framework.serializers import ModelSerializer,CharField,EmailField,IntegerField
from .models import Seeker, Shelter, CustomUser
from rest_framework import serializers





class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        # Define the model for the serializer
        model = CustomUser

        # Specify the fields to include in the serialized data
        fields = ['id','username', 'user_type','password','location']

        # Extra kwargs for fields (in this case, making 'password' write-only)
        extra_kwargs = {'password': {'write_only': True}, 'id':{'read_only':True}}

    def validate_username(self, value):
            # Check if a user with this username already exists
            existing_user = CustomUser.objects.filter(username=value).first()
            if existing_user:
                # If a user exists, include their ID in the error message
                raise serializers.ValidationError(f"This username already exists. ID: {existing_user.id}")
            return value
    
class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'user_type', 'location']

    
class SeekerSerializer(ModelSerializer):
    class Meta:
        model = Seeker
        fields = ['user', 'phone_number', 'birthday', 'preference']
    
    
class ShelterSerializer(ModelSerializer):
    class Meta:
        model = Shelter
        fields = ['user', 'list_of_pets']




class CustomUserUpdateSerializer(ModelSerializer): 
    class Meta:
        model = CustomUser
        fields = ['username', 'location']
        extra_kwargs = {
            'username': {'required': False}
        }

    

class SeekerUpdateSerializer(ModelSerializer):
    class Meta:
        model = Seeker
        fields = ['user', 'phone_number', 'birthday', 'preference']
      
    
    
class ShelterUpdateSerializer(ModelSerializer):
    class Meta:
        model = Shelter
        fields = ['user', 'list_of_pets']



class ShelterListSerializer(ModelSerializer):
    username = CharField(source='user.username')
    email = EmailField(source='user.email')
    # user_type = IntegerField(source='user.user_type')
    location = CharField(source='user.location')

    class Meta:
        model = Shelter
        fields = ( 'username', 'email', 'location', 'list_of_pets')