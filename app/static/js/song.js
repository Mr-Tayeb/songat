document.addEventListener('DOMContentLoaded', () => {
    const likeBtn = document.getElementById('like-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // --- Like button toggle ---
    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('liked');
        });
    }

    // --- Play / Pause toggle ---
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            const isPlaying = playPauseBtn.textContent.includes('Pause');
            playPauseBtn.textContent = isPlaying ? '▶ Play' : '⏸ Pause';
        });
    }

    // --- Previous / Next buttons (placeholders for now) ---
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            alert('Go to previous song');
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            alert('Go to next song');
        });
    }
});
