import genericpath
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.views import View
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
    ResetPasswordSerializer, UsersSerializer, BooksSerializer, StudentEventSerializer,
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
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method in ['PUT', 'POST', 'DELETE']:
            return [AllowAny()]  # Only allow teachers to register
        else:
            return super().get_permissions()   
        
    def post(self, request):
        serializer = RegisterStudentSerializer(data=request.data) 
        phone_number = request.data.get('phone', '')  # Get the phone number from the request data
        print("Phone Number:", phone_number)  # Print the phone number
        if serializer.is_valid():
            user_data = serializer.save()
            user = user_data['user']  # Get the user instance
            response_data = {
                "message": "User registered successfully",
                "refresh": user_data['refresh'],
                "access": user_data['access'],
                "id": user.id,
                "is_student": user.is_student,
                "is_sales": user.is_sales,
                "is_teacher": user.is_teacher,
                "isWebAdmin": user.isWebAdmin
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


class ConfirmRegistrationView(View):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions() 
        
    def get(self, request, uidb64, token):
        self.check_permissions(request)
        user = RegisterStudentSerializer.confirm_registration(uidb64, token)
        if user:
            # Redirect to the sign-in page upon successful confirmation
            return redirect(reverse_lazy('sign-in'))
        else:
            return HttpResponse("Invalid confirmation link.")  

        
        
class RegisterStaffView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions() 
        
    def post(self, request):
        self.check_permissions(request)
        serializer = RegisterStaffSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        



class RegisterSalesView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions() 
        
    def post(self, request):
        self.check_permissions(request)
        serializer =  RegisterSalesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
from django.core.exceptions import MultipleObjectsReturned
class RetrieveSalesView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions()
        
    def get(self, request, pk):
        try:
            self.check_permissions(request)
            users = Users.objects.filter(sales_person_id=pk)
            serializer = UsersSerializer(users, many=True, context={'request': request})
            return Response(serializer.data)
        except Users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class RegisterEmailView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions()
        
    def post(self, request):
        self.check_permissions(request)
        serializer = EmailSubscriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateStudentView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions() 
        
    def put(self, request,pk):
        self.check_permissions(request)
        user = Users.objects.get(_id=pk)
        serializer = UsersSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseRegisterView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions()


    def post(self, request):
        self.check_permissions(request)
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request):
        self.check_permissions(request)
        course = Course.objects.all()
        serializer = CourseSerializer(course, many=True,  context={'request': request})
        return Response(serializer.data)



class CourseFilter(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields =  ['title', 'content', 'Instructor']

class StudentEventView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions()
        
    def get(self, request, pk):
        try:
            self.check_permissions(request)
            event = Users.objects.get(id=pk)
        except Users.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = StudentEventSerializer(event, many=False, context={'request': request})
        return Response(serializer.data)
    
class EditCourseView(APIView):   
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions()
        
    def get(self, request, pk):
        try:
            self.check_permissions(request)
            course = Course.objects.get(_id=pk)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)  
        serializer = CourseSerializer(course, many=False, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            self.check_permissions(request)
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
            self.check_permissions(request)
            course = Course.objects.get(_id=pk)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostRegisterView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions()  # Use default permissions for other methods
    def post(self, request):
        self.check_permissions(request)
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request):
        self.check_permissions(request)
        post = Post.objects.all().order_by('-created_at')
        serializer = PostSerializer(post, many=True,  context={'request': request})
        return Response(serializer.data)        
    

class PostRegisterView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions()

    def post(self, request):
        self.check_permissions(request)
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            error_response = {
                "error": "Invalid data",
                "details": serializer.errors
            }
            print(error_response)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        self.check_permissions(request)
        post = Post.objects.all().order_by('-created_at')
        serializer = PostSerializer(post, many=True, context={'request': request})
        return Response(serializer.data)
    
class BooksRegisterView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions()  # Use default permissions for other methods
        
    def post(self, request):
        self.check_permissions(request)
        serializer = BooksSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request):
        self.check_permissions(request)
        post = Books.objects.all().order_by('-created_at')
        serializer = BooksSerializer(post, many=True,  context={'request': request})
        return Response(serializer.data)        
    


