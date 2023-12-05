from django.db import models
from accounts.models import Seeker
from pets.models import Pet
from django.utils import timezone 
# Create your models here.
class Application(models.Model) :
    # Choices for application status
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('withdrawn', 'Withdrawn'),
        ('denied', 'Denied')
    )
    

    pet = models.ForeignKey('pets.Pet', on_delete=models.CASCADE, related_name='applications')
    seeker = models.ForeignKey('accounts.Seeker', on_delete=models.CASCADE, related_name='applications')
    shelter = models.ForeignKey('accounts.Shelter', on_delete=models.CASCADE, related_name='applications')
    status = models.CharField(max_length = 255, choices = STATUS_CHOICES, default='pending')
    creation_time = models.DateTimeField(auto_now_add=True, verbose_name="Creation Time")
    updation_time = models.DateTimeField(auto_now = True, verbose_name="Last Updated")
    details = models.TextField()

    def __str__(self):
      return f"{self.seeker} Application for {self.pet} under shelter {self.shelter}"

    
def update_application_updation_time(application_id):
   
    application = Application.objects.get(pk=application_id)

    # Update the updation_time to the current time
    application.updation_time = timezone.now()
    application.save()
