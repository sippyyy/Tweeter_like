# Generated by Django 4.2 on 2023-08-16 07:35

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("usertesster", "0006_alter_userprofile_user"),
    ]

    operations = [
        migrations.RenameField(
            model_name="userprofile",
            old_name="user",
            new_name="user_base",
        ),
    ]
