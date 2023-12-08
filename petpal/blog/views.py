from rest_framework import generics
from .models import Blog
from .serializers import BlogSerializer
from .permissions import IsShelter, IsOwner
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from django.http import Http404

class BlogPagination(PageNumberPagination):
    page_size = 4  # Set the number of items per page

    
class BlogListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = BlogSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    ordering_fields = ['created']
    pagination_class = BlogPagination
    queryset = Blog.objects.all()

    
    def get_queryset(self):
        # Retrieve the shelter ID from the URL
        shelter_id = self.kwargs.get('shelter_id')
        if shelter_id is not None:
            # Filter the queryset by the shelter ID
            return Blog.objects.filter(shelter__id=shelter_id)
        
        # If shelter_id is not in the URL, you can decide how to handle this.
        # For example, raise a 404 error or return an empty queryset.
        raise Http404("No shelter ID in URL.")

    def perform_create(self, serializer):
        # Assuming the profile of the user is linked to the shelter
        user = self.request.user

        if not hasattr(user, 'shelter'):
            raise Http404("User does not have a linked shelter.")
        serializer.save(shelter=self.request.user.shelter)
    

class BlogRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
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
