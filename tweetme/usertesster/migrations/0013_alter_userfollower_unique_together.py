# Generated by Django 4.2 on 2023-08-19 10:30

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("usertesster", "0012_alter_userfollower_unique_together"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="userfollower",
            unique_together={("user", "follower")},
        ),
    ]