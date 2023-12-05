from django.db import models
from datetime import datetime 
from accounts.models import Shelter
from applications.models import Application

class Followup(models.Model):
    
    sender  = models.ForeignKey('accounts.CustomUser', on_delete=models.SET_NULL, related_name='followup_sent',null=True)
    application = models.ForeignKey('applications.Application', on_delete=models.CASCADE, related_name='followup')
    created = models.DateTimeField(default=datetime.now, blank=True)
    content = models.CharField(max_length=200)

    class Meta:
        ordering = ['-created']
    
    def __str__(self):
        return f'{self.id} {self.sender} to {self.application}'

