from django.contrib import admin
from .models import User, User_Detail, Resume, Resume_Template

"""
Here we register the models in the Django admin panel.
The Django admin panel is a powerful tool that allows us to manage our database models.
We can add, edit, and delete records from the database using the admin panel.
If we want to customize the admin panel, we can create a custom admin class for each model.
We can also create custom admin actions to perform bulk operations on the database.
If we don't add a model to the admin panel, we won't be able to manage it using the admin panel.
"""

# Registering the model Users
admin.site.register(User)


# In the admin the user details are displayed as a table with the following columns: id, user, name
class UserDetailAdmin(admin.ModelAdmin):
    list_display = ('user_details_id', 'user', 'name')

# Registering the model User_Details
admin.site.register(User_Detail, UserDetailAdmin)


# Registering the model Resumes
admin.site.register(Resume)

# Registering the model Resume_Templates
admin.site.register(Resume_Template)