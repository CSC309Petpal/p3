from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, UpdateAPIView,ListAPIView,RetrieveAPIView
from .serializers import CustomUserSerializer, SeekerSerializer, ShelterSerializer,ShelterListSerializer
from .serializers import CustomUserUpdateSerializer, SeekerUpdateSerializer, ShelterUpdateSerializer,CustomUserRegistrationSerializer
from .models import CustomUser, Seeker, Shelter
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from .permissions import IsShelter, IsSeeker
from .constants import Constants   
from django.shortcuts import get_object_or_404
from applications.models import Application
from rest_framework.exceptions import PermissionDenied

# Create your views here.
class UserCreateAPIView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        user_data = request.data
        user_serializer = self.get_serializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)

        # Check whether the user type is valid before creation of user to maintain database integrity
        user = user_data['user_type']
        if user not in [Constants.SEEKER, Constants.SHELTER]:
            return Response({"error": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST)
        
        self.perform_create(user_serializer)

        user = CustomUser.objects.get(username=user_data['username'])
        user.set_password(user_data['password'])
        user.save()
        profile_data = {**request.data, 'user': user.id}

        if user.user_type == 1:  # Seeker
            profile_serializer = SeekerSerializer(data=profile_data)
        elif user.user_type == 2:  # Shelter
            profile_serializer = ShelterSerializer(data=profile_data)
        else:
            return Response({"error": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST)

        if profile_serializer.is_valid():
            profile_serializer.save()
            headers = self.get_success_headers(user_serializer.data)
            return Response(user_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserUpdateAPIView(UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user_data = request.data
        user_serializer = self.get_serializer(self.get_object(), data=user_data)
        user_serializer.is_valid(raise_exception=True)
        self.perform_update(user_serializer)

        user = request.user
        if('password' in user_data.keys()):
            user.set_password(user_data['password'])
            user.save()
        profile_data = {**request.data, 'user': user.id}
        if user.user_type == 1:  # Seeker
            profile_serializer = SeekerUpdateSerializer(user.seeker, data=profile_data)
        elif user.user_type == 2:  # Shelter
            profile_serializer = ShelterUpdateSerializer(user.shelter, data=profile_data)
        else:
            return Response({"error": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST)

        if profile_serializer.is_valid():
            profile_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_200_OK)

        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ShelterListView(ListAPIView):
    permission_classes = [IsAuthenticated]

    queryset = Shelter.objects.all()
    serializer_class = ShelterListSerializer

class ShelterDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    queryset = Shelter.objects.all()
    serializer_class = ShelterListSerializer

class SeekerDetailProfileView(RetrieveAPIView):
    queryset = Seeker.objects.all()
    serializer_class = SeekerSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'
    lookup_url_kwarg = 'seeker_id'
    def get_object(self):
        seeker_id = self.kwargs.get('seeker_id')
        seeker = get_object_or_404(Seeker, pk=seeker_id)

        user_type = self.request.user.user_type
        if user_type == Constants.SEEKER:
            seeker_logined = self.request.user.seeker
            if seeker == seeker_logined:
                return seeker
            else:
                raise PermissionDenied("You can't view another Seeker's Profile")


        else:

            shelter = self.request.user.shelter
            if shelter is None:
                raise PermissionDenied("Current User doesn't have a Shelter")

            all_active_applications = Application.objects.filter(shelter = shelter, status = Constants.PENDING)
            seeker_set = {application.seeker for application in all_active_applications}
            if seeker in seeker_set:
                return seeker
            else:
                raise PermissionDenied("You don't have permission to view this seeker's profile")

        
        