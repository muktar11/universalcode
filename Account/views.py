import genericpath
from django.shortcuts import render
from requests import request

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import (
    Users, EmailSubscription,
Course, Post, Events,Books, )
from .serializers import (
    MyTokenObtainPairSerializer, RegisterSalesSerializer,
    RegisterStaffSerializer, StudentProfileUpdateSerializer,
    EmailSubscriptionSerializer, RegisterStudentSerializer,
   StudentCourseSerializer, CourseSerializer, PostSerializer, EventsSerializer,
    StudentProfileSerializer, 
    ResetPasswordSerializer, UsersSerializer, BooksSerializer
)
from .permissions import (IsSalesOrReadOnly, IsStudentOrReadOnly, IsWebAdminOrReadOnly, IsTeacherOrReadOnly)
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from rest_framework import generics
from django.db.models import Q
from django.core.exceptions import FieldDoesNotExist
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        user = self.get_user(request.data['email'])  # Get the user based on the provided email

        if isinstance(user, Users):
            response.data['last_name'] = user.last_name
        if isinstance(user, Users):
            response.data['first_name'] = user.first_name
        if isinstance(user, Users):
            response.data['id'] = user.id
        if isinstance(user, Users):
            response.data['is_student'] = user.is_student
        if isinstance(user, Users):
            response.data['is_sales'] = user.is_sales
        if isinstance(user, Users):
            response.data['is_teacher'] = user.is_teacher
        if isinstance(user, Users):
            response.data['isWebAdmin'] = user.isWebAdmin
           

        return response

    def get_user(self, email):
        try:
            return Users.objects.get(email=email)
        except Users.DoesNotExist:
            return None 

from rest_framework import serializers  # Add this import

