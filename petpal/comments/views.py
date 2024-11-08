from rest_framework import generics
from .models import Comments,Shelter
from .serializers import CommentsSerializer,CommentsListSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from notifications.models import create_notification
from django.urls import reverse_lazy

class CommentsPagination(PageNumberPagination):
    page_size = 6   # Set the number of items per page

class CommentsCreationView(generics.CreateAPIView):

    serializer_class = CommentsSerializer
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
       
        shelter_id = self.kwargs.get('shelter_id')
        to_shelter = get_object_or_404(Shelter, pk=shelter_id) 
        content = serializer.validated_data['content']
      
        obj=serializer.save(sender=self.request.user, shelter=to_shelter,username=self.request.user.username)
        followup_url = self.request.build_absolute_uri(reverse_lazy('comments:comment_detail', args=[obj.id]))
        create_notification(self.request.user, to_shelter.user, "New review on your shelter", 'new_review')
        

class CommentsListView(generics.ListAPIView):
    
    model = Comments
    serializer_class = CommentsListSerializer
    pagination_class = CommentsPagination
    def get_queryset(self):

        shelter_id = self.kwargs.get('shelter_id')
        # Filter comments based on the shelter_id
        queryset = Comments.objects.filter(shelter_id=shelter_id)
        return queryset

class CommentsRetrieveView(generics.RetrieveAPIView):
    serializer_class = CommentsListSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        comment_id = self.kwargs.get('comment_id')
        comment = get_object_or_404(Comments, pk=comment_id)
        
        return comment
    
class CommentsListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentsSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CommentsPagination

    def get_queryset(self):
        shelter_id = self.kwargs.get('shelter_id')
        # Filter comments based on the shelter_id
        return Comments.objects.filter(shelter_id=shelter_id)

    def perform_create(self, serializer):
        shelter_id = self.kwargs.get('shelter_id')
        to_shelter = get_object_or_404(Shelter, pk=shelter_id)
        content = serializer.validated_data['content']
      
        obj = serializer.save(sender=self.request.user, shelter=to_shelter,username=self.request.user.username)
        followup_url = self.request.build_absolute_uri(reverse_lazy('comments:comment_detail', args=[obj.id]))
        create_notification(self.request.user, to_shelter.user, "New review on your shelter", 'new_review')

    def post(self, request, *args, **kwargs):
        # Use the create method for POST requests
        return self.create(request, *args, **kwargs)
