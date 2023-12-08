from rest_framework import generics
from .models import Followup, Application
from .serializers import FollowupSerializer,FollowupListSerializer
from .permissions import IsShelter, IsOwner,IsApplier,IsRelated
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from notifications.models import create_notification
from django.urls import reverse
from django.urls import reverse_lazy
from applications.models import update_application_updation_time


class FollowupPagination(PageNumberPagination):
    page_size = 10  # Set the number of items per page

# class FollowupCreationView(generics.CreateAPIView):
#     queryset = Followup.objects.all()
#     serializer_class = FollowupSerializer
#     permission_classes = [IsRelated,IsAuthenticated]

#     def get_application(self):
#         application_id = self.kwargs.get('application_id')
        
#         app= get_object_or_404(Application, pk=application_id)
#         if app.shelter.user!=self.request.user and app.seeker.user!=self.request.user:
#             raise PermissionDenied("You do not have permission to create follow-up for this application.")
            
#         return app
    
#     def perform_create(self, serializer):
       
#         app_id = self.kwargs.get('application_id')
#         to_app = get_object_or_404(Application, pk=app_id) 
#         if to_app.shelter.user!=self.request.user and to_app.seeker.user!=self.request.user:
#             raise PermissionDenied("You do not have permission to create follow-up for this application.")
#         obj=serializer.save(sender=self.request.user, application=to_app)

#         followup_url = reverse_lazy('followup:followup_detail', args=[obj.id])
        
#         if self.request.user.user_type==1:
#             create_notification(self.request.user, to_app.shelter.user, followup_url, 'message')
#         if self.request.user.user_type==2:
#             create_notification(self.request.user, to_app.seeker.user, followup_url, 'message')

# class FollowupListView(generics.ListAPIView):
    
#     model = Followup
#     serializer_class = FollowupListSerializer
#     pagination_class = FollowupPagination
#     permission_classes = [IsRelated,IsAuthenticated]
#     def get_queryset(self):
#         app_id = self.kwargs.get('application_id')
#         app= get_object_or_404(Application, pk=app_id)
#         if app.shelter.user!=self.request.user and app.seeker.user!=self.request.user:
#             raise PermissionDenied("You do not have permission to check follow-up for this application.")

#         # Filter comments based on the shelter_id
#         queryset = Followup.objects.filter(application_id=app_id)
#         return queryset


class FollowupCreateListView(generics.ListCreateAPIView):
    queryset = Followup.objects.all()
    pagination_class = FollowupPagination
    permission_classes = [IsRelated,IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return FollowupSerializer
        elif self.request.method == 'GET':
            return FollowupListSerializer

    def get_application(self):
        application_id = self.kwargs.get('application_id')
        app = get_object_or_404(Application, pk=application_id)

        if app.shelter.user != self.request.user and app.seeker.user != self.request.user:
            raise PermissionDenied("You do not have permission to interact with follow-ups for this application.")

        return app

    def perform_create(self, serializer):
        app_id = self.kwargs.get('application_id')
        to_app = get_object_or_404(Application, pk=app_id)

        if to_app.shelter.user != self.request.user and to_app.seeker.user != self.request.user:
            raise PermissionDenied("You do not have permission to create follow-up for this application.")

        obj = serializer.save(sender=self.request.user, application=to_app)
        followup_url = self.request.build_absolute_uri(reverse_lazy('followup:followup_detail', args=[obj.id]))

        if self.request.user.user_type == 1:
            create_notification(self.request.user, to_app.shelter.user, followup_url, 'message',followup_url, application=to_app)
            update_application_updation_time(app_id)
        elif self.request.user.user_type == 2:
            create_notification(self.request.user, to_app.seeker.user, followup_url, 'message',followup_url, application=to_app)
            update_application_updation_time(app_id)

    def get_queryset(self):
        app_id = self.kwargs.get('application_id')
        app = get_object_or_404(Application, pk=app_id)

        if app.shelter.user != self.request.user and app.seeker.user != self.request.user:
            raise PermissionDenied("You do not have permission to check follow-up for this application.")

        queryset = Followup.objects.filter(application_id=app_id)
        return queryset


class FollowupRetrieveView(generics.RetrieveAPIView):
    serializer_class = FollowupListSerializer
    permission_classes = [IsRelated, IsAuthenticated]

    def get_object(self):
        followup_id = self.kwargs.get('followup_id')
        followup = get_object_or_404(Followup, pk=followup_id)
        app=followup.application

        if app.shelter.user != self.request.user and app.seeker.user != self.request.user:
            raise PermissionDenied("You do not have permission to retrieve follow-up for this application.")
        return followup