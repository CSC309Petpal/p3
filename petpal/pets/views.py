from rest_framework import generics
from .models import Pet
from .serializers import PetSerializer
from .permissions import IsShelter, IsOwner
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny

class PetCreationView(generics.ListCreateAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [IsShelter]

    def perform_create(self, serializer):
        # Assuming the profile of the user is linked to the shelter

        serializer.save(shelter=self.request.user.shelter)


class PetListView(generics.ListAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

class PetUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [IsShelter, IsOwner]

    def perform_update(self, serializer):
        # Assuming the profile of the user is linked to the shelter
        serializer.save(shelter=self.request.user.shelter)

class PetPagination(PageNumberPagination):
    page_size = 10  # Set the number of items per page

    
class PetSearchView(generics.ListAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filterset_fields = ['shelter', 'status', 'breed', 'age', 'size', 'color', 'gender']
    ordering_fields = ['name', 'age']
    pagination_class = PetPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        # Set default status filter if not provided
        if 'status' not in self.request.query_params:
            queryset = queryset.filter(status='available')
        return queryset
    

class PetDeleteView(generics.DestroyAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [IsShelter, IsOwner]


class PetDetailView(generics.RetrieveAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [AllowAny]
    lookup_field = 'pk'
    lookup_url_kwarg = 'pk'

