from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username=models.CharField(max_length=200,unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20,unique=True,null=True)
    status = models.CharField(max_length=200,null=True)
    birthday = models.DateField(null=True)
    name = models.CharField(max_length=200,null=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

class UserFollowing(models.Model):
    user_id = models.ForeignKey("User",null=True, related_name="following",on_delete=models.CASCADE)
    following_user_id = models.ForeignKey("User",null=True, related_name="followers",on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user_id', 'following_user_id')
    
    def clean(self) -> None:
        if self.user_id == self.following_user_id:
           raise ValidationError("You can't follow yourself")
    