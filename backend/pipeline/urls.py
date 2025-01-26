from django.urls import path
from .views import register, login_view, logout_view, get_user_profile, edit_user_details

"""
The Django URL dispatcher is a powerful tool that allows us to map URLs to views.
We can define URL patterns using the path() function.
Each URL pattern is associated with a view function.
When a user requests a URL, Django uses the URL patterns to determine which view function to call.
"""

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('view-profile/', get_user_profile, name='view-profile'),
    path('edit-profile/', edit_user_details, name='edit-profile'),
]
