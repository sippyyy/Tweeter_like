from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from usertesster.models import User
from usertesster.serializers import UserDetailSerializer
from . import client
# Create your views here.
class SearchUser(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q')
        results= client.perform_search(query)
        return Response(results)
    
search_user_view = SearchUser.as_view()