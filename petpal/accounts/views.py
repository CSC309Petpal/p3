from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, UpdateAPIView,ListAPIView,RetrieveAPIView, DestroyAPIView
from .serializers import CustomUserSerializer, SeekerSerializer, ShelterSerializer,ShelterListSerializer
from .serializers import CustomUserUpdateSerializer, SeekerUpdateSerializer, ShelterUpdateSerializer,CustomUserRegistrationSerializer, SeekerDetailSerializer
from .models import CustomUser, Seeker, Shelter
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from .permissions import IsShelter, IsSeeker, IsShelterOwner, IsSeekerOwner
from .constants import Constants   
from django.shortcuts import get_object_or_404
from applications.models import Application
from rest_framework.exceptions import PermissionDenied
from rest_framework import generics
from rest_framework.permissions import AllowAny


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
        user_serializer = self.get_serializer(self.get_object(), data=user_data, partial=True)
        user_serializer.is_valid(raise_exception=True)
        self.perform_update(user_serializer)

        user = request.user
        if('password' in user_data.keys()):
            user.set_password(user_data['password'])
            user.save()
        profile_data = {**request.data, 'user': user.id}
        if user.user_type == 1:  # Seeker
            profile_serializer = SeekerUpdateSerializer(user.seeker, data=profile_data, partial=True)
        elif user.user_type == 2:  # Shelter
            profile_serializer = ShelterUpdateSerializer(user.shelter, data=profile_data, partial=True)
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
            

class UserDeleteAPIView(DestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return self.request.user
        
class ShelterRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    # For Doc
    queryset = Shelter.objects.all()
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        else:
            permission_classes = [IsShelter, IsShelterOwner]
            return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ShelterListSerializer
        else:
            return CustomUserUpdateSerializer

    def get_object(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return self.request.user
        elif self.request.method == 'GET':
            # For GET request, we assume that the Shelter ID is provided for a shelter detail view.
            return generics.get_object_or_404(Shelter, pk=self.kwargs['pk'])
        
    def update(self, request, *args, **kwargs):
        # check whether the user has the same id as the shelter id
        # if self.request.user.shelter.id != self.kwargs['pk']:
        #     return Response({"error": "You don't have permission to update this shelter"}, status=status.HTTP_400_BAD_REQUEST)
        user_data = request.data
        user_serializer = self.get_serializer(self.get_object(), data=user_data, partial=True)
        user_serializer.is_valid(raise_exception=True)
        self.perform_update(user_serializer)

        user = request.user
        if('password' in user_data.keys()):
            user.set_password(user_data['password'])
            user.save()
        profile_data = {**request.data, 'user': user.id}
        if user.user_type == 1:  # Seeker
            profile_serializer = SeekerUpdateSerializer(user.seeker, data=profile_data, partial=True)
        elif user.user_type == 2:  # Shelter
            profile_serializer = ShelterUpdateSerializer(user.shelter, data=profile_data, partial=True)
        else:
            return Response({"error": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST)

        if profile_serializer.is_valid():
            profile_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_200_OK)

        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SeekerRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]

    # For Doc
    queryset = Seeker.objects.all()

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsSeeker, IsSeekerOwner]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return SeekerDetailSerializer
        if self.request.method == 'PATCH':
            return CustomUserUpdateSerializer
        else:
            return CustomUserUpdateSerializer

    def get_object(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return self.request.user
        elif self.request.method == 'GET':
            # Get the seeker from the URL param
            seeker = get_object_or_404(Seeker, pk=self.kwargs.get('pk'))
            

            # Check if the logged-in user is the seeker whose details are requested
            if self.request.user.user_type == Constants.SEEKER:
                if seeker != self.request.user.seeker:
                    raise PermissionDenied("Access denied.")

            # If it's a shelter user, check if the seeker is associated with any of the shelter's applications
            elif self.request.user.user_type == Constants.SHELTER:
                if not Application.objects.filter(seeker=seeker, shelter=self.request.user.shelter, status=Constants.PENDING).exists():
                    raise PermissionDenied("Access denied.")
            
            return seeker  
        
    def update(self, request, *args, **kwargs):
        user_data = request.data
        user_serializer = self.get_serializer(self.get_object(), data=user_data, partial=True)
        user_serializer.is_valid(raise_exception=True)
        self.perform_update(user_serializer)

        user = request.user
        if('password' in user_data.keys()):
            user.set_password(user_data['password'])
            user.save()
        profile_data = {**request.data, 'user': user.id}
        if user.user_type == 1:  # Seeker
            profile_serializer = SeekerUpdateSerializer(user.seeker, data=profile_data, partial=True)
        elif user.user_type == 2:  # Shelter
            profile_serializer = ShelterUpdateSerializer(user.shelter, data=profile_data, partial=True)
        else:
            return Response({"error": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST)

        if profile_serializer.is_valid():
            profile_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_200_OK)

        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ShelterListCreateAPIView(generics.ListCreateAPIView):

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ShelterListSerializer
        else:
            return CustomUserRegistrationSerializer

    def get_queryset(self):
        if self.request.method == 'GET':
            return Shelter.objects.all()
        else:
            return CustomUser.objects.all()

    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Use the validated password to create the user.
        user = serializer.save(user_type=Constants.SHELTER)
        user.user_type = Constants.SHELTER
        user.set_password(serializer.validated_data['password'])
        user.save()
        
        # Now deal with the profile data for a shelter.
        profile_data = {**request.data, 'user': user.id}
        profile_serializer = ShelterSerializer(data=profile_data)

        if profile_serializer.is_valid():
            profile_serializer.save()
            ## get the shelter id
            shelter_id = profile_serializer.data['id']
            headers = self.get_success_headers(serializer.data)
            return Response({**serializer.data, 'shelter_id': shelter_id}, status=status.HTTP_201_CREATED, headers=headers)
        else:
            # If the profile is not valid, delete the already created user to roll back
            user.delete()
            return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class SeekerCreateAPIView(generics.CreateAPIView):
    def get_serializer_class(self):
        return CustomUserRegistrationSerializer
    
    def get_queryset(self):
        return CustomUser.objects.all()
    
    def create(self, request, *args, **kwargs):
        # The logic here is almost identical to the ShelterListCreateAPIView's create method.
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(user_type=Constants.SEEKER)
        user.set_password(serializer.validated_data['password'])
        user.save()
        profile_data = {**request.data, 'user': user.id}
        profile_serializer = SeekerSerializer(data=profile_data)

        if profile_serializer.is_valid():
            profile_serializer.save()
            seeker_id = profile_serializer.data['id']
            headers = self.get_success_headers(serializer.data)
            # Match the response format to ShelterListCreateAPIView's create method.
            return Response({**serializer.data, 'seeker_id': seeker_id}, status=status.HTTP_201_CREATED, headers=headers)
        else:
            user.delete()  # Rollback the user creation if the seeker profile is not valid.
            return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ProfileRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
