from django.shortcuts import render, get_object_or_404
from .models import *

# Create your views here.

def home(request):
    songs = Song.objects.all().order_by('-created_at')
    context = {'songs': songs}
    
    return render(request, 'app/home.html', context)


def song_details(request, pk):
    song = get_object_or_404(Song, pk=pk)
    context = {'song': song}
    
    return render(request, 'app/song.html', context)


def artist_details(request, pk):
    artist = get_object_or_404(Artist, pk=pk)
    songs = artist.songs.all()
    context = {'artist': artist, 'songs': songs}
    
    return render(request, 'app/artist.html', context)

def album_details(request, pk):
    album = get_object_or_404(Album, pk=pk)
    songs = album.songs.all()
    context = {"album": album, "songs": songs}

    return render(request, 'app/album.html', context)

def playlist_details(request, pk):
    playlist = get_object_or_404(Playlist, pk=pk)
    songs = playlist.songs.all()
    context = {"playlist": playlist, "songs": songs}

    return render(request, 'app/playlist.html', context)