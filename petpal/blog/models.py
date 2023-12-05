from django.db import models
from datetime import datetime 
from accounts.models import Shelter

class Blog(models.Model):
    
    shelter = models.ForeignKey('accounts.Shelter', on_delete=models.CASCADE, related_name='blog')
    created = models.DateTimeField(default=datetime.now, blank=True)
    content = models.CharField(max_length=200)
    likes = models.IntegerField(default=0)

    class Meta:
        ordering = ['-created']
    
    def __str__(self):
        return f'{self.content} from {self.shelter}'

