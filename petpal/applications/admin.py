from django.contrib import admin
from .models import Application
# Register your models here.


class ApplicationInline(admin.StackedInline):
    model = Application
    can_delete = False
    verbose_name_plural = "Application"


# Re-register UserAdmin
admin.site.register(Application)