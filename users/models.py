from django.contrib.auth.models import User
from django.shortcuts import render
from django.db import models

class MyUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    password =  models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    Gender = models.CharField(max_length=100, null=True, blank=True)

