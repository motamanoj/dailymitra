from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

DEFAULT_NOTIFS = [
    {
        'id': 1,
        'title': 'Order Delivered 🎉',
        'message': 'Your morning milk & dairy packet was delivered at 6:30 AM.',
        'time': '10 mins ago',
        'read': False,
        'type': 'delivery'
    },
    {
        'id': 2,
        'title': 'Subscription Renewed',
        'message': 'Your Monthly Cow Milk Plan auto-renewed for October.',
        'time': '2 hours ago',
        'read': False,
        'type': 'system'
    },
    {
        'id': 3,
        'title': 'Festival Special Coupon! 🎁',
        'message': 'Use code FESTIVE20 for 20% discount on fresh sweets and ghee.',
        'time': '1 day ago',
        'read': True,
        'type': 'promo'
    }
]

@api_view(['GET'])
@permission_classes([AllowAny])
def list_notifications(request):
    return Response(DEFAULT_NOTIFS)
