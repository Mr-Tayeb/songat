# Songat — Django Music Player

A simple and elegant **web music player** built with **Django**.  
It allows users to manage and play songs, organize them into albums and playlists, and access data via RESTful APIs.

---

## Features

- Music management: add and organize songs, artists, albums, and playlists  
- Two apps:
  - `app/` — core music player logic (models, views, templates)
  - `api/` — REST API for Songs, Artists, Albums, and Playlists using Django REST Framework  
- Media handling: upload and serve audio files and cover images  
- REST API endpoints for frontend or mobile integration  

---

## Project Structure

songat/
├── app/
│ ├── models.py # Song, Artist, Album, Playlist models
│ ├── views.py # Web views and templates logic
│ ├── urls.py # Routes for web pages
│ ├── templates/ # HTML templates for UI
│ └── static/ # CSS, JS, images
│
├── api/
│ ├── serializers.py # Serializers for all models
│ ├── views.py # API views and logic
│ ├── urls.py # REST API routes
│
├── songat/
│ ├── settings.py # Project configuration
│ ├── urls.py # Root URLs include both apps
│ └── wsgi.py
│
└── manage.py



---

## Models Overview

| Model | Description |
|--------|-------------|
| **Artist** | Stores artist information (name, bio, image, etc.) |
| **Album** | Represents a collection of songs by an artist |
| **Song** | Stores song file, title, artist, album, duration, and cover image |
| **Playlist** | User-created collections of songs |

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/songat.git
cd songat


### 1. Init the repository

### 2. Create and activate a virtual environment

### 3. Install dependencies

### 4. Configure the database

### 5. Apply migrations

### 6. Create a superuser

### 7. Run the development server


# API Endpoints

| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/api/songs/` | GET / POST | List or create songs |
| `/api/songs/<id>/` | GET / PUT / DELETE | Retrieve, update, or delete a song |
| `/api/artists/` | GET / POST | Manage artists |
| `/api/albums/` | GET / POST | Manage albums |
| `/api/playlists/` | GET / POST | Manage playlists |


# Media & Static Files

## Media Files
Media files (song audio and images) are uploaded to:

MEDIA_ROOT = BASE_DIR / 'media'
MEDIA_URL = '/media/'

## Static Files
Static files (CSS, JavaScript, images, etc.) are located in:

app/static/

# Technologies Used

- Django  
- Django REST Framework (DRF)  
- SQLite / MySQL  
- HTML, CSS, JavaScript  

---

# Future Enhancements

- Audio player with play/pause/next/previous features  
- User accounts and authentication  
- Playlist sharing and likes  
- Frontend integration (React or Vue)
