from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='Home'),
    path('song/<int:pk>', views.song_detail, name='song_detail'),
]