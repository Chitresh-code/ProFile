# Generated by Django 5.1.5 on 2025-01-26 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("pipeline", "0002_alter_user_detail_user"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user_detail",
            name="address",
        ),
        migrations.RemoveField(
            model_name="user_detail",
            name="date_of_birth",
        ),
        migrations.RemoveField(
            model_name="user_detail",
            name="phone_number",
        ),
        migrations.RemoveField(
            model_name="user_detail",
            name="profile_picture",
        ),
        migrations.AddField(
            model_name="user",
            name="address",
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="date_of_birth",
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="phone_number",
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="profile_picture",
            field=models.ImageField(null=True, upload_to="profile_pictures/"),
        ),
        migrations.AddField(
            model_name="user_detail",
            name="name",
            field=models.CharField(max_length=100, null=True),
        ),
    ]
