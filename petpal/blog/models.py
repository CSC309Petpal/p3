from django.db import models
from datetime import datetime 
from accounts.models import Shelter

class Blog(models.Model):
    
    shelter = models.ForeignKey('accounts.Shelter', on_delete=models.CASCADE, related_name='blog')
    created = models.DateTimeField(default=datetime.now, blank=True)
    title = models.CharField(max_length=100, default='New Blog', blank=True)
    content = models.CharField(max_length=2000)
    likes = models.IntegerField(default=0)
    image = models.ImageField(upload_to='Images/', blank=True, null=True, default=None)

    class Meta:
        ordering = ['-created']
    
    def __str__(self):
        return f'{self.content} from {self.shelter}'


