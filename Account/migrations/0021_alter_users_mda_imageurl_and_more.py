# Generated by Django 4.2.3 on 2024-03-04 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0020_remove_users_school_credentials_imageid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='mda_imageUrl',
            field=models.FileField(blank=True, max_length=1000, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='users',
            name='school_credentials_imageUrl',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='users',
            name='terms_and_agreement_imageUrl',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]
