from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    originalPrice = serializers.DecimalField(source='original_price', max_digits=10, decimal_places=2, required=False, allow_null=True)
    reviewsCount = serializers.IntegerField(source='reviews_count', required=False)
    fatContent = serializers.CharField(source='fat_content', required=False, allow_blank=True, allow_null=True)
    shelfLife = serializers.CharField(source='shelf_life', required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'category', 'price', 'originalPrice', 'discount',
            'unit', 'rating', 'reviewsCount', 'description', 'image',
            'stock', 'fatContent', 'shelfLife', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
