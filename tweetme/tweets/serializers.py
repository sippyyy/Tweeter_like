from rest_framework import serializers

from .models import Tweet,TweetLike
from usertesster.serializers import UserSerializer

TWEET_ACTION_OPTIONS = ["like","unlike","retweet"]

class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True,required=False)
    
    def validate_action(self,value):
        value = value.lower().strip()
        if not value in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError("This action is invalid")
        return value
    
    
class TweetCreateSerializer(serializers.ModelSerializer):
    
    likes = serializers.SerializerMethodField(read_only= True)
    class Meta:
        model = Tweet
        fields = ['content','id','likes','user']
        

        
    def get_likes(self,obj):
        return obj.likes.count()
        

    
    def create(self, validated_data):
        """
        Create and return a new Tweet instance, given the validated data.
        """
        return Tweet.objects.create(**validated_data)
    
class TweetSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only= True)
    parent = TweetCreateSerializer(read_only=True)
    like_users = UserSerializer(many=True, read_only=True, source="likes")
    created_at = serializers.CharField(source='timestamp', read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Tweet
        fields = ['content','id','likes','is_retweet','parent',"like_users","user","created_at"]
        
    def get_likes(self,obj):
        return obj.likes.count()
    
    def create(self, validated_data):
        return Tweet.objects.create(**validated_data)
    