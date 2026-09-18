from django.urls import path

try:
    from .views import ProductViewSet
    urlpatterns = [
        path('', ProductViewSet.as_view({'get': 'list', 'post': 'create'}), name='product-list'),
        path('<int:pk>/', ProductViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='product-detail'),
    ]
except ImportError:
    from .views import product_list_api, product_detail_api
    urlpatterns = [
        path('', product_list_api, name='product-list'),
        path('<int:pk>/', product_detail_api, name='product-detail'),
    ]