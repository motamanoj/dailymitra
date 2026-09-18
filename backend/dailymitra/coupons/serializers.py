from rest_framework import serializers
from .models import Coupon, CouponUsage

class CouponSerializer(serializers.ModelSerializer):
    is_valid = serializers.BooleanField(read_only=True)
    discount_type_display = serializers.CharField(source='get_discount_type_display', read_only=True)

    class Meta:
        model = Coupon
        fields = ['id', 'code', 'description', 'discount_type', 'discount_type_display',
                  'discount_value', 'max_discount_amount', 'min_order_amount',
                  'max_uses', 'used_count', 'max_uses_per_user', 'valid_from',
                  'valid_until', 'is_active', 'is_valid', 'created_at', 'updated_at']
        read_only_fields = ['id', 'used_count', 'created_at', 'updated_at']


class CouponCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['code', 'description', 'discount_type', 'discount_value',
                  'max_discount_amount', 'min_order_amount', 'max_uses',
                  'max_uses_per_user', 'valid_from', 'valid_until', 'is_active']

    def validate(self, attrs):
        if attrs.get('valid_from') and attrs.get('valid_until'):
            if attrs['valid_from'] >= attrs['valid_until']:
                raise serializers.ValidationError("Valid until must be after valid from.")
        
        if attrs.get('discount_type') == 'percentage':
            if attrs.get('discount_value', 0) > 100:
                raise serializers.ValidationError("Percentage discount cannot exceed 100%.")
        
        return attrs


class CouponValidateSerializer(serializers.Serializer):
    code = serializers.CharField()
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2)


class CouponUsageSerializer(serializers.ModelSerializer):
    coupon_code = serializers.CharField(source='coupon.code', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = CouponUsage
        fields = ['id', 'coupon', 'coupon_code', 'user', 'user_email',
                  'order_number', 'discount_amount', 'created_at']
        read_only_fields = ['id', 'created_at']