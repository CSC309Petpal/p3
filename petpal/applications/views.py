from rest_framework import generics
from .models import Application
from accounts.models import Seeker
from pets.models import Pet
from .serializers import ApplicationCreateSerializer,ApplicationUpdateSerializer, ApplicationListSerializer, ApplicationSerializer
from .permissions import IsShelter, IsSeeker, SeekerHaveApplication, ShelterHaveApplication, IsSeekerOrShelterToUpdateApplication
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from .constants import ApplicationConstants
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from notifications.models import create_notification


class ApplicationCreationView(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationCreateSerializer
    permission_classes = [IsSeeker]

    def perform_create(self, serializer):
        # Assuming the user who create application is a seeker
        pet_id = self.kwargs.get('pet_id')
        
        # Retrieve the corresponding Pet object
        try:
            pet = Pet.objects.get(pk=pet_id)
        except Pet.DoesNotExist:
            # Handle the case where the Pet does not exist
            raise PermissionDenied({'pet_id': 'A pet with this ID does not exist.'})
        shelter = pet.shelter
        if pet.status != 'available':
            raise PermissionDenied({'pet_status': 'Can only create applications for a pet listing that is "available".'})
        obj = serializer.save(seeker=self.request.user.seeker, pet=pet, shelter= shelter)
        app_url = self.request.build_absolute_uri(reverse_lazy('applications:application-get-update', args=[obj.id]))
        create_notification(self.request.user, obj.shelter.user, "New Application Created", 'message', app_url, application=obj)
            


class ApplicationUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationUpdateSerializer
    permission_classes = [IsSeekerOrShelterToUpdateApplication]
    
    def perform_update(self, serializer):
        application = self.get_object()

        user = self.request.user
        current_status = application.status
        new_status = serializer.validated_data.get('status', None)

        # Shelter logic
        if user.user_type == ApplicationConstants.SHELTER:
            if current_status == ApplicationConstants.PENDING and new_status in [ApplicationConstants.ACCEPTED, ApplicationConstants.DENIED]:
                obj=serializer.save()
            else:
                raise PermissionDenied('You can only update status from pending to accepted or denied.')

        # Pet Seeker logic
        elif user.user_type == ApplicationConstants.SEEKER:
            if current_status in [ApplicationConstants.PENDING, ApplicationConstants.ACCEPTED] and new_status == ApplicationConstants.WITHDRAWN:
               obj= serializer.save()
            else:
                raise PermissionDenied('You can only update status from pending or accepted to withdrawn.')

        else:
            raise PermissionDenied('You do not have permission to update this application.')
        app_url = self.request.build_absolute_uri(reverse_lazy('applications:application-get-update', args=[obj.id]))
        
        
        if self.request.user.user_type == 1:
            create_notification(self.request.user, obj.shelter.user, "app state change", 'message',app_url, application=application)
        elif self.request.user.user_type == 2:
            create_notification(self.request.user, obj.seeker.user, "app state change", 'message',app_url, application=application)
        

        

class ApplicationPagination(PageNumberPagination):
    page_size = 10  # Set the number of items per page

    
class ApplicationListView(generics.ListAPIView):
    queryset = Application.objects.all().order_by('id')
    serializer_class = ApplicationListSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filterset_fields = ['status']
    ordering_fields = ['creation_time', 'updation_time']
    permission_classes = [IsSeekerOrShelterToUpdateApplication]
    pagination_class = ApplicationPagination

    def get_queryset(self):
        user = self.request.user
        # Customize the queryset based on the user
        if user.is_authenticated and user.user_type == ApplicationConstants.SHELTER:
            
            shelter = user.shelter
            if shelter != None:
              
              return Application.objects.filter(shelter = shelter)
            else:
                return Application.objects.none()
        else:
            # Handle unauthenticated users, e.g., return an empty queryset
            return  Application.objects.none()


class ApplicationDetailView(generics.RetrieveAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsSeekerOrShelterToUpdateApplication]
    lookup_field = 'pk'
    lookup_url_kwarg = 'application_id'



class ApplicationRetrieveUpdateView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsSeekerOrShelterToUpdateApplication]

    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ApplicationSerializer
        else:
            return ApplicationUpdateSerializer

    def get_object(self):
        
            application = get_object_or_404(Application, pk=self.kwargs.get('pk'))
                        
            return application

    def perform_update(self, serializer):
        application = self.get_object()

        user = self.request.user
        current_status = application.status
        new_status = serializer.validated_data.get('status', None)

        # Shelter logic
        if user.user_type == ApplicationConstants.SHELTER:
            if current_status == ApplicationConstants.PENDING and new_status in [ApplicationConstants.ACCEPTED, ApplicationConstants.DENIED]:
                serializer.save()
            else:
                raise PermissionDenied('You can only update status from pending to accepted or denied.')

        # Pet Seeker logic
        elif user.user_type == ApplicationConstants.SEEKER:
            if current_status in [ApplicationConstants.PENDING, ApplicationConstants.ACCEPTED] and new_status == ApplicationConstants.WITHDRAWN:
                serializer.save()
            else:
                raise PermissionDenied('You can only update status from pending or accepted to withdrawn.')

        else:
            raise PermissionDenied('You do not have permission to update this application.')
            
    
    