from rest_framework import permissions

class IsShelter(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated
        is_authenticated = request.user and request.user.is_authenticated
        # Check if the user_type of the user is 'shelter'
        is_shelter_user = request.user.user_type == 2
        
        # The permission check should return True only if both conditions are True
        return is_authenticated and is_shelter_user
    

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # obj is the model instance that the request wants to access or modify.
        return obj.shelter == request.user.shelter