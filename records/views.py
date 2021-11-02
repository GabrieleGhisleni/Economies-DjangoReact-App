from .serializer import RecordsSerializer, MembersSerializer, CategorySerializer 
from rest_framework import viewsets          
from .models import Records                    
from django.contrib.auth.models import User
from .models import Members, Category

from rest_framework.views import APIView
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated    

class CategoryView(viewsets.GenericViewSet,
                    mixins.RetrieveModelMixin,
                  mixins.ListModelMixin):

    permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer

    def get_queryset(self):
        categories = Category.objects.all()
        return categories

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)




class MemberListApi(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):

        permission_classes = [IsAuthenticated]
        serializer_class = MembersSerializer

        def get_queryset(self):
            user_id = self.request.user.id
            members = ([i for i in Members.objects.filter(user_id = user_id)]) 
            return members

        def create(self, request, *args, **kwargs):
            serializer = MembersSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        def delete(self, request, format=None):
            members = Members.objects.filter(pk=request.data['id'])
            members.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        


class RecordsListApi(
                   mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):

    permission_classes = [IsAuthenticated]
    serializer_class = RecordsSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        members = set([i for i in Members.objects.filter(user_id = user_id)]) # must changes this
        records = Records.objects.filter(made_by__in = members).order_by('-created_at')
        return records
    
    def create(self, request, *args, **kwargs):
        serializer = RecordsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        ""
        # record = Records.objects.filter(pk=request.data['id'])
        # serializer = RecordsSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # record.update(serializer)
        
        # # print(record, serializer)
        return Response(status=status.HTTP_202_ACCEPTED)

    def delete(self, request, format=None):
        record = Records.objects.filter(pk=request.data['id'])
        record.delete()
        return Response(status=status.HTTP_202_ACCEPTED)