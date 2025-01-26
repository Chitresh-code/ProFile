from rest_framework import serializers
from .models import User, User_Detail, Resume, Resume_Template

"""
This file contains the serializers for the models in the application.
Serializers are used to convert complex data types like querysets and model instances to native Python data types that can be easily rendered into JSON, XML, or other content types.
We can also use serializers to convert complex data types back into querysets or model instances.
Serializers are used in Django REST framework to serialize and deserialize data.
"""
        
class UserRegisterationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'first_name', 'last_name']
        
class User_DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Detail
        fields = '__all__'
        
class UserSerializer(serializers.ModelSerializer):
    user_details = User_DetailSerializer(source='user_detail_set', many=True, read_only=True)
    class Meta:
        model = User
        fields = ['user_id', 'email', 'username', 'first_name', 'last_name', 'resume_created', 'profile_picture', 'address', 'phone_number', 'date_of_birth', 'user_details']
        
class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'
        
class Resume_TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume_Template
        fields = '__all__'