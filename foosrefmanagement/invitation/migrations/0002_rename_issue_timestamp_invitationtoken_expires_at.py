# Generated by Django 4.0.2 on 2022-07-31 10:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('invitation', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='invitationtoken',
            old_name='issue_timestamp',
            new_name='expires_at',
        ),
    ]
