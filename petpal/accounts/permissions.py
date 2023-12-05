from rest_framework import permissions
from .constants import Constants
class IsShelter(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated
        is_authenticated = request.user and request.user.is_authenticated
        # Check if the user_type of the user is 'shelter'
        if not is_authenticated:
            return False
        
        is_shelter_user = request.user.user_type == Constants.SHELTER
        
        # The permission check should return True only if both conditions are True
        return is_authenticated and is_shelter_user
   

class IsSeeker(permissions.BasePermission):
    
    def has_permission(self, request, view):
        # Check if the user is authenticated
        is_authenticated = request.user and request.user.is_authenticated
        if not is_authenticated:
            return False
        
        # Check if the user_type of the user is 'seeker'
        is_seeker_user = request.user.user_type == ApplicationConstants.SEEKER
        
        # The permission check should return True only if both conditions are True
        return is_authenticated and is_seeker_user