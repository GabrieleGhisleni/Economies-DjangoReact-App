from rest_framework import serializers 
from .models import Records, Members   



class MembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = ('id', 'name')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = ('id', 'name')

class RecordsSerializer(serializers.ModelSerializer):
    made_by = MembersSerializer(many=False)
    category_associated = CategorySerializer(many=True)
    class Meta:
        model = Records
        fields = ('__all__')
        

