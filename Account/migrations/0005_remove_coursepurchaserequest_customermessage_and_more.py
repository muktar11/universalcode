# Generated by Django 5.0.4 on 2024-05-20 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0004_books_course_id_video_course_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coursepurchaserequest',
            name='CustomerMessage',
        ),
        migrations.RemoveField(
            model_name='coursepurchaserequest',
            name='ResponseDescription',
        ),
        migrations.AddField(
            model_name='coursepurchaserequest',
            name='is_approved',
            field=models.BooleanField(default=False),
        ),
    ]
