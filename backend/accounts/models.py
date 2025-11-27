from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # make email unique
    confidences = models.ManyToManyField('problems.ProblemCategory', through='confidence.Confidence', related_name='users')
