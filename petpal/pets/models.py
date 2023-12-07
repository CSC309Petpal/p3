from django.db import models
from accounts.models import Shelter

class Pet(models.Model):
    # Choices for pet size
    SIZE_CHOICES = (
        ('small', 'Small'),
        ('medium', 'Medium'),
        ('large', 'Large'),
        ('extra_large', 'Extra Large'),
    )

    # Choices for pet status
    STATUS_CHOICES = (
        ('available', 'Available'),
        ('adopted', 'Adopted'),
        ('foster', 'Foster'),
    )

    # Choices for pet gender
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('unknown', 'Unknown'),
    )
    name = models.CharField(max_length=100, blank=True)
    shelter = models.ForeignKey('accounts.Shelter', on_delete=models.CASCADE, related_name='pets')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    breed = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    size = models.CharField(max_length=50, choices=SIZE_CHOICES)
    color = models.CharField(max_length=50)
    gender = models.CharField(max_length=50, choices=GENDER_CHOICES)
    image = models.ImageField(upload_to='../Images/', blank=True, null=True, default=None)

    class Meta:
        ordering = ['shelter', 'status', 'breed', 'age']

    def __str__(self):
        return f"{self.breed} - {self.size} - {self.color} - {self.gender}"
