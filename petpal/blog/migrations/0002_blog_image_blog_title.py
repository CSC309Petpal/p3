# Generated by Django 4.2 on 2023-12-08 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='image',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='Images/'),
        ),
        migrations.AddField(
            model_name='blog',
            name='title',
            field=models.CharField(blank=True, default='New Blog', max_length=100),
        ),
    ]
