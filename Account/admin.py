from django.contrib import admin
# Register your models here.
from .models import( 
                    Users, Course, EmailSubscription, Post, Events, 
                    CoursePurchaseRequest,
                    LNMOnline, CouponPurchase, CoursePurchaseCoupon,
                    studentpurchasedcourses, Video, EmailSubscription, Post, Books) 
admin.site.register(Users)
admin.site.register(Course)
admin.site.register(EmailSubscription)
admin.site.register(Post)
admin.site.register(Events)
admin.site.register(CoursePurchaseRequest)
admin.site.register(LNMOnline)
admin.site.register(CouponPurchase)
admin.site.register(CoursePurchaseCoupon)
admin.site.register(studentpurchasedcourses)
admin.site.register(Video)
admin.site.register(Books)


