from django.db import models
from accounts.models import UserProfile

class Order(models.Model):
    STATUS_CHOICES = (
        ('Processing', 'Processing'),
        ('Out for Delivery', 'Out for Delivery'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    )
    order_id = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(UserProfile, on_delete=models.SET_NULL, null=True, blank=True)
    customer_name = models.CharField(max_length=150, default='Rahul Sharma')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Out for Delivery')
    total = models.DecimalField(max_digits=10, decimal_places=2)
    items_count = models.IntegerField(default=1)
    eta = models.CharField(max_length=100, default='6:45 AM Today')
    address = models.TextField(blank=True, default='')
    payment_method = models.CharField(max_length=100, default='Cash on Delivery')
    delivery_slot = models.CharField(max_length=100, default='Morning (6:00 AM - 7:00 AM)')
    items_json = models.TextField(blank=True, default='[]')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.order_id} - {self.status} (₹{self.total})"