from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, APIClient

from achievements.models import AchievementModel
from confidence.models import Confidence
from problems.models import Attempt

from problems.models import ProblemCategory, Problem

from achievements.serializers import AchievementSerializer


# Create your tests here.

class AchievementTestCases(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {'username': 'testuser',
                          'password': 'testpass',
                          'email': 'testuser@example.com'}
        self.user = get_user_model().objects.create_user(**self.user_data)
        self.problem_category = ProblemCategory.objects.create(name='Arrays')
        self.problem1 = Problem.objects.create(name='Problem1', difficulty='Easy',
                                               leetcode_url='https://example.com/problem1')
        self.problem1.categories.add(self.problem_category)
        self.problem2 = Problem.objects.create(name='Problem2', difficulty='Medium',
                                               leetcode_url='https://example.com/problem2')
        self.problem2.categories.add(self.problem_category)
        self.attempt1 = Attempt.objects.create(user=self.user, problem=self.problem1, perceived_difficulty='Easy',
                                               time_taken=900)
        self.attempt2 = Attempt.objects.create(user=self.user, problem=self.problem2, perceived_difficulty='Medium',
                                               time_taken=650)
        self.confidence1 = Confidence.objects.create(user=self.user, problem_category=self.problem_category, level=5)

        self.client.force_authenticate(user=self.user)

    def test_add_first_achievement(self):
        url = reverse('add achievement')
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        achievement1 = AchievementModel.objects.filter(user=self.user, name='First!')
        self.assertEqual(achievement1.count(), 1)

    def test_add_powerhouse_achievement(self):
        url = reverse('add achievement')
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        achievement2 = AchievementModel.objects.filter(user=self.user, name='Powerhouse!')
        self.assertEqual(achievement2.count(), 1)

    def test_add_overdrive_achievement(self):
        url = reverse('add achievement')
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        achievement3 = AchievementModel.objects.filter(user=self.user, name='Overdrive!')
        self.assertEqual(achievement3.count(), 1)

    def test_duplicate_achievements(self):
        url = reverse('add achievement')
        response1 = self.client.post(url)
        self.assertEqual(response1.status_code, status.HTTP_200_OK)
        response2 = self.client.post(url)
        self.assertEqual(response2.status_code, status.HTTP_200_OK)
        achievement1 = AchievementModel.objects.filter(user=self.user, name='First!')
        self.assertEqual(achievement1.count(), 1)
        achievement2 = AchievementModel.objects.filter(user=self.user, name='Powerhouse!')
        self.assertEqual(achievement2.count(), 1)
        achievement3 = AchievementModel.objects.filter(user=self.user, name='Overdrive!')
        self.assertEqual(achievement3.count(), 1)

    def test_get_achievements(self):
        url = reverse('list achievements')
        AchievementModel.objects.create(user=self.user, name='First!')
        AchievementModel.objects.create(user=self.user, name='Powerhouse!')
        AchievementModel.objects.create(user=self.user, name='Overdrive!')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        all_achievements = AchievementModel.objects.filter(user=self.user)
        serializer = AchievementSerializer(all_achievements, many=True)
        self.assertEqual(response.data, serializer.data)
