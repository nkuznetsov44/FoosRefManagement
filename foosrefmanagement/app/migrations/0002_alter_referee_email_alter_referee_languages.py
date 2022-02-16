# Generated by Django 4.0.2 on 2022-02-16 12:17

from django.db import migrations, models
import django_better_admin_arrayfield.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='referee',
            name='email',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='referee',
            name='languages',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.CharField(choices=[('RU', 'Russian'), ('EN', 'English'), ('FR', 'French'), ('GE', 'German')], max_length=2), size=None),
        ),
    ]
