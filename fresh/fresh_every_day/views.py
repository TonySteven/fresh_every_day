# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

def index(request):
    return render(request,'fresh_every_day/index.html')

def login(request):
    return render(request,'fresh_every_day/login.html')

def register(request):
    return render(request,'fresh_every_day/register.html')

