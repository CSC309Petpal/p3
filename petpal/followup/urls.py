from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name="followup"

urlpatterns = [
    path("to-app/<int:application_id>/", views.FollowupCreateListView.as_view(), name="followup_to_app"),
    # path("list/<int:application_id>/", views.FollowupListView.as_view(), name="followup_list"),
    path("<int:followup_id>/",views.FollowupRetrieveView.as_view(),name="followup_detail")
]