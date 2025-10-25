from django.shortcuts import render, get_object_or_404
from .models import *
from django.urls import reverse_lazy
from django.views.generic import FormView, TemplateView
from django.contrib.auth.views import LoginView, LogoutView
from .forms import RegisterForm
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.mixins import LoginRequiredMixin


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


# Authentication views:

class Profile(LoginRequiredMixin, TemplateView):
    login_url = '/login'
    template_name = 'app/profile.html'

class Register(FormView):
    template_name = 'app/register.html'
    form_class = RegisterForm
    redirect_authenticated_user = True
    success_url = reverse_lazy('profile')

    def form_valid(self, form):
        user = form.save()
        if user:
            login(self.request, user)

        return super(Register, self).form_valid(form)


class Login(LoginView):
    template_name = 'app/login.html'
    redirect_authenticated_user = True

    def get_success_url(self):
        messages.info(self.request, 'Welcome to SONGAT profile')
        return reverse_lazy('profile')
    
    def form_invalid(self, form):
        messages.error(self.request, 'Invalid password or username')

        return self.render_to_response(self.get_context_data(form = form))

class Logout(LogoutView):
    template_name = 'app/logout.html'
    next_page = reverse_lazy('login')
    