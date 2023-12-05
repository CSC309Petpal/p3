from django.db import models
from datetime import datetime 
from accounts.models import Shelter

class Comments(models.Model):
    
    sender  = models.ForeignKey('accounts.CustomUser', on_delete=models.SET_NULL, related_name='comment_sent',null=True)
    shelter = models.ForeignKey('accounts.Shelter', on_delete=models.CASCADE, related_name='comment_recieved')
    created = models.DateTimeField(default=datetime.now, blank=True)
    content = models.CharField(max_length=200)

    class Meta:
        ordering = ['-created']
    
    def __str__(self):
        return f'{self.sender} to {self.shelter}'

