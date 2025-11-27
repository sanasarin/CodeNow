from django.db import models
from django.contrib.auth import get_user_model
from problems.models import ProblemCategory

class Confidence(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    problem_category = models.ForeignKey(ProblemCategory, on_delete=models.CASCADE)
    level = models.IntegerField(default=0)

    class Meta:
        unique_together = ('user', 'problem_category')

    def __str__(self):
        return f'{self.user.username} - {self.problem_category.name} - {self.level}'