class RegisterStudentView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterStudentSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()

            # Generate the tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Return the success response with user credentials and access token
            return Response({
                'message': 'User registered successfully',
                'user': RegisterStaffSerializer(user).data,
            }, status=status.HTTP_200_OK)

        except serializers.ValidationError as e:
            # Handle validation errors specifically
            error_messages = {}
            if 'password' in e.detail:
                error_messages['password'] = e.detail['password']
            if 'email' in e.detail:
                error_messages['email'] = e.detail['email']
            if 'phone' in e.detail:
                error_messages['phone'] = e.detail['phone']
            return Response({'errors': error_messages}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Handle other exceptions if any 
            print(f"Unexpected Error: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class RegisterStaffView(APIView):
    def post(self, request):
        serializer = RegisterStaffSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        



class RegisterSalesView(APIView):
    def post(self, request):
        serializer =  RegisterSalesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        




class RegisterEmailView(APIView):
    def post(self, request):
        serializer = EmailSubscriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateStudentView(APIView):
    def put(self, request,pk):
        user = Users.objects.get(_id=pk)
        serializer = UsersSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseRegisterView(APIView):
    permission_classes_by_method = {
        'post': [IsTeacherOrReadOnly],  # Only authenticated students can register for courses
        'get': [IsAuthenticated],  # Require authentication for retrieving course data
    }

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request):
        course = Course.objects.all()
        serializer = CourseSerializer(course, many=True,  context={'request': request})
        return Response(serializer.data)



class CourseFilter(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields =  ['title', 'content', 'Instructor']
       
class EditCourseView(APIView):   
    def get(self, request, pk):
        try:
            course = Course.objects.get(_id=pk)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)  
        serializer = CourseSerializer(course, many=False, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            course = Course.objects.get(_id=pk)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            error_response = {
                "error": "Invalid data",
                "details": serializer.errors
            }
            print(error_response)  # Print the error response
            return Response(error_response, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            course = Course.objects.get(_id=pk)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostRegisterView(APIView):
    permission_classes_by_method = {
        'post': [IsTeacherOrReadOnly],  # Only authenticated students can register for courses
        'get': [IsAuthenticated],  # Require authentication for retrieving course data
    }
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request):
        post = Post.objects.all().order_by('-created_at')
        serializer = PostSerializer(post, many=True,  context={'request': request})
        return Response(serializer.data)        
    
class BooksRegisterView(APIView):
    permission_classes_by_method = {
        'post':[IsWebAdminOrReadOnly],  # Only authenticated students can register for courses
        'get':[IsAuthenticated],  # Require authentication for retrieving course data
    }
    def post(self, request):
        serializer = BooksSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request):
        post = Books.objects.all().order_by('-created_at')
        serializer = BooksSerializer(post, many=True,  context={'request': request})
        return Response(serializer.data)        
    


class EditPostView(APIView):  
    def get(self, request, pk):
        try:
            post = Post.objects.get(_id=pk)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)  
        serializer = PostSerializer(post, many=False, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            post = Post.objects.get(_id=pk)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            error_response = {
                "error": "Invalid data",
                "details": serializer.errors
            }
            print(error_response)  # Print the error response
            return Response(error_response, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            post = Post.objects.get(_id=pk)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


        
class EventListView(APIView):
    permission_classes_by_method = {
        'post': [IsTeacherOrReadOnly],  # Only authenticated students can register for courses
        'get': [IsAuthenticated],  # Require authentication for retrieving course data
    }
        
    def get(self, request):
        events = Events.objects.all()
        serializer = EventsSerializer(events, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = EventsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.shortcuts import get_object_or_404

class EventDetailView(APIView):
    permission_classes_by_method = {
        'post': [IsTeacherOrReadOnly],  # Only authenticated students can register for courses
        'get': [IsAuthenticated],  # Require authentication for retrieving course data
    }
    def get_object(self, pk):
        return get_object_or_404(Events, id=pk)

    def get(self, request, pk):
        event = self.get_object(pk)
        serializer = EventsSerializer(event, context={'request': request})
        return Response(serializer.data)
    


    def put(self, request, pk):
        event = self.get_object(pk)
        serializer = EventsSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        event = self.get_object(pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    



 


class EditEventView(APIView):  
    def get(self, request, pk):
        try:
            event = Events.objects.get(_id=pk)
        except Events.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)  
        serializer = PostSerializer(event, many=False, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            event = Events.objects.get(_id=pk)
        except Events.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = EventsSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            error_response = {
                "error": "Invalid data",
                "details": serializer.errors
            }
            print(error_response)  # Print the error response
            return Response(error_response, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            event = Events.objects.get(_id=pk)
        except Events.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class StudentProfileDetailView(APIView):
    permission_classes_by_method = {
        'post': [IsStudentOrReadOnly],  # Only authenticated students can register for courses
        'get': [IsAuthenticated],  # Require authentication for retrieving course data
    }
    def get_object(self, pk):
        return get_object_or_404(Users, id=pk)

    def get(self, request, pk):
        student = self.get_object(pk)
        serializer = StudentProfileSerializer(student, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        student = self.get_object(pk)
        serializer =  StudentProfileUpdateSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        student = self.get_object(pk)
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class StudentCourseDetailView(APIView):
    permission_classes_by_method = {
        'post': [IsStudentOrReadOnly],  # Only authenticated students can register for courses
        'get': [IsAuthenticated],  # Require authentication for retrieving course data
    }
    def get(self, request, pk):  # Fix the method signature
        student = Users.objects.filter(id=pk)
        serializer = StudentCourseSerializer(student, many=True,  context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        student = self.get_object(pk)
        serializer = StudentCourseSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        student = self.get_object(pk)
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Users, Course
from .serializers import CourseSerializer

class BuyCourseView(APIView):
    permission_classes_by_method = {
        'post': [IsStudentOrReadOnly],  # Only authenticated students can register for courses
        'get': [IsAuthenticated],  # Require authentication for retrieving course data
    }
    def post(self, request, user_id, course_id):
        try:
            user = Users.objects.get(id=user_id)
            course = Course.objects.get(_id=course_id)
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user is approved to buy a course and if they haven't already bought the same course
        if user:
            user.courses.add(course)
            return Response({"message": "Course bought successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User is not eligible to buy the course or already bought it"}, status=status.HTTP_403_FORBIDDEN)

    def get(self, user_id):
        try:
            user = Users.objects.get(id=user_id)
            courses = user.courses.all()
            courses_serializer = CourseSerializer(courses, many=True, context={'request': request})
            return Response(courses_serializer.data)
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class ResetPasswordView(APIView):
    permission_classes_by_method = {
        'post': [IsAuthenticated],  # Only authenticated students can register for courses
        'get': [IsAuthenticated],  # Require authentication for retrieving course data
    }
    serializer_class = ResetPasswordSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            new_password = serializer.validated_data['new_password']

            # Retrieve user
            try:
                user = Users.objects.get(email=email)
            except Users.DoesNotExist:
                return Response({"error": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

            # Generate and set the new password
            user.set_password(new_password)
            user.save()

            # Send email notification
          #  subject = 'Your password has been reset'
          #  message = render_to_string('password_reset_email.html', {
          #      'user': user,
          #  })
          #  email = EmailMessage(subject, message, to=[user.email])
          #  email.send()

            return Response({"success": "Password reset successful."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class StudentUserView(APIView):
    permission_classes_by_method = {
        'post': [IsAuthenticated],  # Only authenticated students can register for courses
        'get': [IsAuthenticated],  # Require authentication for retrieving course data
    }
    def get(self, request):  # Need to include 'request' as the first parameter
        users = Users.objects.filter(is_student=True)
        user_serializer = UsersSerializer(users, many=True)
        return Response(user_serializer.data)  # Accessing data attribute of the serializer

             
class StaffUserView(APIView):
    permission_classes_by_method = {
        'post': [IsAuthenticated],  # Only authenticated students can register for courses
        'get': [IsAuthenticated],  # Require authentication for retrieving course data
    }
    def get(self, request):  
        try:
            users = Users.objects.filter(is_teacher=True)  # Renamed 'user' to 'users' for better readability
            user_serializer = UsersSerializer(users, many=True)
            return Response(user_serializer.data)  # Accessing 'data' attribute of the serializer
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
class SalesUserView(APIView):
    permission_classes_by_method = {
        'post': [IsAuthenticated],  # Only authenticated students can register for courses
        'get': [IsAuthenticated],  # Require authentication for retrieving course data
    }
    def get(self, request):  
        try:
            users = Users.objects.filter(is_sales=True)  # Renamed 'user' to 'users' for better readability
            user_serializer = UsersSerializer(users, many=True)
            return Response(user_serializer.data)  # Accessing 'data' attribute of the serializer
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)