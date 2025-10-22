from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='Home'),
    path('song/<int:pk>', views.song_details, name='song_details'),
    path('artist/<int:pk>', views.artist_details, name='artist_details'),
    path('album/<int:pk>', views.album_details, name='album_details'),
    path('playlist/<int:pk>', views.playlist_details, name='playlist_details'),
]