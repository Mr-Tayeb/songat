// Music Player Functionality
class MusicPlayer {
    constructor() {
        this.isPlaying = false;
        this.currentSong = null;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupAuthButtons();
    }
    
    setupEventListeners() {
        const musicCards = document.querySelectorAll('.music-card');
        const playBtn = document.querySelector('.play-btn');
        const progressBar = document.querySelector('.progress-bar');
        const progress = document.querySelector('.progress');
        const volumeBar = document.querySelector('.volume-controls .progress-bar');
        const volumeProgress = document.querySelector('.volume-controls .progress');
        
        // Add click event to music cards
        musicCards.forEach(card => {
            card.addEventListener('click', () => {
                this.playSong(card);
            });
            
            // Add keyboard navigation
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.playSong(card);
                }
            });
            
            // Make cards focusable for accessibility
            card.setAttribute('tabindex', '0');
        });
        
        // Play/Pause functionality
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                this.togglePlayback();
            });
            
            // Keyboard support for play button
            playBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.togglePlayback();
                }
            });
        }
        
        // Progress bar click to seek
        if (progressBar && progress) {
            progressBar.addEventListener('click', (e) => {
                this.seekSong(e, progressBar, progress);
            });
        }
        
        // Volume control
        if (volumeBar && volumeProgress) {
            volumeBar.addEventListener('click', (e) => {
                this.adjustVolume(e, volumeBar, volumeProgress);
            });
        }
        
        // Previous and Next buttons
        const prevBtn = document.querySelector('.control-btn:nth-child(1)');
        const nextBtn = document.querySelector('.control-btn:nth-child(3)');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousSong();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSong();
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Spacebar to play/pause
            if (e.code === 'Space' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                this.togglePlayback();
            }
            
            // Left/Right arrows for seek (when playing)
            if (this.isPlaying) {
                if (e.code === 'ArrowLeft') {
                    this.seekBackward();
                } else if (e.code === 'ArrowRight') {
                    this.seekForward();
                }
            }
        });
    }
    
    setupAuthButtons() {
        const authButtons = document.querySelectorAll('.auth-btn');
        
        // Add interactive effects to auth buttons
        authButtons.forEach(button => {
            // Add ripple effect on click
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
            
            // Add keyboard accessibility
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
        
        // Add logout confirmation
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                if (!confirm('Are you sure you want to logout?')) {
                    e.preventDefault();
                }
            });
        }
    }
    
    playSong(card) {
        const title = card.querySelector('.song-title').textContent;
        const artist = card.querySelector('.artist-name').textContent;
        const nowPlayingTitle = document.querySelector('.now-playing-title');
        const nowPlayingArtist = document.querySelector('.now-playing-artist');
        const playBtn = document.querySelector('.play-btn');
        
        nowPlayingTitle.textContent = title;
        nowPlayingArtist.textContent = artist;
        
        // Set current song
        this.currentSong = {
            title: title,
            artist: artist,
            element: card
        };
        
        // Highlight the playing card
        this.highlightPlayingCard(card);
        
        // Start playback
        this.startPlayback();
        
        // Update play button if it was in pause state
        if (!this.isPlaying && playBtn) {
            playBtn.textContent = '❚❚';
            this.isPlaying = true;
        }
        
        // In a real app, this would start playing the actual audio
        console.log(`Now playing: ${title} by ${artist}`);
    }
    
    highlightPlayingCard(card) {
        // Remove highlight from all cards
        document.querySelectorAll('.music-card').forEach(c => {
            c.style.border = 'none';
        });
        
        // Add highlight to current card
        card.style.border = '2px solid #1DB954';
    }
    
    togglePlayback() {
        const playBtn = document.querySelector('.play-btn');
        this.isPlaying = !this.isPlaying;
        
        if (playBtn) {
            playBtn.textContent = this.isPlaying ? '❚❚' : '▶';
        }
        
        // In a real app, this would control actual audio playback
        console.log(this.isPlaying ? 'Playback started' : 'Playback paused');
        
        // If no song is selected but user tries to play, select first song
        if (this.isPlaying && !this.currentSong) {
            const firstCard = document.querySelector('.music-card');
            if (firstCard) {
                this.playSong(firstCard);
            }
        }
    }
    
    startPlayback() {
        this.isPlaying = true;
        const playBtn = document.querySelector('.play-btn');
        if (playBtn) {
            playBtn.textContent = '❚❚';
        }
        
        // Simulate playback progress
        this.simulatePlaybackProgress();
    }
    
    simulatePlaybackProgress() {
        const progress = document.querySelector('.progress');
        if (!progress) return;
        
        // Reset progress
        progress.style.width = '0%';
        
        // Simulate progress over time
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100 || !this.isPlaying) {
                clearInterval(interval);
                if (width >= 100) {
                    this.nextSong();
                }
                return;
            }
            width += 0.5;
            progress.style.width = width + '%';
        }, 500);
    }
    
    seekSong(e, progressBar, progress) {
        const clickX = e.offsetX;
        const width = progressBar.offsetWidth;
        const percentage = (clickX / width) * 100;
        
        progress.style.width = `${percentage}%`;
        
        // In a real app, this would seek to that position in the song
        console.log(`Seek to ${percentage}%`);
    }
    
    seekBackward() {
        const progress = document.querySelector('.progress');
        if (!progress) return;
        
        const currentWidth = parseFloat(progress.style.width) || 0;
        const newWidth = Math.max(0, currentWidth - 5);
        progress.style.width = `${newWidth}%`;
        
        console.log(`Seek backward to ${newWidth}%`);
    }
    
    seekForward() {
        const progress = document.querySelector('.progress');
        if (!progress) return;
        
        const currentWidth = parseFloat(progress.style.width) || 0;
        const newWidth = Math.min(100, currentWidth + 5);
        progress.style.width = `${newWidth}%`;
        
        console.log(`Seek forward to ${newWidth}%`);
    }
    
    adjustVolume(e, volumeBar, volumeProgress) {
        const clickX = e.offsetX;
        const width = volumeBar.offsetWidth;
        const percentage = (clickX / width) * 100;
        
        volumeProgress.style.width = `${percentage}%`;
        
        // In a real app, this would adjust volume
        console.log(`Volume set to ${percentage}%`);
    }
    
    previousSong() {
        console.log('Previous song');
        // In a real app, this would play the previous song in the playlist
        // For now, we'll just select the previous card in the grid
        if (this.currentSong && this.currentSong.element) {
            const prevCard = this.currentSong.element.previousElementSibling;
            if (prevCard && prevCard.classList.contains('music-card')) {
                this.playSong(prevCard);
            }
        }
    }
    
    nextSong() {
        console.log('Next song');
        // In a real app, this would play the next song in the playlist
        // For now, we'll just select the next card in the grid
        if (this.currentSong && this.currentSong.element) {
            const nextCard = this.currentSong.element.nextElementSibling;
            if (nextCard && nextCard.classList.contains('music-card')) {
                this.playSong(nextCard);
            }
        }
    }
    
    createRippleEffect(e, button) {
        // Remove any existing ripple
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        // Create new ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // Get position of click
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        // Set styles for ripple
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Initialize the music player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const musicPlayer = new MusicPlayer();
    
    // Add any additional initialization code here
    console.log('SONGAT Music Player initialized');
});