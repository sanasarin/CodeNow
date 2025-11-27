from django.db import models
from django.contrib.auth import get_user_model


class ProblemCategory(models.Model):
    """
    Examples: Arrays, LinkedLists, BFS
    """
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Problem(models.Model):
    DIFFICULTY_CHOICES = [
        ('EASY', 'Easy'),
        ('MEDIUM', 'Medium'),
        ('HARD', 'Hard'),
    ]
    name = models.CharField(max_length=100)

    leetcode_url = models.URLField(unique=True)

    difficulty = models.CharField(max_length=7, choices=DIFFICULTY_CHOICES)

    categories = models.ManyToManyField(ProblemCategory)

    def __str__(self):
        return f'{self.get_difficulty_display()} - {self.leetcode_url}'

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super(Problem, self).save(*args, **kwargs)


class Attempt(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    perceived_difficulty = models.CharField(max_length=7, choices=Problem.DIFFICULTY_CHOICES)
    time_taken = models.PositiveIntegerField(help_text="Time taken in minutes")
    date_time = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'problem', 'date_time')

    def __str__(self):
        return f'{self.user.username} - {self.problem.leetcode_url} - {self.date_time}'

class BehaviorProblem(models.Model):
    """
    Behavioral Problems
    """
    name = models.CharField(max_length=250)
    desc = models.CharField(max_length=600)