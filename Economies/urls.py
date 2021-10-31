"""Economies URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from users.auth.viewset import LoginViewSet, RegistrationViewSet, RefreshViewSet

from rest_framework import routers
from records import views

router = routers.SimpleRouter()
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/register', RegistrationViewSet, basename='auth-register')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

router.register(r'api/records', views.RecordsView, basename='record')
router.register(r'api/r', views.RecordsListApi, basename='record')

# The router class allows us to make the following queries: s
# /records/ - This returns a list of all the Todo items (Create and Read operations can be done here).
# /records/id - this returns a single Todo item using the id primary key (Update and Delete operations can be done here).

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),

    # path('accounts/', include('django.contrib.auth.urls')),
]
