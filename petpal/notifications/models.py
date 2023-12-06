from django.db import models
from accounts.models import CustomUser

# Create your models here.
class Notification(models.Model):
    MESSAGE_TYPE = (
        ('message', 'Message'),
        ('status_update', 'Status Update'),
        ('new_pet_listings', 'New Pet Listings'),
        ('new_review', 'New Review'),
        ('new_application', 'New Application'),
    )
    sender = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, related_name="sent_notifications", null=True)
    sender_name = models.CharField(max_length=255, blank=True, null=True)
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='received_notifications')
    message = models.TextField(blank=True)
    type = models.CharField(max_length=50, default='message', choices=MESSAGE_TYPE)
    creation_time= models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    url1 = models.URLField(default='')
    url2 = models.URLField(default='')

    def __str__(self) -> str:
        if self.sender == None:
            return str(self.pk) + " System to " + self.receiver.username + " Type: " + self.type
        else:
            return str(self.pk) + " " + self.sender.username + " to " + self.receiver.username + " Type: " + self.type

def create_notification(sender, receiver, message, type, url1='', url2=''):
    notification = Notification(sender=sender, sender_name = sender.username, receiver=receiver, message=message, type=type, url1=url1, url2=url2)
    notification.save()
    return notification