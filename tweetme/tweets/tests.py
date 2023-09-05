from django.test import TestCase
from usertesster.models import User
from .models import Tweet
from rest_framework.test import APIClient
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="thuy", password="haha123456@")
        self.user2 = User.objects.create_user(username="thuy2", password="haha123456@")
        Tweet.objects.create(content="test default", user=self.user)
        Tweet.objects.create(content="test default 2", user=self.user)
        Tweet.objects.create(content="test default 2", user=self.user2)
        self.current_count = Tweet.objects.all().count()

    def test_tweet_create(self):
        tweet = Tweet.objects.create(content="Hello Tweeter", user=self.user)
        self.assertEqual(tweet.id, self.current_count+1)
        self.assertEqual(tweet.user, self.user)

    def get_client(self):
        client = APIClient()
        client.login(username="thuy", password="haha123456@")
        return client

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get('/api/tweets/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_tweet_detail(self):
        client = self.get_client()
        response = client.get('/api/tweets/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['id'], 1)
        
    
    def test_tweet_delete_view(self):
        client = self.get_client()
        response = client.delete('/api/tweets/delete/1/')
        self.assertEqual(response.status_code, 200)
        response = client.delete('/api/tweets/delete/1/')
        self.assertEqual(response.status_code, 404)
        response_incorrect_owner = client.delete('/api/tweets/delete/3/')
        self.assertEqual(response_incorrect_owner.status_code, 401)
    

    def test_action_like(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/', {
            "id": 1,
            "action": "like"
        })
        like_count = response.json().get("likes")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(like_count, 1)
        
    def test_action_unlike(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/', {
            "id": 1,
            "action": "like"
        })
        self.assertEqual(response.status_code, 200)
        response = client.post('/api/tweets/action/', {
            "id": 1,
            "action": "unlike"
        })     
        self.assertEqual(response.status_code, 200)
        
        
    def test_action_retweet(self):
        client= self.get_client()
        response = client.post('/api/tweets/action/', {
            "id": 1,
            "action": "retweet"
        })
        self.assertEqual(response.status_code, 200)
        data = response.json()
        new_tweet_id = data.get("id")
        self.assertNotEqual(new_tweet_id,1)
        self.assertEqual(self.current_count + 1,new_tweet_id)
        

    def test_tweet_create_api_view(self):
        data = {
            "content": "Hello World",
        }
        client = self.get_client()
        response = client.post("/api/tweets/create/",data)
        self.assertEqual(response.status_code, 201)
        res_data = response.json()
        new_tweet_id = res_data.get("id")
        self.assertEqual(self.current_count + 1,new_tweet_id)