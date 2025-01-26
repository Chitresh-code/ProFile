from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    """
    This model represents the users of the application.
    It is used for authentication and authorization purposes.
    """
    user_id = models.AutoField(primary_key=True, auto_created=True)
    email = models.CharField(max_length=100, unique=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, null=True)
    resume_created = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True)
    address = models.CharField(max_length=100, null=True)
    phone_number = models.CharField(max_length=100, null=True)
    date_of_birth = models.DateField(null=True)
    
    def __str__(self):
        return self.username
    
class Resume(models.Model):
    """
    This model represents the resumes created by the users.
    It is linked to the Users model using a foreign key.
    Each time a user creates a resume, the resume_created field in the Users model is incremented.
    
    TODO: resume_created field can be used to implement a pro feature where users can create a limited number of resumes.
    """
    resume_id = models.AutoField(primary_key=True, auto_created=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resume_name = models.CharField(max_length=100)
    content = models.JSONField()
    ai_score = models.FloatField()
    template_id = models.IntegerField(null=True)
    resume_file = models.FileField(upload_to='resumes/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.resume_name
    
    def increment_resume_created(self):
        self.user.resume_created += 1
        self.user.save()
    
class Resume_Template(models.Model):
    """
    This model represents the resume templates available in the application.
    It is used to store the template content and the template file.
    
    TODO: Currently the uploaded_by field is not used, but it can be used to implement a feature where users can upload their own templates in a pro plan.
    """
    template_id = models.AutoField(primary_key=True, auto_created=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    template_name = models.CharField(max_length=100)
    template_description = models.CharField(max_length=100)
    supports_image = models.BooleanField()
    template_content = models.JSONField()
    template_file = models.FileField(upload_to='templates/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.template_name
    
class User_Detail(models.Model):
    """
    This model represents the details of the users.
    It will be used to store additional information about the users, such as their profile picture, address, phone number, etc.
    This will be available in the user profile page.
    This will save time for the users as they don't have to enter this information every time they create a resume.
    
    TODO: In a pro feature, we can link the github and linkedin profiles to add projects, work experience, etc. automatically.
    """
    user_details_id = models.AutoField(primary_key=True, auto_created=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_detail_set')
    name = models.CharField(max_length=100, null=True)
    profile_urls = models.JSONField(null=True)
    description = models.TextField(null=True)
    work_experience = models.JSONField(null=True)
    education = models.JSONField(null=True)
    skills = models.JSONField(null=True)
    certifications = models.JSONField(null=True)
    projects = models.JSONField(null=True)
    awards_and_honors = models.JSONField(null=True)
    volunteer_experience = models.JSONField(null=True)
    references = models.JSONField(null=True)
    
    def __str__(self):
        return self.user.username