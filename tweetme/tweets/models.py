from django.db import models
import random
import datetime
from usertesster.models import User


class TweetLike(models.Model):
    user = models.ForeignKey(User,null=True, on_delete=models.CASCADE)
    tweet = models.ForeignKey('Tweet',null=True, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'tweet') 
    
class Tweet(models.Model):
    parent = models.ForeignKey('self',null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User,null=True, on_delete=models.CASCADE)
    content = models.TextField(blank=True,null=True)
    image = models.FileField(upload_to='images/',blank=True, null=True)
    likes = models.ManyToManyField(User,related_name='tweet_user',blank=True,through=TweetLike)
    timestamp = models.DateTimeField(default=datetime.datetime.now)
    
    def __str__(self):
        return self.content or f"Tweet {self.id} (No content)"
    
    class Meta:
        ordering = ['-id']
        
    @property
    def is_retweet(self):
        return self.parent != None
    
    def serialize(self):
        return {
            'id':self.id,
            'content':self.content,
            'likes': random.randint(0,900)
        }
        
