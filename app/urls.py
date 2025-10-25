from django.urls import path, include
from . import views
from .views import *



urlpatterns = [
    path('', views.home, name='Home'),
    path('login/', Login.as_view(), name='login'),
    path('logout/', Logout.as_view(), name='logout'),
    path('profile/', Profile.as_view(), name='profile'),
    path('register/', Register.as_view(), name='register'),
    path('song/<int:pk>', views.song_details, name='song_details'),
    path('artist/<int:pk>', views.artist_details, name='artist_details'),
    path('album/<int:pk>', views.album_details, name='album_details'),
    path('playlist/<int:pk>', views.playlist_details, name='playlist_details'),
]