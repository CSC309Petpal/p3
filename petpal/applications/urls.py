from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name="applications"

urlpatterns = [
    # path("creation/<int:pet_id>/", views.ApplicationCreationView.as_view(), name="creation"),
    path("to-pet/<int:pet_id>/", views.ApplicationCreationView.as_view(), name="creation"),
    # path("list/", views.ApplicationListView.as_view(), name="list"),
    # path('detail/<int:application_id>/', views.ApplicationDetailView.as_view(), name='application-detail'),
    # path("update/<int:pk>/", views.ApplicationUpdateView.as_view(), name="application-update"),
    path("<int:pk>/", views.ApplicationUpdateView.as_view(), name="application-get-update"),
    path("", views.ApplicationListView.as_view(), name="list"),
]