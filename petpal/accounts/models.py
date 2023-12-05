# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.core.validators import validate_email
from django.contrib.auth.models import BaseUserManager



class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, user_type=None, location='', **extra_fields):
        """
        Creates and saves a CustomUser with the given email, user type, location and password.
        """
        
        if not user_type:
            raise ValueError('User type must be set')
    
        email = self.normalize_email(email)
        user = self.model(email=email, user_type=user_type, location=location, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, password, email='',user_type=None, location='', **extra_fields):
        """
        Creates and saves a superuser with the given email, user type, location and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        # Superuser can have a default user type unless specified
        # Default user type 
        if not user_type:
            user_type = 1  

        return self.create_user(email, password, user_type=user_type, location=location, **extra_fields)


# Base User model
class CustomUser(AbstractUser, PermissionsMixin):
    
    USER_TYPE_CHOICES = (
      (1, 'seeker'),
      (2, 'shelter'),
    )
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['password', 'user_type']
    
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)
    location = models.CharField(max_length=255, blank=True)
    objects = CustomUserManager()
    def __str__(self):
        return str(self.pk) + "\n " + self.username
    
# Seeker profile model
class Seeker(models.Model):
    
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='seeker')
    phone_number = models.CharField(max_length=20, blank=True)
    birthday= models.DateField(auto_now=False, null=True, blank=True) 
    preference = models.TextField(blank=True)
    

    def __str__(self):
        return 'ID: '+str(self.pk) + " Username:" +self.user.username
        

# Shelter profile model
class Shelter(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='shelter')
    list_of_pets = models.TextField(blank=True)  # assuming this is a text field; change as needed

    def __str__(self):
        return 'ID: '+str(self.pk) + " Username:" +self.user.username




