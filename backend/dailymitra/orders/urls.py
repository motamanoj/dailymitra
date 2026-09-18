from django.urls import path
from . import views

urlpatterns = [
    path('', views.orders_list_create, name='orders-list-create'),
    path('<str:order_id>/track/', views.track_order, name='track-order'),
]