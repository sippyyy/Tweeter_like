from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from tweets import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/",include('api.urls')),
    path("", views.home_view),
    path("react/", TemplateView.as_view(template_name="react.html")),
    path("api/tweets/",include('tweets.urls')),
    path("api/user/",include('usertesster.urls')),
    path("api/",include('search.urls'))
]


if settings.DEBUG:
    urlpatterns+=static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)