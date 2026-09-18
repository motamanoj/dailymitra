from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='account-login'),
    path('admin/login/', views.admin_login_view, name='admin-login'),
    path('register/', views.register_view, name='account-register'),
    path('profile/', views.profile_view, name='account-profile'),
]