class EditPostView(APIView):  

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions() 
        
    def get(self, request, pk):
        try:
            self.check_permissions(request)
            post = Post.objects.get(_id=pk)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)  
        serializer = PostSerializer(post, many=False, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            self.check_permissions(request)
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
            self.check_permissions(request)
            post = Post.objects.get(_id=pk)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


        
class EventListView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions()  # Use default permissions for other methods
        
    def get(self, request):
        self.check_permissions(request)
        events = Events.objects.all().order_by('-created_at')
        serializer = EventsSerializer(events, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        self.check_permissions(request)
        serializer = EventsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.shortcuts import get_object_or_404


        
class EventDetailView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions() 
        
    def get_object(self, pk):
        return get_object_or_404(Events, id=pk)

    def get(self, request, pk):
        self.check_permissions(request)
        event = self.get_object(pk)
        serializer = EventsSerializer(event, context={'request': request})
        return Response(serializer.data)
    


    def put(self, request, pk):
        self.check_permissions(request)
        event = self.get_object(pk)
        serializer = EventsSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        self.check_permissions(request)
        event = self.get_object(pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

    def get_queryset(self):
        # Retrieve queryset ordered by created_at in descending order
        return Events.objects.order_by('-created_at')


 


class EditEventView(APIView):  
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions() 
        
    def get(self, request, pk):
        try:
            self.check_permissions(request)
            event = Events.objects.get(_id=pk)
        except Events.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)  
        serializer = EventsSerializer(event, many=False, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            self.check_permissions(request)
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
            self.check_permissions(request)
            event = Events.objects.get(_id=pk)
        except Events.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def get_queryset(self):
        # Retrieve queryset ordered by created_at in descending order
        return Events.objects.order_by('-created_at')

class StudentProfileDetailView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions() 
        
    def get_object(self, pk):
        return get_object_or_404(Users, id=pk)

    def get(self, request, pk):
        self.check_permissions(request)
        student = self.get_object(pk)
        serializer = StudentProfileSerializer(student, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        self.check_permissions(request)
        student = self.get_object(pk)
        serializer =  StudentProfileUpdateSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        self.check_permissions(request)
        student = self.get_object(pk)
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class StudentCourseDetailView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions()  
        
    def get(self, request, pk):  # Fix the method signature 
        self.check_permissions(request)
        student = Users.objects.filter(id=pk)
        serializer = StudentCourseSerializer(student, many=True,  context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        self.check_permissions(request)
        student = self.get_object(pk)
        serializer = StudentCourseSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        self.check_permissions(request)
        student = self.get_object(pk)
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Users, Course
from .serializers import CourseSerializer

class BuyCourseView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions() 
        
    def post(self, request, user_id, course_id):
        try:
            self.check_permissions(request)
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
            self.check_permissions(request)
            user = Users.objects.get(id=user_id)
            courses = user.courses.all()
            courses_serializer = CourseSerializer(courses, many=True, context={'request': request})
            return Response(courses_serializer.data)
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class ResetPasswordView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions() 
        
    serializer_class = ResetPasswordSerializer

    def post(self, request):
        self.check_permissions(request)
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
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions()
        
    
    def get(self, request):  # Need to include 'request' as the first parameter
        users = Users.objects.filter(is_student=True)
        user_serializer = UsersSerializer(users, many=True)
        return Response(user_serializer.data)  # Accessing data attribute of the serializer

             
class StaffUserView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions() 
        
    def get(self, request):  
        try:
            self.check_permissions(request)
            users = Users.objects.filter(is_teacher=True)  # Renamed 'user' to 'users' for better readability
            user_serializer = UsersSerializer(users, many=True)
            return Response(user_serializer.data)  # Accessing 'data' attribute of the serializer
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
class SalesUserView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # Require authentication for retrieving course data
        elif self.request.method == 'PUT':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'POST':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        elif self.request.method == 'DELETE':
            return [IsWebAdminOrReadOnly()]  # Only allow teachers to register
        else:
            return super().get_permissions() 
        
    def get(self, request):  
        try:
            self.check_permissions(request)
            users = Users.objects.filter(is_sales=True)  # Renamed 'user' to 'users' for better readability
            user_serializer = UsersSerializer(users, many=True)
            return Response(user_serializer.data)  # Accessing 'data' attribute of the serializer
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)