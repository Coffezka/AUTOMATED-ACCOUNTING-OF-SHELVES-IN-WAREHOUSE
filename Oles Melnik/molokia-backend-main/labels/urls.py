from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('label/', views.label_list),
    path('label/<int:pk>/', views.label_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)