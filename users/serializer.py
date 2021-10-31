from django.contrib.auth.models import User
from rest_framework import serializers

class CurrentUserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'id')