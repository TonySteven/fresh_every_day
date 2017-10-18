from django.conf.urls import url
from . import views

urlpatterns=[
    url(r'fresh/index/$',views.index),
    url(r'fresh/index/login/$',views.login),
    url(r'fresh/index/register/$',views.register),

]
