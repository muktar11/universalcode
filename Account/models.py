from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import os 
from django.utils.crypto import get_random_string
from phonenumber_field.modelfields import PhoneNumberField
import random
USER_TYPE = (("HOD", "HOD"), ( "Staff", "Staff"), ("Student", "Student"))
GENDER = [("M", "Male"), ("F", "Female")]

PROGRAM = (("All", "All"), ("BL", "BL"),("BE", "BE"),("BP", "BP"), ("BCS", "BCS"))

AUDIENCE_CHOICES = [
        ("WebDesign", "WebDesign"),
        ("GraphicsDesign", "GraphicsDesign"),
        ("UI/UX", "UI/UX"),
        ("StoreKeeping", "StoreKeeping"),
        ("DigitalExplorer", "DigitalExplorer"),
        ("WebDevelopment", "WebDevelopment"),
        ("Coding", "Coding"),
        ("TradingTitans", "TradingTitans"),
        ("PhotoshopProdigy", "PhotoshopProdigy"),
        ("CulinaryCanvas", "CulinaryCanvas"),
        ("SocialMediaMaverick", "SocialMediaMaverick"),
        ("FitProInstructor", "FitProInstructor"),
        ("NumberCruncher", "NumberCruncher"),
        ("WeddingWizard", "WeddingWizard"),
        ("WordPress Wiz", "WordPress Wiz"),
        ("Influence Igniter", "Influence Igniter"),
        ("Stocks Savvy", "Stocks Savvy"),
        ("E-commerce Expertise", "E-commerce Expertise"),
        ("Digital Explorer", "Digital Explorer"),
    ]
PROGRAM = (("All", "All"),
            ("BL", "BL"),
            ("BE", "BE"),
            ("BP", "BP"), 
            ("BCS", "BCS"))



def school_file_path(instance, filename):
    # Get the file extension
    ext = filename.split('.')[-1]
    # Generate a new filename
    filename = f'{instance.email}.{ext}'
    # Return the file path
    return os.path.join('uploads', 'cred1', filename)

def school_file_path2(instance, filename):
    # Get the file extension
    ext = filename.split('.')[-1]
    # Generate a new filename
    filename = f'{instance.email}.{ext}'
    # Return the file path
    return os.path.join('uploads', 'cred2', filename)

def school_file_path3(instance, filename):
    # Get the file extension
    ext = filename.split('.')[-1]
    # Generate a new filename
    filename = f'{instance.email}.{ext}'
    # Return the file path
    return os.path.join('uploads', 'cred3', filename)

def course_file_path(instance, filename):
    # Get the file extension
    ext = filename.split('.')[-1]
    # Generate a new filename
    filename = f'{instance._id}.{ext}'
    # Return the file path
    return os.path.join('uploads', 'course', filename)


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        
        email = self.normalize_email(email)
        
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(email, password, **extra_fields)
    


class Course(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    Instructor = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    language = models.CharField(max_length=255, blank=True, null=True)
    content = models.CharField(max_length=255, blank=True, null=True)
    courseduration = models.CharField(max_length=255, blank=True, null=True)
    streamingtime = models.CharField(max_length=255, blank=True, null=True)
    startingday = models.CharField(max_length=255, blank=True, null=True)
    endingday = models.CharField(max_length=255, blank=True, null=True)
    image =  models.FileField(upload_to=course_file_path, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Users(AbstractBaseUser, PermissionsMixin):
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name='custom_user_groups'
    )

    # Add related_name to user_permissions field
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name='custom_user_permissions'
    )
    email = models.EmailField(unique=True, max_length=254)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    phone = PhoneNumberField(null=False, blank=False, unique=True)
    gender = models.CharField(max_length=1, blank=True, null=True, choices=GENDER)
    birthday = models.CharField(max_length=255, blank=True, null=True)
    bio = models.CharField(max_length=255, blank=True, null=True)
    extracurricular = models.CharField(max_length=255, blank=True, null=True)
    mda_imageUrl = models.FileField(max_length=1000, blank=True, null=True)
    photo_imageUrl = models.ImageField(blank=True, null=True)
    school_credentials_imageUrl = models.FileField(blank=True, null=True)
    terms_and_agreement_imageUrl = models.FileField(blank=True, null=True)
    emailfield = models.CharField(max_length=255, blank=True, null=True, unique=True)
    profile_imageId =  models.CharField(max_length=255, blank=True, null=True)
    profile_imageUrl = models.ImageField(max_length=1000, blank=True, null=True)
    background_imageId =  models.CharField(max_length=255, blank=True, null=True)
    background_imageUrl = models.ImageField(max_length=1000, blank=True, null=True)
    address = models.TextField()
    Program = models.CharField(max_length=255, blank=True, null=True)
    my_courses = models.CharField(max_length=50, choices=AUDIENCE_CHOICES)
    courses = models.ManyToManyField(Course, blank=True)  # Change ForeignKey to ManyToManyField
    Term = models.CharField(max_length=255, blank=True, null=True)
    school_credentials_two_imageId = models.CharField(max_length=255, blank=True, null=True)
    school_credentials_two_imageUrl = models.CharField(max_length=1000, blank=True, null=True)
    school_credentials_three_imageId = models.CharField(max_length=255, blank=True, null=True)
    school_credentials_three_imageUrl = models.CharField(max_length=1000, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_notification = models.BooleanField(default=False)
    no_of_notifications = models.IntegerField(default=0)
    is_accepted = models.BooleanField(default=False)
    is_first_time = models.BooleanField(default=True)
    is_monthly_paid = models.BooleanField(default=False)
    is_registeration_paid = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    is_sales = models.BooleanField(default=False)
    isWebAdmin = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    def save(self, *args, **kwargs):
        # Generate emailfield based on first_name, last_name if it's null or empty
        if not self.emailfield and (self.first_name or self.last_name):
            random_digits = ''.join(random.choices('0123456789', k=2))
            self.emailfield = f"{self.first_name.lower()}.{self.last_name.lower()}.{random_digits}@universal.edu"


        super().save(*args, **kwargs)



class EmailSubscription(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    email = models.EmailField(max_length=255, blank=True, null=True)


class Post(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    image =  models.ImageField(max_length=1000, blank=True, null=True)
    caption = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Books(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    Book_imageUrl = models.FileField(max_length=1000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    caption = models.CharField(max_length=255, blank=True, null=True)
    audience = models.CharField(max_length=255, blank=True, null=True)
    
from django.db import transaction

class Events(models.Model):
    title = models.CharField(max_length=100, verbose_name="Title for your event")
    startingtime = models.CharField(max_length=120)
    endtime = models.CharField(max_length=120)
    description = models.TextField(blank=True, null=True)
    startingday = models.DateField(blank=False, null=True)
    endingday = models.DateField(blank=False, null=True)
    audience = models.CharField(max_length=50, choices=AUDIENCE_CHOICES)
    associated_users = models.ManyToManyField(Users, related_name='associated_events', blank=True)

    def save(self, *args, **kwargs):
        with transaction.atomic():
            super().save(*args, **kwargs)
            
            # Get users based on audience and my_courses
            users = Users.objects.filter(my_courses=self.audience)
            # Add associated users to the event
            self.associated_users.add(*users)

            # Update is_notification and increment no_of_notifications for each user
            for user in users:
                user.is_notification = True
                user.no_of_notifications += 1
                user.save(update_fields=['is_notification', 'no_of_notifications'])
