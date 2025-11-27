from rest_framework import serializers

from achievements.models import AchievementModel


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = AchievementModel
        fields = ('id', 'user', 'name')
