from .serializer import (RecordsSerializer,
                         SubCategorySerializer,
                         MembersSerializer,
                         #  CategorySerializer,
                         UserCategorySerializer)

from django.shortcuts import get_object_or_404
from .models import Members, UserCategory, SubCategory  # Category
from rest_framework import viewsets
from .models import Records
from django.contrib.auth.models import User

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
                   mixins.ListModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.CreateModelMixin,):

    permission_classes = [IsAuthenticated]
    serializer_class = UserCategorySerializer

    def get_queryset(self):
        userCategories = (UserCategory.objects.filter(user_id=self.request.user.id))
        return (userCategories)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def create(self, serializer):
        if 'category_name' not in self.request.data:
            return Response({"data": self.request.data, "necessary_field": ['category_name', ]}, status=status.HTTP_400_BAD_REQUEST)
        try:
            u = UserCategory(
                category_name=self.request.data['category_name'],
                user=self.request.user)
            u.save()
            serialized = UserCategorySerializer(u)
            return Response(serialized.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response({"data": self.request.data, "necessary_field": ['category_name']}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        if "category_name" not in self.request.data or "id" not in self.request.data:
            return Response({"data": self.request.data, "necessary_field": ['category_name', 'id' ]}, status=status.HTTP_400_BAD_REQUEST)
        userCategory = get_object_or_404(UserCategory, pk=self.request.data['id'])
        if userCategory.user_id == request.user.id:
            userCategory.category_name = self.request.data['category_name']
            userCategory.save()
            return Response(UserCategorySerializer(userCategory).data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"forbidden": "403"}, status=status.HTTP_403_FORBIDDEN)


    def delete(self, request, format=None):
        if 'id' not in self.request.data:
            return Response({"data": self.request.data, "necessary_field": ['id']}, status=status.HTTP_400_BAD_REQUEST)
        userCategory = get_object_or_404(UserCategory, pk=self.request.data['id'])
        if userCategory.user_id == request.user.id:
            userCategory.delete()
            return Response({"deleted": "yes"}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"forbidden": "403"}, status=status.HTTP_403_FORBIDDEN)


class SubCategoryView(viewsets.GenericViewSet,
                      mixins.RetrieveModelMixin,
                      mixins.ListModelMixin,
                      mixins.CreateModelMixin,):

    permission_classes = [IsAuthenticated]
    serializer_class = SubCategorySerializer

    def get_queryset(self):
        categories = (SubCategory.objects.filter(user_id=self.request.user.id))
        return (categories)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def create(self, serializer):
        if 'primary_category' not in self.request.data or 'sub_category_name' not in self.request.data :
            return Response({"data": self.request.data, "necessary_field": ['primary_category', 'sub_category_name']}, status=status.HTTP_400_BAD_REQUEST)
        userCategory = get_object_or_404(UserCategory, pk=self.request.data['primary_category'])
        try:
            u = SubCategory(
                sub_category_name=self.request.data['sub_category_name'],
                primary_category=userCategory,
                user=self.request.user)
            u.save()
            serialized = SubCategorySerializer(u)
            return Response(serialized.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response({"data": self.request.data, "necessary_field": ['primary_category', 'sub_category_name']}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        if 'id' not in self.request.data:
            return Response({"data": self.request.data, "necessary_field": ['id']}, status=status.HTTP_400_BAD_REQUEST)
        subCategory = get_object_or_404(SubCategory, pk=self.request.data['id'])
        if subCategory.user_id == request.user.id:
            subCategory.delete()
            return Response({"deleted": "yes"}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"forbidden": "403"}, status=status.HTTP_403_FORBIDDEN)

    def put(self, request, *args, **kwargs):
        if "id" not in self.request.data or "primary_category_id" not in self.request.data or "sub_category_name" not in self.request.data:
            return Response({"data": self.request.data, "necessary_field": [ 'id', "primary_category_id", "sub_category_name"]}, status=status.HTTP_400_BAD_REQUEST)
        subCategory = get_object_or_404(SubCategory, pk=self.request.data['id'])
        if subCategory.user_id == request.user.id:
            subCategory.sub_category_name = self.request.data['sub_category_name']
            subCategory.primary_category_id = self.request.data['primary_category_id']
            subCategory.save()
            return Response(SubCategorySerializer(subCategory).data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"forbidden": "403"}, status=status.HTTP_403_FORBIDDEN)


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
        members = ([i for i in Members.objects.filter(user_id=user_id)])
        return members

    def create(self, request, *args, **kwargs):
        if "member_name" not in request.data:
            return Response({"data": self.request.data, "necessary_field": ['member_name']}, status=status.HTTP_400_BAD_REQUEST)
        try:
            m = Members(member_name = self.request.data['member_name'],
                        user = self.request.user)
            m.save()
            return Response(MembersSerializer(m).data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response({"data": self.request.data, "necessary_field": ['category_name']}, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, format=None):
        if 'id' not in self.request.data:
            return Response({"data": self.request.data, "necessary_field": ['id']}, status=status.HTTP_400_BAD_REQUEST)
        members = get_object_or_404(Members, pk=self.request.data['id'])
        if members.user_id == request.user.id:
            members.delete()
            return Response({"deleted": "yes"}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"forbidden": "403"}, status=status.HTTP_403_FORBIDDEN)

    def put(self, request, *args, **kwargs):
        if "id" not in self.request.data or "member_name" not in self.request.data:
            return Response({"data": self.request.data, "necessary_field": [ 'id', "member_name"]}, status=status.HTTP_400_BAD_REQUEST)
        member = get_object_or_404(Members, pk=self.request.data['id'])
        if member.user_id == request.user.id:
            member.member_name = self.request.data['member_name']
            member.save()
            return Response(MembersSerializer(member).data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"forbidden": "403"}, status=status.HTTP_403_FORBIDDEN)

class RecordsListApi(
        mixins.CreateModelMixin,
        mixins.RetrieveModelMixin,
        mixins.UpdateModelMixin,
        mixins.ListModelMixin,
        viewsets.GenericViewSet):

    permission_classes = [IsAuthenticated]
    serializer_class = RecordsSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        members = set([i for i in Members.objects.filter(user_id=user_id)])  # must changes this
        records = Records.objects.filter(made_by__in=members).order_by('-created_at')
        return records

    def create(self, request, *args, **kwargs):
        serializer = RecordsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

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
        ids = set([i.id for i in self.get_queryset()])
        if 'id' not in request.data:
            return Response({"missing_id": request.data}, status=status.HTTP_400_BAD_REQUEST)
        if request.data['id'] not in ids:
            return Response({"not_allowed": request.data}, status=status.HTTP_403_FORBIDDEN)
        record = get_object_or_404(Records, pk=self.request.data['id'])
        record.delete()
        return Response({"deleted": "yes"}, status=status.HTTP_202_ACCEPTED)
