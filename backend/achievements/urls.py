from django.urls import include, path

from achievements.views import AchievementView

urlpatterns = [
    path('add-achievement/', AchievementView.as_view(), name='add achievement'),
    path('list-achievement/', AchievementView.as_view(), name='list achievements'),
]
