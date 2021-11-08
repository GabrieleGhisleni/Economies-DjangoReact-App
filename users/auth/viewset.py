from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from users.auth.serializer import LoginSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.exceptions import AuthenticationFailed
from django.db.utils import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from records.models import Members, UserCategory
from django.contrib.auth.models import User



class LoginViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)

        except TokenError as e:
            Response({'failed': 'Token Expired'}, status = status.HTTP_401_UNAUTHORIZED)
            raise TokenError()
        except AuthenticationFailed as e:
            Response({'failed': 'User not Found'}, status = status.HTTP_401_UNAUTHORIZED)
            raise AuthenticationFailed('Wrong data')

        return Response(serializer.validated_data, status=status.HTTP_200_OK)

        


class RegistrationViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']


    def create(self, request, *args, **kwargs):
        if 'username' in request.data and User.objects.filter(username= request.data['username']).count() >= 1:
             return Response({"data": request.data, "user_already_taken":"not available"}, 
             status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User(username=request.data['username'], 
                        email=request.data['email'],
                        password=request.data['password'])

            user.save()
            Members(user=user, member_name='Comune').save()
            Members(user=user, member_name=user.username).save()
            for cat in ['Alimentari', 'Sport', 'Trasporti', 'Alimentari','Ristorante','Svago','Viaggi', 'Auto','Casa']: 
                UserCategory(category_name=cat, user=user).save()
        except Exception as e:
            print(e)
            return Response({'try except bad request'}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

        return Response({
            "user": request.data['username'],
            "refresh": res["refresh"],
            "token": res["access"]
        }, status=status.HTTP_201_CREATED)


class RefreshViewSet(viewsets.ViewSet, TokenRefreshView):
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)