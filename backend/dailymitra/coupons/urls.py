from django.urls import path
from . import views

app_name = 'coupons'

urlpatterns = [
    path('', views.CouponListCreateView.as_view(), name='coupon-list'),
    path('active/', views.ActiveCouponListView.as_view(), name='active-coupons'),
    path('validate/', views.validate_coupon, name='validate-coupon'),
    path('my-usage/', views.CouponUsageListView.as_view(), name='my-coupon-usage'),
    path('admin/usage/', views.AdminCouponUsageListView.as_view(), name='admin-coupon-usage'),
    path('<str:code>/', views.CouponDetailView.as_view(), name='coupon-detail'),
]