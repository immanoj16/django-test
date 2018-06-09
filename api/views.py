from django.contrib.auth.models import User
from rest_framework import generics, permissions, status, views
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_protect

from .permissions import IsOwner
from .serializers import ExpenseSerializer, UserSerializer, UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer
from .models import Expenses


class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Expenses.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save(owner=self.request.user)


class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""

    queryset = Expenses.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)


class UserView(generics.ListAPIView):
    """View to list the user queryset."""
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailsView(generics.RetrieveAPIView):
    """View to retrieve a user instance."""
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRegistrationAPIView(generics.CreateAPIView):
    """
    Endpoint for user registration.
    """

    permission_classes = (permissions.AllowAny, )
    serializer_class = UserRegistrationSerializer
    queryset = User.objects.all()

    def retrieve(self, request, pk=None):
        if pk == 'i':
            return Response(UserRegistrationSerializer(request.user, context={'request': request}).data)
        return super(UserRegistrationAPIView, self).retrieve(request, pk)


@csrf_protect
class UserLoginAPIView(views.APIView):
    """
    Endpoint for user login. Returns authentication token on success.
    """

    permission_classes = (permissions.AllowAny, )
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileAPIView(generics.RetrieveAPIView):
    """
    Endpoint to retrieve user profile.
    """

    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user.userprofile
