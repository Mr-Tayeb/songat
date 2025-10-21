from django.contrib import admin
from .models import *

# Register your models here.

class ArtistAdmin(admin.ModelAdmin):
    list_display = ("name")
    list_filter = ("name")
    search_fields = ("name", "bio")
    ordering = ('name',)

admin.site.register(Artist, ArtistAdmin)


class AlbumAdmin(admin.ModelAdmin):
    list_display = ("title", "artist", "release_date")
    list_filter = ("artist", "release_date")
    search_fields = ("title", "artist", "release_date")
    ordering = ('artist')

admin.site.register(Album, AlbumAdmin)


class SongAdmin(admin.ModelAdmin):
    list_display = ("title", "artist", "album", "duration", "created_at")
    list_filter = ("title", "artist", "album", "created_at")
    search_fields = ("title", "artist", "album")
    ordering = ('-created_at')

admin.site.register(Song, SongAdmin)


class PlaylistAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at")
    list_filter = ("name", )
    search_fields = ("name", "songs")
    ordering = ('-created_at')

admin.site.register(Playlist, PlaylistAdmin)

