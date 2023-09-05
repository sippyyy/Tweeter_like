from .views import get_user,update_user,user_followers,user_following,follow_actions,create_user
# from .views import GetUserViewSet,
from django.urls import path, include
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'get_user', GetUserViewSet , "get_user" )


# urlpatterns = router.urls


urlpatterns = [
    path('<int:pk>/',get_user),
    path('update/<int:pk>/',update_user),
    path('followers/',user_followers),
    path('following/',user_following),
    path('follow/',follow_actions),
    path('register/',create_user)
]