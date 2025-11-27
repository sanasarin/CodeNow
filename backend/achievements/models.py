from django.contrib.auth import get_user_model
from django.db import models


# Create your models here.

class AchievementModel(models.Model):
    """
    Achievement Model
    """
    ACHIEVEMENTS = [
        ('FIRST', 'First!'),
        ('POWERHOUSE', 'Powerhouse!'),
        ('OVERDRIVE', 'Overdrive!')
    ]
    name = models.CharField(max_length=100, choices=ACHIEVEMENTS)
    user = models.ForeignKey(get_user_model(), default=None, on_delete=models.CASCADE)
