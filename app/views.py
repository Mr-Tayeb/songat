from django.shortcuts import render, get_object_or_404
from .models import *

# Create your views here.

def home(request):
    songs = Song.objects.all().order_by('-created_at')
    context = {'songs': songs}
    return render(request, 'app/home.html', context)


def song_detail(request, pk):
    song = get_object_or_404(Song, pk=pk)
    context = {'song': song}
    return render(request, 'app/song.html', context)