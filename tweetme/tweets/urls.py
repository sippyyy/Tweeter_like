from django.urls import path
from . import views

urlpatterns = [
    path("create/", views.tweet_create_view),
    path("<int:pk>/",views.tweet_detail_view),
    path("",views.tweet_list_view),
    path("action/",views.tweet_action_view),
    path("delete/<int:pk>/",views.tweet_delete_view),
    path("update/<int:pk>/",views.update_tweet),
]