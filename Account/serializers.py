from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models  import Books, EmailSubscription, Course, Post, Events, Users 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model 
from django.contrib.auth.password_validation import validate_password
User = get_user_model()
import random
import string


    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Custom claims for Staff users
        if isinstance(user, Users):
            token['first_name'] = user.first_name 
        if isinstance(user, Users):
            token['last_name'] = user.last_name
        if isinstance(user, Users):
            token['id'] = user.id
        if isinstance(user, Users):
            token['is_student'] = user.is_student
        if isinstance(user, Users):
            token['is_sales'] = user.is_sales
        if isinstance(user, Users):
            token['is_teacher'] = user.is_teacher

        
        # Custom claims for WebCustomer users
        
        # Add more custom claims as needed
        # ...
        
        return token
'''
class RegisterStaffSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)


    class Meta:
        model = Users
        fields = '__all__'

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = Users.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone = validated_data['phone'],
            birthday = validated_data['birthday'],
            bio = validated_data['bio'],
            extracurricular = validated_data['extracurricular'],
            mda_imageuRL = validated_data['mda_imageUrl'],
            photo_imageUrl = validated_data['photo_imageUrl'],
            school_credentials_imageUrl = validated_data['school_credentials_imageUrl'],
            terms_and_agreement_imageUrl = validated_data['terms_and_agreement_imageUrl']
        )

        user.set_password(validated_data['password'])
        user.is_teacher=True
        user.save()

        return user
'''

class RegisterStaffSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    password2 = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Users
        fields = '__all__'

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password2'):
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        password = ''.join(random.choices(string.digits, k=10))  # Generate random 10-digit password
        validated_data['password'] = password
        validated_data['password2'] = password
        user = Users.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone = validated_data['phone'],
            birthday = validated_data['birthday'],
            bio = validated_data['bio'],
            extracurricular = validated_data['extracurricular'],
            mda_imageUrl = validated_data['mda_imageUrl'],
            photo_imageUrl = validated_data['photo_imageUrl'],
            school_credentials_imageUrl = validated_data['school_credentials_imageUrl'],
            terms_and_agreement_imageUrl = validated_data['terms_and_agreement_imageUrl']
        )
        user.set_password(password)
        user.is_teacher = True
        user.save()
        
        # Handling many-to-many relationship
        
        return user




class RegisterSalesSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    password2 = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Users
        fields = '__all__'

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password2'):
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        password = ''.join(random.choices(string.digits, k=10))  # Generate random 10-digit password
        validated_data['password'] = password
        validated_data['password2'] = password
        user = Users.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone = validated_data['phone'],
            birthday = validated_data['birthday'],
            mda_imageUrl = validated_data['mda_imageUrl'],
            photo_imageUrl = validated_data['photo_imageUrl'],
            terms_and_agreement_imageUrl = validated_data['terms_and_agreement_imageUrl']
        )
        user.set_password(password)
        user.is_sales = True
        user.save()
        
        # Handling many-to-many relationship
        
        return user



class RegisterStudentSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)


    class Meta:
        model = Users
        fields = '__all__'

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = Users.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone = validated_data['phone'], 
            address=validated_data['address'],         
        )

        user.set_password(validated_data['password'])
        user.is_student=True
        user.save()

        return user
    
class UsersSerializer(serializers.ModelSerializer):
    no_of_notifications = serializers.IntegerField()
    associated_events = serializers.SerializerMethodField()

    class Meta:
        model = Users 
        fields = ('first_name', 'last_name', 'email', 'phone', 'gender',
                  'emailfield', 'address', 'is_teacher', 'is_student',
                  'no_of_notifications', 'associated_events')

    def get_associated_events(self, obj):
        events = obj.associated_events.all()
        return [event.title for event in events]
    

class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField()

    def validate_email(self, value):
        # Check if the user exists with the provided email
        try:
            user = Users.objects.get(email=value)
        except Users.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")
        return value

class EmailSubscriptionSerializer(serializers.ModelSerializer):
    class Meta: 
        model = EmailSubscription
        fields = ('__all__')


class PostSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Post
        fields = ('__all__')


class BooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books 
        fields = ('__all__')
class CourseSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Course
        fields =  ('__all__')

class  EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Events
        fields = ('__all__')


from rest_framework import serializers

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users 
        fields =  ['id', 'first_name', 'last_name', 'email',
                   'phone', 'gender', 'emailfield', 'profile_imageId', 
                   'profile_imageUrl', 'background_imageId', 'background_imageUrl',
                   'address', 'Program', 'Term', 
                   'school_credentials_two_imageId', 'school_credentials_three_imageId',
                   'school_credentials_imageUrl', 'school_credentials_two_imageUrl', 
                   'school_credentials_three_imageUrl',
                  ]


class StudentProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users 
        fields =  ['id', 'profile_imageId', 'profile_imageUrl']


from django.conf import settings


class StudentCourseSerializer(serializers.ModelSerializer):
    courses = serializers.SerializerMethodField()
    class Meta:
        model = Users 
        fields = ['id', 'courses']
    def get_courses(self, obj):
        courses_data = []
        for course in obj.courses.all():
            course_data = {
                'id': course._id,
                'title': course.title,
                'Instructor': course.Instructor,
                'language': course.language,
                'content': course.content,
                'courseduration': course.courseduration,
                'streamingtime': course.streamingtime,
                'startingday': course.startingday,
                'endingday': course.endingday,
                'image': self.get_image_url(course.image, self.context['request']),
                'created_at': course.created_at
            }
            courses_data.append(course_data)
        return courses_data

    def get_image_url(self, image, request):
        if image:
            return request.build_absolute_uri(image.url)
        return None

