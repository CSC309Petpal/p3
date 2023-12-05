from django.contrib import admin

from .models import Followup


# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton
class FollowupsInline(admin.StackedInline):
    model = Followup
    can_delete = False
    verbose_name_plural = "Followup"


# Re-register UserAdmin
admin.site.register(Followup)