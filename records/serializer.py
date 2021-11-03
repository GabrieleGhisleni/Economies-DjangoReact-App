from .models import Records, Members, UserCategory, SubCategory
from rest_framework import serializers


class MembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = ('id', 'member_name')

class UserCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCategory
        fields = ('id', 'category_name')

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ('id', 'sub_category_name', 'primary_category')

class RecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Records
        fields = ('__all__')
