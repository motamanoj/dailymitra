import json
from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='order_id', read_only=True)
    customer = serializers.CharField(source='customer_name', required=False)
    items = serializers.SerializerMethodField()
    paymentMethod = serializers.CharField(source='payment_method', required=False)
    deliverySlot = serializers.CharField(source='delivery_slot', required=False)
    date = serializers.DateTimeField(source='created_at', format="%d %b %Y", read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_id', 'customer', 'status', 'total', 'items_count',
            'eta', 'address', 'paymentMethod', 'deliverySlot', 'items', 'date', 'created_at'
        ]
        read_only_fields = ['id', 'date', 'created_at']

    def get_items(self, obj):
        try:
            return json.loads(obj.items_json)
        except Exception:
            return []

class OrderListSerializer(OrderSerializer):
    pass

class OrderDetailSerializer(OrderSerializer):
    pass