from django.urls import include, path
from rest_framework import routers
from drf_spectacular.views import SpectacularAPIView
from drf_spectacular.views import SpectacularSwaggerView

urlpatterns = [
    path('account/', include('accounts.urls')),
    path('problems/', include('problems.urls')),
    path('confidence/', include('confidence.urls')),
    path('achievements/', include('achievements.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='api-schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='api-schema'), name='api-docs')
]
