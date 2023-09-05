from django.shortcuts import render
from django.conf import settings
from .models import Tweet
from usertesster.models import UserFollowing
from .serializers import TweetSerializer,TweetActionSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics


ALLOWED_HOSTS = settings.ALLOWED_HOSTS

def is_ajax(request):
    return bool(request.headers.get('X-Requested-With'))

def home_view(request,*args,**kwargs):
    return render(request,"pages/home.html",context={})
@api_view(['POST'])
def tweet_create_view(request,*args,**kwargs):
    data = request.data
    serializer =  TweetSerializer(data = data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user = request.user)
        return Response(serializer.data,status = 201,context={'request': request})
    return Response({},status = 400)

@api_view(['GET'])
def tweet_list_view(request,*args,**kwargs):
    user = request.user
    following_users = UserFollowing.objects.filter(user_id=user).values_list('following_user_id', flat=True)
    qs = Tweet.objects.all()
    userId = request.GET.get('user_id')
    following = request.GET.get('following')
    if userId != None:
        qs = qs.filter(user__id=userId)
    if following:
        qs = qs.filter(user__id__in=following_users)
    serializer = TweetSerializer(qs,many=True,context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def tweet_detail_view(request,*args,**kwargs):
    pk = kwargs.get('pk')
    qs = Tweet.objects.filter(id = pk)
    if not qs.exists():
        return Response({},status = 404)
    obj = qs.first()
    serializer = TweetSerializer(obj,context={'request': request})
    return Response(serializer.data)

@api_view(['DELETE','POST'])
def tweet_delete_view(request,*args,**kwargs):
    pk = kwargs.get('pk')
    qs = Tweet.objects.filter(id=pk)
    if not qs.exists():
        return Response({},status = 404)
    qs = qs.filter(user = request.user)
    if not qs.exists():
        return Response({"message":"Not allowed"},status = 401)
    obj = qs.first()
    obj.delete()
    return Response({'message': 'Tweet deleted'},status = 200)

@api_view(['POST'])
def tweet_action_view(request,*args,**kwargs):
    serializer = TweetActionSerializer(data = request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        tweet_id = data.get('id')
        action = data.get('action')
        content = data.get('content')
        qs = Tweet.objects.filter(id=tweet_id)
        message = f"Liked tweet {tweet_id}"
        if not qs.exists:
            return Response({},status = 404)
        obj = qs.first()
        if action == 'like':
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj,context={'request': request})
            return Response(serializer.data,status = 200)
        elif action == 'unlike':
            obj.likes.remove(request.user)
            message = f"Unliked tweet {tweet_id}"
            serializer = TweetSerializer(obj,context={'request': request})
            return Response(serializer.data,status = 200)
        elif action == 'retweet':
            parent_obj = obj
            new_tweet = Tweet.objects.create(
                user = request.user,
                parent = parent_obj,
                content = content
            )
            serializer = TweetSerializer(new_tweet,context={'request': request})
            return Response(serializer.data,status = 200)
    return Response({'message':message},status = 200)
    
    

class UpdateTweet(generics.UpdateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    def put(self,request,*args,**kwargs):
        return self.update(request, *args, **kwargs)
    
update_tweet = UpdateTweet.as_view()

