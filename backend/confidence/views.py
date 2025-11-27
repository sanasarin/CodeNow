from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from problems.models import ProblemCategory
from confidence.models import Confidence
from django.contrib.auth import get_user_model
from accounts.models import CustomUser

User = get_user_model()

class ConfidenceUpdateView(APIView):
    """
    Confidence Update View
    """
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        """
        Updates Confidence Levels
        """
        user = request.user

        if not isinstance(request.data, dict):
            return Response("Invalid input format", status=status.HTTP_400_BAD_REQUEST)

        categories = ProblemCategory.objects.all()
        if len(request.data) != len(categories) + 1:
            return Response("Input data must contain all categories", status=status.HTTP_400_BAD_REQUEST)

        for name, level in request.data.items():
            if name != "user":
                category = get_object_or_404(ProblemCategory, name=name)
                confidence = get_object_or_404(Confidence, user=user, problem_category=category)
                confidence.level = level
                confidence.save()

        return Response("Confidence levels updated successfully", status=status.HTTP_200_OK)

    # todo: make it a protected view
    def get(self, request, *args, **kwargs):
        """
        Gets User Confidence
        """
        user_obj = request.user

        confidence_levels = Confidence.objects.filter(user=user_obj)

        response_data = {}

        for confidence in confidence_levels:
            response_data[confidence.problem_category.name] = confidence.level

        return Response(response_data, status=status.HTTP_200_OK)
