# Generated by Django 4.2.7 on 2023-11-10 19:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('pets', '__first__'),
        ('accounts', '0004_alter_seeker_user_alter_shelter_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Applications',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('withdrawn', 'Withdrawn'), ('denied', 'Denied')], default='pending', max_length=255)),
                ('creation_time', models.DateTimeField(auto_now_add=True, verbose_name='Creation Time')),
                ('updation_date', models.DateTimeField(auto_now=True, verbose_name='Last Updated')),
                ('details', models.TextField()),
                ('pet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applications', to='pets.pet')),
                ('seeker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applications', to='accounts.seeker')),
                ('shelter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applications', to='accounts.shelter')),
            ],
        ),
    ]
