from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, Seeker, Shelter

from .models import Seeker, Shelter


# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton
class SeekerInline(admin.StackedInline):
    model = Seeker
    can_delete = False
    verbose_name_plural = "seeker"

class ShelterInline(admin.StackedInline):
    model = Shelter
    can_delete = False
    verbose_name_plural = "shelter"

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = [SeekerInline, ShelterInline]
    



# Re-register UserAdmin

admin.site.register(CustomUser, UserAdmin)

admin.site.register(Seeker)
admin.site.register(Shelter)