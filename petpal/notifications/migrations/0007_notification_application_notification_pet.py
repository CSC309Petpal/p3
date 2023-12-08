# Generated by Django 4.2.7 on 2023-12-08 00:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pets', '0003_alter_pet_image'),
        ('applications', '0003_rename_updation_date_application_updation_time'),
        ('notifications', '0006_notification_sender_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='application',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='applications.application'),
        ),
        migrations.AddField(
            model_name='notification',
            name='pet',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pets.pet'),
        ),
    ]
