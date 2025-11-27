from django.urls import path
from . import views

urlpatterns = [
    path('skill_assessment/', views.ConfidenceUpdateView.as_view(), name='skill_assessment'),
]
