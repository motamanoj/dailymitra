import json
import random
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer

DEFAULT_ORDERS = [
    {
        'id': 'ORD-89241',
        'customer': 'Rahul Sharma',
        'date': '16 Sep 2026',
        'status': 'Out for Delivery',
        'total': 136,
        'itemsCount': 2,
        'eta': '6:45 AM Today',
        'paymentMethod': 'UPI (GPay)',
        'deliverySlot': 'Morning (6:00 AM - 7:00 AM)',
        'address': 'Flat 402, Sunshine Apartments, Bengaluru',
        'items': [{'name': 'Farm Fresh Organic Cow Milk', 'qty': 2, 'price': 68}]
    },
    {
        'id': 'ORD-89102',
        'customer': 'Ananya Verma',
        'date': '15 Sep 2026',
        'status': 'Delivered',
        'total': 970,
        'itemsCount': 2,
        'eta': '6:30 AM',
        'paymentMethod': 'Cash on Delivery',
        'deliverySlot': 'Morning (6:00 AM - 7:00 AM)',
        'address': 'Flat 402, Sunshine Apartments, Bengaluru',
        'items': [
            {'name': 'A2 Vedic Desi Gir Cow Ghee', 'qty': 1, 'price': 850},
            {'name': 'Fresh Malai Paneer', 'qty': 1, 'price': 120}
        ]
    }
]

def seed_default_orders_if_empty():
    if not Order.objects.exists():
        for o in DEFAULT_ORDERS:
            Order.objects.create(
                order_id=o['id'],
                customer_name=o.get('customer', 'Rahul Sharma'),
                status=o.get('status', 'Out for Delivery'),
                total=o.get('total', 100),
                items_count=o.get('itemsCount', 1),
                eta=o.get('eta', '6:45 AM Today'),
                address=o.get('address', 'Bengaluru'),
                payment_method=o.get('paymentMethod', 'Cash on Delivery'),
                delivery_slot=o.get('deliverySlot', 'Morning Slot'),
                items_json=json.dumps(o.get('items', []))
            )

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def orders_list_create(request):
    seed_default_orders_if_empty()
    if request.method == 'GET':
        orders = Order.objects.all().order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = request.data
        new_id = f"ORD-{random.randint(10000, 99999)}"
        items = data.get('items', [])
        order = Order.objects.create(
            order_id=data.get('id', new_id),
            customer_name=data.get('customer', 'Rahul Sharma'),
            status=data.get('status', 'Processing'),
            total=data.get('total', 0),
            items_count=len(items) if items else 1,
            eta=data.get('eta', '6:45 AM Today'),
            address=data.get('address', 'Flat 402, Indiranagar, Bengaluru'),
            payment_method=data.get('paymentMethod', 'Cash on Delivery'),
            delivery_slot=data.get('deliverySlot', 'Morning (6:00 AM - 7:00 AM)'),
            items_json=json.dumps(items)
        )
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PATCH', 'PUT'])
@permission_classes([AllowAny])
def track_order(request, order_id):
    seed_default_orders_if_empty()
    try:
        order = Order.objects.get(order_id=order_id)
    except Order.DoesNotExist:
        orders = Order.objects.all().order_by('-created_at')
        order = orders.first()

    if request.method in ['PATCH', 'PUT']:
        new_status = request.data.get('status')
        if new_status:
            order.status = new_status
            order.save()

    serializer = OrderSerializer(order)
    return Response(serializer.data)