# Generated by Django 4.2.7 on 2023-11-09 18:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notification',
            old_name='reciever',
            new_name='receiver',
        ),
    ]
