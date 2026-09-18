import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

try:
    from rest_framework import viewsets, status
    from rest_framework.response import Response
    from rest_framework.permissions import AllowAny
    HAS_DRF = True
except ImportError:
    HAS_DRF = False

from .models import Product
from .serializers import ProductSerializer

DEFAULT_PRODUCTS = [
    {
        "id": 1,
        "title": "Farm Fresh Organic Cow Milk",
        "category": "Milk & Dairy",
        "price": 68,
        "originalPrice": 75,
        "discount": 10,
        "unit": "1 Litre Pouch",
        "rating": 4.9,
        "reviewsCount": 340,
        "description": "Chilled, non-pasteurized organic cow milk straight from verified local dairy farms.",
        "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80",
        "stock": 50,
        "fatContent": "3.5%",
        "shelfLife": "2 Days"
    },
    {
        "id": 2,
        "title": "A2 Vedic Desi Gir Cow Ghee",
        "category": "Ghee & Butter",
        "price": 850,
        "originalPrice": 999,
        "discount": 15,
        "unit": "500 ml Glass Jar",
        "rating": 4.95,
        "reviewsCount": 180,
        "description": "Made using the traditional Bilona method from pure Gir Cow A2 milk curd churned to perfection.",
        "image": "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=500&auto=format&fit=crop&q=80",
        "stock": 25,
        "shelfLife": "12 Months"
    },
    {
        "id": 3,
        "title": "Fresh Malai Paneer (Cottage Cheese)",
        "category": "Paneer & Curd",
        "price": 99,
        "unit": "200g Pack",
        "rating": 4.8,
        "reviewsCount": 210,
        "description": "Soft, melt-in-mouth malai paneer crafted from whole milk curdling.",
        "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80",
        "stock": 40,
        "shelfLife": "5 Days"
    },
    {
        "id": 4,
        "title": "Thick Creamy Set Curd (Dahi)",
        "category": "Paneer & Curd",
        "price": 45,
        "unit": "400g Tub",
        "rating": 4.7,
        "reviewsCount": 150,
        "description": "Fresh creamy dahi fermented with probiotic live cultures.",
        "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80",
        "stock": 60,
        "shelfLife": "4 Days"
    }
]

def seed_default_products_if_empty():
    if not Product.objects.exists():
        for item in DEFAULT_PRODUCTS:
            Product.objects.create(
                id=item['id'],
                title=item['title'],
                category=item['category'],
                price=item['price'],
                original_price=item.get('originalPrice'),
                discount=item.get('discount', 0),
                unit=item['unit'],
                rating=item['rating'],
                reviews_count=item['reviewsCount'],
                description=item['description'],
                image=item['image'],
                stock=item['stock']
            )

if HAS_DRF:
    class ProductViewSet(viewsets.ModelViewSet):
        queryset = Product.objects.all()
        serializer_class = ProductSerializer
        permission_classes = [AllowAny]

        def get_queryset(self):
            seed_default_products_if_empty()
            qs = Product.objects.all().order_by('-id')
            category = self.request.query_params.get('category')
            search = self.request.query_params.get('search')

            if category and category != 'All' and category != 'All Categories':
                qs = qs.filter(category=category)
            if search:
                qs = qs.filter(title__icontains=search)
            return qs

        def create(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        def update(self, request, *args, **kwargs):
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)

        def destroy(self, request, *args, **kwargs):
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_24_NO_CONTENT if hasattr(status, 'HTTP_204_NO_CONTENT') else status.HTTP_204_NO_CONTENT)

else:
    def product_to_dict(p):
        return {
            'id': p.id,
            'title': p.title,
            'category': p.category,
            'price': float(p.price),
            'originalPrice': float(p.original_price) if p.original_price else None,
            'discount': p.discount,
            'unit': p.unit,
            'rating': p.rating,
            'reviewsCount': p.reviews_count,
            'description': p.description,
            'image': p.image,
            'stock': p.stock,
            'fatContent': p.fat_content,
            'shelfLife': p.shelf_life
        }

    @csrf_exempt
    def product_list_api(request):
        seed_default_products_if_empty()
        if request.method == 'GET':
            qs = Product.objects.all().order_by('-id')
            category = request.GET.get('category')
            search = request.GET.get('search')
            if category and category != 'All' and category != 'All Categories':
                qs = qs.filter(category=category)
            if search:
                qs = qs.filter(title__icontains=search)
            return JsonResponse([product_to_dict(p) for p in qs], safe=False)

        elif request.method == 'POST':
            data = json.loads(request.body or '{}')
            p = Product.objects.create(
                title=data.get('title', 'New Product'),
                category=data.get('category', 'Milk & Dairy'),
                price=data.get('price', 100),
                original_price=data.get('originalPrice'),
                discount=data.get('discount', 0),
                unit=data.get('unit', '1000gm'),
                stock=data.get('stock', 50),
                image=data.get('image', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80'),
                description=data.get('description', '')
            )
            return JsonResponse(product_to_dict(p), status=201)

        return JsonResponse({'error': 'Method not allowed'}, status=405)

    @csrf_exempt
    def product_detail_api(request, pk):
        seed_default_products_if_empty()
        try:
            p = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return JsonResponse({'error': 'Product not found'}, status=404)

        if request.method == 'GET':
            return JsonResponse(product_to_dict(p))

        elif request.method in ['PUT', 'PATCH']:
            data = json.loads(request.body or '{}')
            if 'title' in data: p.title = data['title']
            if 'category' in data: p.category = data['category']
            if 'price' in data: p.price = data['price']
            if 'originalPrice' in data: p.original_price = data['originalPrice']
            if 'discount' in data: p.discount = data['discount']
            if 'unit' in data: p.unit = data['unit']
            if 'stock' in data: p.stock = data['stock']
            if 'image' in data: p.image = data['image']
            if 'description' in data: p.description = data['description']
            p.save()
            return JsonResponse(product_to_dict(p))

        elif request.method == 'DELETE':
            p.delete()
            return JsonResponse({'success': True}, status=200)

        return JsonResponse({'error': 'Method not allowed'}, status=405)