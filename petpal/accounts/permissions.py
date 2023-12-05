from rest_framework import permissions
from .constants import Constants
from django.core.exceptions import ValidationError
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
        is_seeker_user = request.user.user_type == Constants.SEEKER
        
        # The permission check should return True only if both conditions are True
        return is_authenticated and is_seeker_user
    

class IsShelterOwner(permissions.BasePermission):
    message = 'You do not have permission to access this shelter.'

    def has_permission(self, request, view):
        # This assumes that the pk is part of the view's kwargs, which is the case if you're using
        # Django's URL dispatcher with `path('shelter/<int:pk>', ...)`.
        # Also assumes that `shelter` is a model related to the `User` model accessible as `request.user.shelter`.
        try:
            shelter_id = view.kwargs.get('pk')  # Get the shelter ID from the URL.
            if shelter_id is None:
                # If there's no `pk` in the kwargs, then we can't check permissions, so we deny access.
                return False
            return request.user.is_authenticated and request.user.shelter.id == shelter_id
        except AttributeError:
            # If `request.user` or `request.user.shelter` doesn't have an `id` attribute,
            # it means the user is either not authenticated or not associated with a shelter.
            return False
        except ValidationError:
            # If the pk in the URL is not an integer or other validation error occurs.
            return False

    def has_object_permission(self, request, view, obj):
        # Object-level permission checks are only called if `has_permission` granted access.
        # Here, `obj` would be a shelter instance obtained in the view's `get_object` method.
        return obj == request.user.shelter


class IsSeekerOwner(permissions.BasePermission):
    message = 'You do not have permission to access this seeker.'

    def has_permission(self, request, view):
        # This assumes that the pk is part of the view's kwargs, which is the case if you're using
        # Django's URL dispatcher with `path('shelter/<int:pk>', ...)`.
        # Also assumes that `shelter` is a model related to the `User` model accessible as `request.user.shelter`.
        try:
            seeker_id = view.kwargs.get('pk')  # Get the shelter ID from the URL.
            if seeker_id is None:
                # If there's no `pk` in the kwargs, then we can't check permissions, so we deny access.
                return False
            return request.user.is_authenticated and request.user.seeker.id == seeker_id
        except AttributeError:
            # If `request.user` or `request.user.shelter` doesn't have an `id` attribute,
            # it means the user is either not authenticated or not associated with a shelter.
            return False
        except ValidationError:
            # If the pk in the URL is not an integer or other validation error occurs.
            return False

    def has_object_permission(self, request, view, obj):
        # Object-level permission checks are only called if `has_permission` granted access.
        # Here, `obj` would be a shelter instance obtained in the view's `get_object` method.
        return obj == request.user.seeker
    
