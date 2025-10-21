from django.db import models

# Create your models here.

class Artist(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="app/artists_images/")

    def __str__(self):
        return self.name


class Album(models.Model):
    title = models.CharField(max_length=200)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='albums')
    release_date = models.DateField(blank=True, null=True)
    cover = models.ImageField(upload_to='app/albums_images/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.title} by {self.artist.name}"


class Song(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='songs')
    album = models.ForeignKey(Album, on_delete=models.SET_NULL, null=True, blank=True, related_name='songs')
    audio_file = models.FileField(upload_to="app/song_files/")
    cover_image = models.ImageField(upload_to="app/song_images/", blank=True, null=True)
    duration = models.DurationField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} by {self.artist.name}"
    
class Playlist(models.Model):
    name = models.CharField(max_length=100)
    songs = models.ManyToManyField(Song, related_name='playlists', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name