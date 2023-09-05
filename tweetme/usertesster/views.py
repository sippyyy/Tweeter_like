from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from .models import User,UserFollowing
from rest_framework.response import Response
from django.http import JsonResponse
from .serializers import UserSerializer,UserDetailSerializer,FollowSerializer,UserRegisteredSerializer
from rest_framework import generics
from api.mixins import UserQuerysetMixin
from rest_framework.mixins import ListModelMixin, CreateModelMixin , RetrieveModelMixin, UpdateModelMixin
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.permissions import IsOwnerOrReadOnly
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny


from rest_framework import mixins, viewsets
# @permission_classes(['IsAuthenticated'])
# def get_user(request,pk):
#     print(request.method)
#     qs = User.objects.filter(id = pk)
#     if not qs.exists():
#         return Response({'message':"user id does not exist"},status = 404)
#     serializer = UserDetailSerializer(qs.first())
#     return  JsonResponse(serializer.data)

# class GetUserViewSet(mixins.ListModelMixin,mixins.RetrieveModelMixin,
#                      viewsets.GenericViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
    
#     def get(self, request, format=None):
#         return Response("test")

class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisteredSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                "message": "User registration successful",
            }
            return Response(response_data, status=201) 
        return Response(serializer.errors, status=400)

create_user = CreateUser.as_view()

class GetUser(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    
get_user = GetUser.as_view()

class UpdateUser(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [IsOwnerOrReadOnly]
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
update_user = UpdateUser.as_view()


class FollowAction(mixins.CreateModelMixin, GenericAPIView):
    serializer_class = FollowSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.request.user
        data = serializer.validated_data
        follow_user = data['follow_user']
        follow_action = data['follow_action']
        
        try:
            user_is_followed = User.objects.get(username=follow_user)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if follow_action.lower().strip() == 'follow':
            UserFollowing.objects.get_or_create(user_id=user, following_user_id=user_is_followed)
        elif follow_action.lower().strip() == 'unfollow':
            UserFollowing.objects.filter(user_id=user, following_user_id=user_is_followed).delete()
        else:
            return Response({"error": "Invalid follow action"}, status=status.HTTP_400_BAD_REQUEST)
        dataResponse = UserDetailSerializer(user_is_followed,context={'request':request}).data
        return Response(dataResponse, status=201)

follow_actions = FollowAction.as_view()
    

class GetFollowers(generics.ListAPIView):
    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id is not None:
            return UserFollowing.objects.filter(following_user_id=user_id).all()
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        user_objects = [entry.user_id for entry in queryset]
        serializer = UserSerializer(user_objects, many=True,context={'request': request})
        return Response(serializer.data)
    
user_followers = GetFollowers.as_view()

class GetFollowing(generics.ListAPIView):
    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id is not None:
            return UserFollowing.objects.filter(user_id=user_id).all()
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        user_objects = [entry.following_user_id for entry in queryset]
        serializer = UserSerializer(user_objects, many=True,context={'request': request})
        return Response(serializer.data)
    
user_following = GetFollowing.as_view()
