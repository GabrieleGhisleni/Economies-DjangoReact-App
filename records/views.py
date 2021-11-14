from .serializer import (RecordsSerializer,
                         SubCategorySerializer,
                         MembersSerializer,
                         UserCategorySerializer)

from .models import Members, UserCategory, SubCategory, Records
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import generics
from rest_framework import status
from rest_framework import mixins
import datetime

max_records = 5000
max_members = 10
max_categories = 50
max_subcategories = 150

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
            if self.get_queryset().count() >= max_categories:
                return Response({"forbidden": "exceeded max_numbers of categories"}, status=status.HTTP_403_FORBIDDEN)

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

            if self.get_queryset().count() >= max_subcategories:
                return Response({"forbidden": "exceeded max_numbers of sub_categories"}, status=status.HTTP_403_FORBIDDEN)

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
            primary = get_object_or_404(UserCategory, pk=self.request.data['primary_category_id'])
            subCategory.sub_category_name = self.request.data['sub_category_name']
            subCategory.primary_category = primary
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
            if len(self.get_queryset()) >= max_members:
                return Response({"forbidden": "exceeded max_numbers of member_name"}, status=status.HTTP_403_FORBIDDEN)
            m.save()
            return Response(MembersSerializer(m).data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response({"data": self.request.data, "necessary_field": ['member_name']}, status=status.HTTP_400_BAD_REQUEST)


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
        if self.get_queryset().count() > max_records:
            return Response({"forbidden": "exceeded max_numbers of categories"}, status=status.HTTP_403_FORBIDDEN)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        if "id" not in self.request.data: 
            return Response({"data": self.request.data, "necessary_field": [ 'id']}, status=status.HTTP_400_BAD_REQUEST)

        ids = self.get_queryset()
        members = Members.objects.filter(user_id=self.request.user.id)
        subcategories = SubCategory.objects.filter(user_id=self.request.user.id)
        userCategories = UserCategory.objects.filter(user_id=self.request.user.id)

        try:
            record = ids.get(pk=request.data['id'])
        except:
            return Response({"not_allowed": request.data}, status=status.HTTP_403_FORBIDDEN)

        if "price" in self.request.data: record.price = self.request.data['price']
        if "record_name" in self.request.data: record.record_name=self.request.data['record_name']
        if "description" in self.request.data: record.description=self.request.data['description']
        if "shared" in self.request.data: record.shared = self.request.data['shared'] == 'true'

        if "created_at" in self.request.data:
            try:
                datetime.datetime.strptime(self.request.data['created_at'], '%Y-%m-%d')
            except ValueError:
                return Response({"data": self.request.data['created_at'], "format time": [ '%Y-%m-%d']}, status=status.HTTP_400_BAD_REQUEST)
            record.created_at=self.request.data['created_at']


      
        if "made_by" in self.request.data: 
            try:
                m = members.get(pk= int(self.request.data['made_by']))
                record.made_by = m
            except Exception:
                return Response({"not_allowed": request.data}, status=status.HTTP_403_FORBIDDEN)

        if "category_associated" in self.request.data: 
            try:
                c = userCategories.get(pk= int(self.request.data['category_associated']))
                record.category_associated = c
            except Exception:
                return Response({"not_allowed": request.data}, status=status.HTTP_403_FORBIDDEN)

        if "sub_category_associated" in self.request.data: 
            if  not self.request.data['sub_category_associated']:  record.sub_category_associated = None
            else: 
                try:
                    s = subcategories.get(pk= int(self.request.data['sub_category_associated']))
                    record.sub_category_associated = s
                except Exception:
                    return Response({"not_allowed": request.data}, status=status.HTTP_403_FORBIDDEN)
        record.save()
        return Response(RecordsSerializer(record).data, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, format=None):
        ids = set([i.id for i in self.get_queryset()])
        if 'id' not in request.data:
            return Response({"missing_id": request.data}, status=status.HTTP_400_BAD_REQUEST)
        if request.data['id'] not in ids:
            return Response({"not_allowed": request.data}, status=status.HTTP_403_FORBIDDEN)
        record = get_object_or_404(Records, pk=self.request.data['id'])
        record.delete()
        return Response({"deleted": "yes"}, status=status.HTTP_202_ACCEPTED)
