# Generated by Django 4.2.3 on 2024-03-04 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0019_alter_users_photo_imageurl_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='school_credentials_imageId',
        ),
        migrations.AlterField(
            model_name='users',
            name='school_credentials_imageUrl',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
