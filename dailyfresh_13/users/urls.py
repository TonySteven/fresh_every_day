from django.conf.urls import url
from . import views

urlpatterns=[
    url(r'index/$',views.index),
    # url(r'user/index/login/$',views.login),
    # url(r'user/index/register/$',views.register),

]
