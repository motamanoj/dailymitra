from django.db import models
from django.utils import timezone
from accounts.models import UserProfile

class Coupon(models.Model):
    DISCOUNT_TYPE_CHOICES = (
        ('percentage', 'Percentage'),
        ('flat', 'Flat Amount'),
    )
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, default='')
    discount_type = models.CharField(max_length=20, choices=DISCOUNT_TYPE_CHOICES, default='percentage')
    discount_value = models.DecimalField(max_digits=10, decimal_places=2, default=10.00)
    discount_percent = models.IntegerField(default=10) # backwards compatibility
    max_discount_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    min_order_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    max_uses = models.IntegerField(default=500)
    used_count = models.IntegerField(default=0)
    max_uses_per_user = models.IntegerField(default=5)
    valid_from = models.DateTimeField(default=timezone.now)
    valid_until = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def is_valid(self):
        if not self.is_active:
            return False
        now = timezone.now()
        if self.valid_from and self.valid_from > now:
            return False
        if self.valid_until and self.valid_until < now:
            return False
        if self.max_uses and self.used_count >= self.max_uses:
            return False
        return True

    def calculate_discount(self, subtotal):
        subtotal = float(subtotal)
        if self.discount_type == 'percentage':
            amount = (subtotal * float(self.discount_value)) / 100.0
            if self.max_discount_amount:
                amount = min(amount, float(self.max_discount_amount))
            return round(amount, 2)
        else:
            return round(min(subtotal, float(self.discount_value)), 2)

    def __str__(self):
        return f"{self.code} ({self.discount_value} {self.discount_type})"


class CouponUsage(models.Model):
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE, related_name='usages')
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True, blank=True)
    order_number = models.CharField(max_length=100, blank=True, null=True)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    used_at = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.coupon.code} used by {self.user}"