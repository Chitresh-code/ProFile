from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from .utils import create_username
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication


"""
This file contains the views for the application.
Views are used to handle HTTP requests and return HTTP responses.
We can define views as functions or classes.
Views take a request as an argument and return a response.
Views can perform tasks like querying the database, rendering templates, and returning JSON responses.
Using Django REST framework, we can create API views that return JSON responses.
"""

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def register(request):
    """
    This view is used to register a new user.
    It takes the user's first name, last name, email, and password as input.
    It creates a new user in the database and returns the user details in the response.
    
    Args:
        request: The JSON request containing the user details.
        The request should contain the following fields:
            - first_name: The first name of the user.
            - last_name: The last name of the user.
            - email: The email address of the user.
            - password: The password of the user.
            - confirm_password: The confirmation password.
            
    Returns:
        A JSON response containing the user details if the user is successfully registered.
        An error response if the user registration fails.
    """
    try:
        # Validate the input data
        data = request.data
        
        # Check if the passwords match
        if data['password'] != data['confirm_password']:
            # Return an error response if the passwords do not match
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Remove the confirm_password field from the input data
        data.pop('confirm_password')
        
        serializer = UserSerializer(data=request.data)
        
        # Check if the input data is valid
        if serializer.is_valid():
            data = serializer.validated_data
        else:
            # Return an error response if the input data is invalid
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Create a unique username for the user
        username = create_username(data['first_name'], data['last_name'])
        
        # Check if the email already exists in the database
        if User.objects.filter(email=data['email']).exists():
            # Return an error response if the email already exists
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create a new user in the database
        user = User(
            username=username,
            email=data['email'],
            first_name=data['first_name'],
            last_name=data.get('last_name', ''),
        )
        # Set the password for the user
        user.set_password(data['password'])
        # Save the user in the database
        user.save()
        
        # Return the user details and token in the success response
        serializer = UserSerializer(user)
        return Response({"success": "User registered successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        # Return an error response if an exception occurs
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def login_view(request):
    """
    This view is used to log in a user.
    It takes the user's username and password as input.
    It authenticates the user and creates a token for the user.
    
    Args:
        request: The JSON request containing the user credentials.
        The request should contain the following fields:
            - username: The username of the user.
            - password: The password of the user.
    
    Returns:
        A JSON response containing the user details and token if the user is successfully logged in.
        An error response if the user login fails.
    """
    try:
        # Validate the input data
        data = request.data

        # Authenticate the user using the username and password
        user = authenticate(username=data['username'], password=data['password'])
        
        # Check if the user is authenticated
        if user is not None:
            # Log in the user
            login(request, user)
            
            # Create or retrieve the token for the user
            token, created = Token.objects.get_or_create(user=user)
            
            # Check if the token is created
            # This is useful when the user logs in multiple times
            if not created:
                # Delete the old token if it already exists
                token.delete()
                token = Token.objects.create(user=user)
            
            # Return the user details and token in the success response
            return Response({'success': 'User logged in', 'token': token.key}, status=status.HTTP_200_OK)
        else:
            # Return an error if the user is not authenticated
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        # Return an error response if an exception occurs
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def logout_view(request):
    """
    This view is used to log out a user.
    It deletes the user's token to invalidate it.
    
    Args:
        request: The JSON request containing the user details.
        Make sure in the request header, the 'Authorization' key is set to 'Token <token>'.
        Where <token> is the token generated for the user.
        
    Returns:
        A JSON response indicating that the user is logged out.
    """
    try:
        # Delete the user's token to invalidate it
        request.user.auth_token.delete()
        
        # Log out the user
        logout(request)
        
        # Return a success response
        return Response({'success': 'User logged out'}, status=status.HTTP_200_OK)
    except Exception as e:
        # Return an error response if an exception occurs
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)