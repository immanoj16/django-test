# Generated by Django 2.0.6 on 2018-06-10 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20180610_0709'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expenses',
            name='name',
            field=models.CharField(error_messages={'name': 'name field required'}, max_length=255, unique=True),
        ),
    ]
