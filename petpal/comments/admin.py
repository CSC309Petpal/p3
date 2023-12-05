from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Comments


# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton
class CommentsInline(admin.StackedInline):
    model = Comments
    can_delete = False
    verbose_name_plural = "comments"


# Re-register UserAdmin
admin.site.register(Comments)