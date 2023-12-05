from django.contrib import admin
from .models import Blog
# Register your models here.


class BlogInline(admin.StackedInline):
    model = Blog
    can_delete = False
    verbose_name_plural = "Blog"


# Re-register UserAdmin
admin.site.register(Blog)