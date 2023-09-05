from rest_framework import authentication
from usertesster.models import User

class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self,request):
        print(request)
        qs = User.objects.all()
        user = qs.order_by("?").first()
        return (user,None)