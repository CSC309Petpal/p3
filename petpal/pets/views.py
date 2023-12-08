from rest_framework import generics
from .models import Pet
from .serializers import PetSerializer
from .permissions import IsShelter, IsOwner
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from django.http import Http404

class PetPagination(PageNumberPagination):
    page_size = 6  # Set the number of items per page

    
class PetListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = PetSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filterset_fields = ['shelter', 'status', 'breed', 'age', 'size', 'color', 'gender']
    ordering_fields = ['name', 'age', 'size']
    pagination_class = PetPagination

    def get_queryset(self):
        # Implement any custom filtering logic here
        queryset = Pet.objects.all()
        if 'status' not in self.request.query_params:
            queryset = queryset.filter(status='available')
        return queryset
    
    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsShelter]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        # Assuming the profile of the user is linked to the shelter
        user = self.request.user

        if not hasattr(user, 'shelter'):
            raise Http404("User does not have a linked shelter.")
        serializer.save(shelter=self.request.user.shelter)
    

class PetRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    lookup_field = 'pk'
    lookup_url_kwarg = 'pk'

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.request.method == 'GET':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsShelter, IsOwner]
        return [permission() for permission in permission_classes]
