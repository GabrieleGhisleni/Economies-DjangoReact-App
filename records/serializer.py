from rest_framework import serializers 
from .models import Records, Members, Category



class MembersSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        try:self.user = kwargs.pop('user')
        except Exception as e: pass
        super().__init__(*args, **kwargs)
    
    class Meta:
        model = Members
        fields = ('id','member_name')

    def create(self, validated_data):
        member = Members.objects.create(user=self.user, **validated_data)
        return member

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','category_name')


class RecordsSerializer(serializers.ModelSerializer):
    category_associated = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True)

    class Meta:
        model = Records
        fields = ('__all__')

    def create(self, validated_data):
        categories = (validated_data.pop('category_associated'))
        record = Records.objects.create(**validated_data)
        record.category_associated.add(*categories)
        return record

