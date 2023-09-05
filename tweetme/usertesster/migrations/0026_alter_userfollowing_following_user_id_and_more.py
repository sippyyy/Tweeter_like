# Generated by Django 4.2 on 2023-08-21 11:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("usertesster", "0025_userprofile"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userfollowing",
            name="following_user_id",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="followers",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.DeleteModel(
            name="UserProfile",
        ),
    ]
