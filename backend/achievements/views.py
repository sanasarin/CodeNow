from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import CustomUser
from achievements.models import AchievementModel
from achievements.serializers import AchievementSerializer
from confidence.models import Confidence
from problems.models import Attempt


# Create your views here.

# TODO: Break this into two views
class AchievementView(APIView):
    """
    Achievements View
    """
    serializer_class = AchievementSerializer

    def post(self, request):
        """
        Adds An Achievement
        """
        user_id = request.user.id
        user = CustomUser.objects.get(id=user_id)
        achievements = AchievementModel.objects.filter(user=user)
        if not achievements.filter(name='First!').exists():
            first_achievement = AchievementModel(user=user, name='First!')
            first_achievement.save()
        attempts = Attempt.objects.filter(user=user)
        total_time = sum(attempt.time_taken for attempt in attempts)
        if total_time >= 1000 and not achievements.filter(name='Powerhouse!').exists():
            powerhouse_achievement = AchievementModel(user=user, name='Powerhouse!')
            powerhouse_achievement.save()
        skills = Confidence.objects.filter(user=user)
        perfect_skills = True
        for skill in skills:
            if skill.level != 5:
                perfect_skills = False

        if perfect_skills and not achievements.filter(name='Overdrive!').exists():
            overdrive_achievement = AchievementModel(user=user, name='Overdrive!')
            overdrive_achievement.save()
        updated_achievements = AchievementModel.objects.filter(user=user)
        serializer = self.serializer_class(updated_achievements, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get(self, request):
        """
        Gets All Achievements
        """
        user_id = request.user.id
        user = CustomUser.objects.get(id=user_id)
        achievements = AchievementModel.objects.filter(user=user)
        serializer = self.serializer_class(achievements, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




