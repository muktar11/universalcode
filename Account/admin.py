from django.contrib import admin

# Register your models here.
from .models import Users, Course, EmailSubscription, Post, Events

admin.site.register(Users)
admin.site.register(Course)
admin.site.register(EmailSubscription)
admin.site.register(Post)
admin.site.register(Events)
