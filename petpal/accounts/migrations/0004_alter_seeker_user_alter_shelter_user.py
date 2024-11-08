# Generated by Django 4.2.6 on 2023-11-10 00:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_shelter_list_of_pets'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seeker',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='seeker', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='shelter',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='shelter', to=settings.AUTH_USER_MODEL),
        ),
    ]
