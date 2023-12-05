from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name="comments"

urlpatterns = [
    path("creation/<int:shelter_id>/", views.CommentsCreationView.as_view(), name="creation"),
    path("list/<int:shelter_id>/", views.CommentsListView.as_view(), name="list"),
    path("detail/<int:comment_id>/",views.CommentsRetrieveView.as_view(),name="comment_detail")
    
]