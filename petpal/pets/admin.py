from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Pet


# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton
class PetInline(admin.StackedInline):
    model = Pet
    can_delete = False
    verbose_name_plural = "pet"


# Re-register UserAdmin
admin.site.register(Pet)