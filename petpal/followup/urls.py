from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name="followup"

urlpatterns = [
    path("creation/<int:application_id>/", views.FollowupCreationView.as_view(), name="followup_creation"),
    path("list/<int:application_id>/", views.FollowupListView.as_view(), name="followup_list"),
    path("detail/<int:followup_id>/",views.FollowupRetrieveView.as_view(),name="followup_detail")
]