from django.db import models

class Notification(models.Model):
    title = models.CharField(max_length=255)
    message = models.TextField()
    time_ago = models.CharField(max_length=50, default='Just now')
    read = models.BooleanField(default=False)
    notification_type = models.CharField(max_length=50, default='info')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"