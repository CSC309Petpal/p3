from rest_framework.serializers import ModelSerializer,CharField,EmailField,IntegerField
from .models import Seeker, Shelter, CustomUser
from rest_framework import serializers
from pets.serializers import PetSerializer
from django.contrib.auth.password_validation import validate_password
from blog.serializers import BlogSerializer




class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        # Define the model for the serializer
        model = CustomUser

        # Specify the fields to include in the serialized data
        fields = ['id','username', 'user_type','password','location','email', 'password_confirm']

        # Extra kwargs for fields (in this case, making 'password' write-only)
        extra_kwargs = {'password': {'write_only': True}, 'id':{'read_only':True}, 'password_confirm': {'write_only': True}, 'user_type':{'read_only':True}}

    # def validate_username(self, value):
    #         # Check if a user with this username already exists
    #         existing_user = CustomUser.objects.filter(username=value).first()
    #         if existing_user:
    #             # If a user exists, include their ID in the error message
    #             raise serializers.ValidationError(f"This username already exists. ID: {existing_user.id}")
    #         return value

    def validate_username(self, value):
    # Check if the username has changed if it's an update and if it's unique.
        if self.instance and self.instance.username != value:
            if CustomUser.objects.filter(username=value).exists():
                raise serializers.ValidationError("This username is already in use.")
        elif not self.instance and CustomUser.objects.filter(username=value).exists():
            # Check for creation
            raise serializers.ValidationError("This username is already in use.")
        return value
    
    def validate(self, data):
        password = data.get('password')
        password_confirm = data.get('password_confirm')

        if data.get('password') != data.get('password_confirm'):
            raise serializers.ValidationError({'password_confirm': ["The two password fields didn't match."]})
        # Use Django's built-in validator to validate the password
        validate_password(data['password'])

        # Remove the password_confirm field as it's no longer needed after validation
        data.pop('password_confirm', None)

        return data
    
class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'user_type', 'location', 'email', 'avatar']

    
class SeekerSerializer(ModelSerializer):
    class Meta:
        model = Seeker
        fields = ['user', 'phone_number', 'birthday', 'preference', 'id', 'checking']
    
    
class ShelterSerializer(ModelSerializer):
    class Meta:
        model = Shelter
        fields = ['user', 'id']




class CustomUserUpdateSerializer(ModelSerializer): 
    class Meta:
        model = CustomUser
        fields = ['username', 'location', 'email', 'avatar']
        extra_kwargs = {
            'username': {'required': False}
        }

    

class SeekerUpdateSerializer(ModelSerializer):
    class Meta:
        model = Seeker
        fields = ['user', 'checking']

class SeekerDetailSerializer(ModelSerializer):
    username = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()

    class Meta:
        model = Seeker
        fields = ['username', 'email', 'avatar', 'preference', 'id', 'location', 'user', 'checking']

    def get_username(self, obj):
        return obj.user.username

    def get_email(self, obj):
        return obj.user.email

    def get_avatar(self, obj):
        # Assuming 'avatar' is a field in your User model
        # Adjust the attribute access as per your User model's definition
        return obj.user.avatar.url if obj.user.avatar else None
    
    def get_location(self, obj):
        return obj.user.location
      
    
    
class ShelterUpdateSerializer(ModelSerializer):
    class Meta:
        model = Shelter
        fields = ['user']



class ShelterListSerializer(ModelSerializer):
    username = CharField(source='user.username')
    email = EmailField(source='user.email')
    # user_type = IntegerField(source='user.user_type')
    location = CharField(source='user.location')
    pets = PetSerializer(many=True, read_only=True)
    avatar = serializers.ImageField(source='user.avatar')
    blogs = BlogSerializer(many=True, read_only=True)
    class Meta:
        model = Shelter
        fields = ( 'username', 'email', 'location', 'pets', 'avatar', 'id', 'blogs')

