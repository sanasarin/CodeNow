from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from .models import CustomUser
from rest_framework.generics import CreateAPIView, DestroyAPIView
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
# local imports
from .serializers import UserSerializer

class ViewEditProfile(APIView):
    """
    Edit Profile View
    """
    def get(self, request, *args, **kwargs):
        """
        Gets Profile Data
        """
        if not request.user.is_authenticated:
            return Response({'detail':'user must be logged in'}, status=status.HTTP_401_UNAUTHORIZED)
        user_obj = request.user
        response_data = {'email':user_obj.email, 
                         'username':user_obj.username,
                         'first_name':user_obj.first_name,
                         'last_name':user_obj.last_name,
                         }

        return Response(response_data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        """
        Updates Profile Data
        """
        if not request.user.is_authenticated:
            return Response({'detail':'user must be logged in'}, status=status.HTTP_401_UNAUTHORIZED)

        user_obj = request.user

        serializer = UserSerializer(user_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Login
class CustomAuthToken(ObtainAuthToken):
    """
    Auth Token View
    """
    def post(self, request, *args, **kwargs):
        """
        Generates An Auth Token
        """
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})


# Register
class RegisterView(CreateAPIView):
    """
    Register User View
    """
    permission_classes = (permissions.AllowAny,)
    model = get_user_model()
    serializer_class = UserSerializer


# Logout
class LogoutView(DestroyAPIView):
    """
    Logout User View
    """
    permission_classes = (permissions.IsAuthenticated,)

    def destroy(self, request, *args, **kwargs):
        """
        Destroys Token
        """
        Token.objects.filter(user=request.user).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
