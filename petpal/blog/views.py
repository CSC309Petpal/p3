from rest_framework import generics
from .models import Blog,Shelter
from .serializers import BlogSerializer,BlogListSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from notifications.models import create_notification
from django.urls import reverse_lazy

class BlogPagination(PageNumberPagination):
    page_size = 10  # Set the number of items per page

class BlogCreationView(generics.CreateAPIView):

    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
       
        shelter_id = self.kwargs.get('shelter_id')
        shelter = get_object_or_404(Shelter, pk=shelter_id) 
        content = serializer.validated_data['content']
      
        obj=serializer.save(content=content, shelter=shelter,likes=0)
        # followup_url = reverse_lazy('comments:comment_detail', args=[obj.id])
        # create_notification(self.request.user, to_shelter.user, followup_url, 'New Review')
        

class BlogListView(generics.ListAPIView):
    
    model = Blog
    serializer_class = BlogListSerializer
    pagination_class = BlogPagination
    def get_queryset(self):

        shelter_id = self.kwargs.get('shelter_id')
        # Filter Blog based on the shelter_id
        queryset = Blog.objects.filter(shelter_id=shelter_id)
        return queryset

class BlogRetrieveView(generics.RetrieveAPIView):
    serializer_class = BlogListSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        blog_id = self.kwargs.get('blog_id')
        blog = get_object_or_404(Blog, pk=blog_id)
        
        return blog
