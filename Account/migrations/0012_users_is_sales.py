# Generated by Django 4.2.3 on 2024-02-22 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0011_users_is_student_users_is_teacher_alter_course_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='is_sales',
            field=models.BooleanField(default=False),
        ),
    ]
