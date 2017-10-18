# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class BaseModel(models.Model):
    create_time = models.DateTimeField(auto_now_add=True,verbose_name='create time')
    update_time = models.DateTimeField(auto_now=True,verbose_name='update time')

    class Meta:
        abstract = True