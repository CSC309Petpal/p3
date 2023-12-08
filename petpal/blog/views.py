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
    page_size = 6  # Set the number of items per page

    
class BlogListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = BlogSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    ordering_fields = ['created']
    pagination_class = BlogPagination

    
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
