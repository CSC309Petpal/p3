from rest_framework import permissions
from .constants import ApplicationConstants
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
        
        is_shelter_user = request.user.user_type == ApplicationConstants.SHELTER
        
        # The permission check should return True only if both conditions are True
        return is_authenticated and is_shelter_user
   

class ShelterHaveApplication(permissions.BasePermission):
    """
    Only allow shelter that have this application to update it
    """

    
    def has_object_permission(self, request, view, obj):
        # obj is the model instance that the request wants to access or modify.
        return obj.shelter == request.user.shelter

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
    


class SeekerHaveApplication(permissions.BasePermission):
    
    
    def has_object_permission(self, request, view, obj):
        # obj is the model instance that the request wants to access or modify.
        return obj.seeker == request.user.seeker

    


class IsSeekerOrShelterToUpdateApplication(permissions.BasePermission):
    
    def has_permission(self, request, view):
        # Check if the user is authenticated
        is_authenticated = request.user and request.user.is_authenticated
    
        
        # The permission check should return True only if both conditions are True
        return is_authenticated 
    
    
    def has_object_permission(self, request, view, obj):
        # Check if the user is a seeker and has permission to update this application
        # shelter_permission = IsShelter()
        # seeker_permission = IsSeeker()

        # if shelter_permission.has_permission(request,view):
        #     return ShelterHaveApplication().has_object_permission(request,view,obj)
        
        # if seeker_permission.has_permission(request,view):
        #   return SeekerHaveApplication().has_object_permission(request,view,obj)
        
        is_authenticated = request.user and request.user.is_authenticated
        if not is_authenticated:
            return False
        else:
            user_type = request.user.user_type

            if user_type == ApplicationConstants.SEEKER:
                if request.user.seeker == None:
                    return False
                return SeekerHaveApplication().has_object_permission(request,view,obj)
            else:
                if request.user.shelter == None:
                    return False
                return ShelterHaveApplication().has_object_permission(request,view,obj)
                
