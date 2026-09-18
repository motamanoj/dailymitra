from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100, default='Milk & Dairy')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    discount = models.IntegerField(default=0)
    unit = models.CharField(max_length=100, default='1 Litre Pouch')
    rating = models.FloatField(default=4.8)
    reviews_count = models.IntegerField(default=100)
    description = models.TextField(blank=True, default='')
    image = models.URLField(default='https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80')
    stock = models.IntegerField(default=50)
    fat_content = models.CharField(max_length=50, blank=True, null=True)
    shelf_life = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} (₹{self.price})"