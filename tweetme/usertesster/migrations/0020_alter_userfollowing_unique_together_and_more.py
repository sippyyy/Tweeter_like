# Generated by Django 4.2 on 2023-08-20 19:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("usertesster", "0019_alter_userfollowing_unique_together_and_more"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="userfollowing",
            unique_together=set(),
        ),
        migrations.AddField(
            model_name="userfollowing",
            name="following_user_id",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="followers",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="userfollowing",
            name="user_id",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="following",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterUniqueTogether(
            name="userfollowing",
            unique_together={("user_id", "following_user_id")},
        ),
        migrations.RemoveField(
            model_name="userfollowing",
            name="follow_user",
        ),
        migrations.RemoveField(
            model_name="userfollowing",
            name="user",
        ),
    ]