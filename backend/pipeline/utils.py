from pipeline.models import User

"""
This file contains utility functions that are used in the pipeline.
Utility functions are used to perform common tasks that are not directly related to the models or views.
"""

def create_username(first_name, last_name):
    """
    Function that creates a random username based on the first name and last name of the user.
    It checks if the username already exists in the database and appends a number to the username if it already exists.
    
    Args:
        first_name: The first name of the user.
        last_name: The last name of the user.
        
    Returns:
        A unique username based on the first name and last name of the user.
    """
    # Generate a username based on the first name and last name
    username = first_name.lower() + '.' + last_name.lower()
    
    count = 0
    # Check if the username already exists in the database
    while User.objects.filter(username=username).exists():
        # Append a number to the username if it already exists
        username = first_name.lower() + '.' + last_name.lower() + str(count)
        count += 1
    
    # Return the unique username
    return username