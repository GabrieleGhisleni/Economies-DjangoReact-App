from .serializer import RecordsSerializer      
from rest_framework import viewsets          
from .models import Records                    
from django.contrib.auth.models import User
from .models import Members


from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics

class RecordsView(viewsets.ModelViewSet):      

    serializer_class = RecordsSerializer        
    queryset = Records.objects.all()
    print(User.objects.all())



from rest_framework.permissions import IsAuthenticated            
class RecordsListApi(
                   mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.ListModelMixin,viewsets.GenericViewSet):

    permission_classes = [IsAuthenticated]
    serializer_class = RecordsSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        members = set([i for i in Members.objects.filter(user_id = user_id)]) # must changes this
        records = Records.objects.filter(made_by__in = members)
        return records

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)