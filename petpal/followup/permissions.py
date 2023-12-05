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
    
class IsApplier(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # obj is the model instance that the request wants to access or modify.
        return obj.applictaion.seeker == request.user.seeker

class SeekerHaveApplication(permissions.BasePermission):
    
    
    def has_object_permission(self, request, view, obj):
        # obj is the model instance that the request wants to access or modify.
        return obj.application.seeker == request.user.seeker


class ShelterHaveApplication(permissions.BasePermission):
    """
    Only allow shelter that have this application to update it
    """

    
    def has_object_permission(self, request, view, obj):
        # obj is the model instance that the request wants to access or modify.
        return obj.application.shelter == request.user.shelter

class IsRelated(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # # Check if the user making the request is the seeker or shelter associated with the Application
        # return (request.user == obj.application.seeker.user or request.user == obj.application.shelter.user)
        is_authenticated = request.user and request.user.is_authenticated
        if not is_authenticated:
            return False
        if request.user.user_type == 1:
            # Seeker can create followup on their applications
            return obj.application.seeker == request.user.seeker
        elif request.user.user_type == 2:
            # Shelter can create followup on applications under their shelter
            return obj.application.shelter == request.user.shelter

        return False
    
