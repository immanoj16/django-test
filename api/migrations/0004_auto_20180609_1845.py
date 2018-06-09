# Generated by Django 2.0.6 on 2018-06-09 18:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_userprofile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expenses',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='expenses', to=settings.AUTH_USER_MODEL),
        ),
    ]