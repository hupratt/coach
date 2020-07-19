# Generated by Django 3.0.6 on 2020-07-19 07:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('boards', '0019_event_creator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owned_boards', to=settings.AUTH_USER_MODEL),
        ),
    ]
