from rest_framework import serializers
from .models import User

FOLLOW_ACTION = ['follow','unfollow']


class UserRegisteredSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','password','name']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)
    followed = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','username' ,'email','status','name','followed']
        
    def get_followed(self,obj):
        user_request = self.context['request'].user
        followed = obj.followers.filter(user_id=user_request.id).exists()
        return followed


class UserDetailSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(required=True)
    email = serializers.CharField(required=True)
    birthday = serializers.CharField(required=True)
    username = serializers.CharField(read_only=True)
    followers = serializers.SerializerMethodField(read_only=True)
    following = serializers.SerializerMethodField(read_only=True)
    followed = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 
                  'username', 
                  'email', 
                  'phone', 
                  'status', 
                  'birthday', 
                  'name', 
                  'following', 
                  'followers',
                  'followed']
                  
        
    def get_followers(self,obj):
        return obj.followers.count()
    
    def get_following(self,obj):
        return obj.following.count()
    
    def get_followed(self,obj):
        user_request = self.context['request'].user
        followed = obj.followers.filter(user_id=user_request.id).exists()
        return followed
    
    
    
class FollowSerializer(serializers.Serializer):
    follow_user = serializers.CharField(required=True,max_length=50)
    follow_action = serializers.CharField(required=True,max_length = 20)
    
    def validate_follow_action(self,value):
        value = value.lower().strip()
        if not value in FOLLOW_ACTION:
            raise serializers.ValidationError("This action is invalid")
        return value
    
    def validate_follow_user(self,value):
        user = self.context['request'].user
        if user.username == value:
            raise serializers.ValidationError("You can not follow yourself")
        return value
    