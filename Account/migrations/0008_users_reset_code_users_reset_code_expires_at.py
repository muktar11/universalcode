# Generated by Django 5.0.4 on 2024-06-07 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0007_remove_users_school_credentials_three_imageid_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='reset_code',
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
        migrations.AddField(
            model_name='users',
            name='reset_code_expires_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]