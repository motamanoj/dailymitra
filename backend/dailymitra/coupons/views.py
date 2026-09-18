from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.utils import timezone

from .models import Coupon, CouponUsage
from .serializers import (
    CouponSerializer, CouponCreateUpdateSerializer,
    CouponValidateSerializer, CouponUsageSerializer
)


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class CouponListCreateView(generics.ListCreateAPIView):
    """List and create coupons (admin only for create)"""
    queryset = Coupon.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['is_active', 'discount_type']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CouponCreateUpdateSerializer
        return CouponSerializer


class CouponDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, delete coupon"""
    queryset = Coupon.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'code'

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return CouponCreateUpdateSerializer
        return CouponSerializer


class ActiveCouponListView(generics.ListAPIView):
    """List active coupons"""
    serializer_class = CouponSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        now = timezone.now()
        return Coupon.objects.filter(
            is_active=True,
            valid_from__lte=now,
            valid_until__gte=now
        )


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def validate_coupon(request):
    """Validate a coupon code"""
    serializer = CouponValidateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    code = serializer.validated_data['code']
    subtotal = serializer.validated_data['subtotal']

    try:
        coupon = Coupon.objects.get(code=code)
    except Coupon.DoesNotExist:
        return Response(
            {'error': 'Invalid coupon code'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not coupon.is_valid():
        return Response(
            {'error': 'Coupon is not valid or has expired'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Check user usage
    user_usage_count = CouponUsage.objects.filter(
        coupon=coupon, user=request.user
    ).count()

    if user_usage_count >= coupon.max_uses_per_user:
        return Response(
            {'error': 'You have already used this coupon maximum times'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if subtotal < coupon.min_order_amount:
        return Response(
            {'error': f'Minimum order amount of ₹{coupon.min_order_amount} required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    discount_amount = coupon.calculate_discount(subtotal)

    return Response({
        'valid': True,
        'code': coupon.code,
        'discount_type': coupon.discount_type,
        'discount_value': coupon.discount_value,
        'discount_amount': discount_amount,
        'message': f'Coupon applied successfully! You save ₹{discount_amount}'
    })


class CouponUsageListView(generics.ListAPIView):
    """List user's coupon usage history"""
    serializer_class = CouponUsageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CouponUsage.objects.filter(user=self.request.user)


class AdminCouponUsageListView(generics.ListAPIView):
    """Admin: List all coupon usages"""
    serializer_class = CouponUsageSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = CouponUsage.objects.all()
    filterset_fields = ['coupon', 'user']