from django.urls import path
from .views import *
from . import views




urlpatterns = [
    path('songs', SongsAPIView.as_view(), name='songs'),
    path('song/<int:pk>', SongAPIView.as_view(), name='song'),

    path('artists', ArtistsAPIView.as_view(), name='artists'),
    path('artist/<int:pk>', ArtistAPIView.as_view(), name='artist'),

    path('albums', AlbumsAPIView.as_view(), name='albums'),
    path('album/<int:pk>', AlbumAPIView.as_view(), name='album'),
    
    path('playlists', PlaylistsAPIView.as_view(), name='playlists'),
    path('playlist/<int:pk>', PlaylistAPIView.as_view(), name='playlist'),
]