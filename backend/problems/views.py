# views.py
from math import perm
from random import choice
from urllib import request
from confidence.models import Confidence
from rest_framework import generics, permissions
from confidence.models import Confidence
from .models import Problem, ProblemCategory, Attempt
from .serializers import CustomProblemSerializer, ProblemSerializer, ProblemCategorySerializer, AttemptSerializer
from django.contrib.auth.models import User
from .serializers import UserSerializer
from django.shortcuts import get_object_or_404
from problems.models import BehaviorProblem
from problems.serializers import BehavioralProblemsSerializer
from rest_framework.response import Response
from rest_framework import generics, permissions, status
from rest_framework.views import APIView


class ProblemCategoryListCreate(generics.ListCreateAPIView):
    """
    Create Problem Category View
    """
    queryset = ProblemCategory.objects.all()
    serializer_class = ProblemCategorySerializer


class ProblemCategoryRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, Update and Destroy Problem Category View
    """
    queryset = ProblemCategory.objects.all()
    serializer_class = ProblemCategorySerializer


class ProblemListCreate(generics.ListCreateAPIView):
    """
    Create Problem List View
    """
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer


class ProblemRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, Update, Destroy Problem View
    """
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer


class AttemptListCreate(generics.ListCreateAPIView):
    """
    Create Attempt List View
    """
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Attempt.objects.all()
    serializer_class = AttemptSerializer

    def get_queryset(self):
        """
        Gets Attempt From ID
        """
        problem_id = self.kwargs['pid']
        user = self.request.user
        return Attempt.objects.filter(problem__id=problem_id, user=user)

    def create(self, request, *args, **kwargs):
        """
        Updates Confidence
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        diff_confidence = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'confidence_difference': diff_confidence}, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        """
        Inputs Confidence Level
        """
        problem_id = self.kwargs['pid']
        problem = get_object_or_404(Problem, id=problem_id)
        serializer.save(user=self.request.user, problem=problem)
        request = self.request

        for category in problem.categories.all():
            name = category.name

        category = get_object_or_404(ProblemCategory, name=name)
        user = self.request.user
        confidence = get_object_or_404(Confidence, user=user, problem_category=category)

        perceived_difficulty = request.data.get("perceived_difficulty")
        time_taken = int(request.data.get("time_taken"))
        completed = request.data.get("completed").lower() == "true"

        old_confidence_level = confidence.level

        # if not completed, immediate -15
        if completed == False:
            confidence.level = max(1, confidence.level - 15)
        else:
            difficulty_multiplier = {
                'HARD': 0.5,
                'MEDIUM': 0.75,
                'EASY': 1.0
            }.get(perceived_difficulty.upper(), 1.0)
            time_multiplier = max(0.25, (1.0 - time_taken / 120.0))
            confidence_diff = 20 * difficulty_multiplier * time_multiplier
            confidence.level = min(100, max(1, confidence.level + confidence_diff))

        confidence.save()

        new_confidence_level = confidence.level

        diff_confidence = new_confidence_level - old_confidence_level

        return diff_confidence


class AttemptRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, Update and Destroy Attempt View
    """
    queryset = Attempt.objects.all()
    serializer_class = AttemptSerializer


class BehavioralProblemsView(APIView):
    """
    Retrieves behavioral problems
    """
    serializer_class = BehavioralProblemsSerializer

    def get(self, request, format=None):
        """
        Retrieves Behavioral Problems
        """
        problems = BehaviorProblem.objects.order_by('?').values('id', 'name', 'desc')[:9]
        return Response({'problems': list(problems)})

    def post(self, request):
        """
        Creates Behavioral Problem Using Name And Description
        """
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data.get("name")
            desc = serializer.validated_data.get("desc")
            behavioral_question = BehaviorProblem.objects.create(
                name=name,
                desc=desc
            )
            behavioral_question.save()
            return Response(status=status.HTTP_200_OK)
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class RecommendedProblemsView(generics.ListAPIView):
    """
    Recommended Problems View
    """
    serializer_class = CustomProblemSerializer

    def get_queryset(self):
        """
        Retrieves All Recommended Problems
        """
        user = self.request.user
        queryset = Problem.objects.none()

        confidences = Confidence.objects.all().filter(user=user.id).order_by('level')

        confidence = confidences[0]

        selected_problems = []

        category = [confidence.problem_category]
        problems = Problem.objects.filter(categories__in=category)

        if confidence.level < 40:
            difficulty = 'EASY'
        elif 30 <= confidence.level <= 70:
            difficulty = 'MEDIUM'
        else:
            difficulty = 'HARD'

        problems = problems.filter(difficulty=difficulty)

        selected_problems.extend(problems)

        selected_problems.sort(
            key=lambda p: Confidence.objects.get(user=user, problem_category__in=p.categories.all()).level)

        queryset = Problem.objects.filter(pk__in=[p.pk for p in selected_problems])

        return queryset


class RecommendedProblemsCategoryView(APIView):
    """
    Recommended Problems Category View
    """
    def get(self, request):
        """
        Retrieves Confidence Levels From User
        """
        user = request.user

        confidences = Confidence.objects.all().filter(user=user.id).order_by('level')
        confidence = confidences[0]
        category = confidence.problem_category

        category_dict = {
            'id': category.id,
            'name': category.name
        }

        return Response(category_dict)
