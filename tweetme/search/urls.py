from django.urls import path
from . import views

urlpatterns = [
    path('user/search/',views.search_user_view)
]
