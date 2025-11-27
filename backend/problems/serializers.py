from unicodedata import category
from rest_framework import serializers
from .models import Problem, ProblemCategory, Attempt
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email')

class ProblemCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemCategory
        fields = '__all__'

class ProblemSerializer(serializers.ModelSerializer):
    categories = ProblemCategorySerializer(many=True)

    class Meta:
        model = Problem
        fields = ('id', 'name', 'leetcode_url', 'difficulty', 'categories')

    def create(self, validated_data):
        categories_data = validated_data.pop('categories')
        problem = Problem.objects.create(**validated_data)

        for category_data in categories_data:
            category, _ = ProblemCategory.objects.get_or_create(**category_data)
            problem.categories.add(category)

        return problem

class CustomProblemSerializer(serializers.ModelSerializer):
    attempted = serializers.SerializerMethodField()
    categories = ProblemCategorySerializer(many=True)


    class Meta:
        model = Problem
        fields = ['id', 'name', 'leetcode_url', 'difficulty', 'categories', 'attempted']

    def get_attempted(self, obj):
        user = self.context['request'].user
        attempted = Attempt.objects.filter(user=user, problem=obj).exists()
        return attempted


class AttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attempt
        fields = ('completed', 'perceived_difficulty', 'time_taken', 'date_time')





class BehavioralProblemsSerializer(serializers.Serializer):
    """
    Behavioral Problems Serializer
    """
    name = serializers.CharField(max_length=200)
    desc = serializers.CharField(max_length=600)
