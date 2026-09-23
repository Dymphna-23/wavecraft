/* WaveCraft global player */
(function () {
    const stateKey = "wavecraftPlayerState";
    let state = {
        currentSong: null,
        queue: [],
        currentIndex: -1,
        currentTime: 0,
        isPlaying: false,
        shuffle: false,
        repeat: "off",
        volume: 1,
        ...loadState()
    };
    let audio;
    let player;
    let restoring = false;
    const subscribers = new Set();

    function loadState() {
        try {
            return JSON.parse(localStorage.getItem(stateKey)) || {};
        } catch {
            return {};
        }
    }

    function saveState() {
        if (!audio) return;
        state.currentTime = Number.isFinite(audio.currentTime) ? audio.currentTime : (state.currentTime || 0);
        state.volume = audio.volume;
        localStorage.setItem(stateKey, JSON.stringify(state));
    }

    function normalizeSong(song) {
        if (!song) return null;
        const file = song.file || song.song;
        if (!file) return null;
        return {
            file,
            title: song.title || "Unknown Song",
            artist: song.artist || "Unknown Artist",
            image: song.image || song.playerImage || "",
            album: song.album || "",
            video: song.video || "",
            lyrics: Array.isArray(song.lyrics) ? song.lyrics : []
        };
    }

    function playerMarkup() {
        return `
            <div class="player-song"><img id="playerImage" alt="Song"><div><h6 id="playerTitle">No song playing</h6><small id="playerArtist">WaveCraft</small></div></div>
            <div class="player-controls"><button id="prevBtn" type="button" aria-label="Previous song"><i class="ri-skip-back-fill"></i></button><button id="playPauseBtn" class="play-main" type="button" aria-label="Play or pause"><i class="ri-play-fill"></i></button><button id="nextBtn" type="button" aria-label="Next song"><i class="ri-skip-forward-fill"></i></button></div>
            <div class="player-progress"><span id="currentTime">0:00</span><input type="range" id="progressBar" value="0" min="0" max="100" aria-label="Song progress"><span id="duration">0:00</span></div>
            <div class="player-volume"><i class="ri-volume-up-fill"></i><input type="range" id="volumeBar" min="0" max="1" step="0.01" value="1" aria-label="Volume"></div>
            <button id="closePlayer" class="close-player" type="button" aria-label="Close player"><i class="ri-close-line"></i></button>`;
    }

    function ensureElements() {
        audio = document.getElementById("audioPlayer");
        if (!audio) {
            audio = document.createElement("audio");
            audio.id = "audioPlayer";
            document.body.appendChild(audio);
        }
        player = document.getElementById("musicPlayer");
        if (!player) {
            player = document.createElement("div");
            player.id = "musicPlayer";
            player.className = "music-player";
            player.innerHTML = playerMarkup();
            document.body.appendChild(player);
        }
    }

    function formatTime(seconds) {
        if (!Number.isFinite(seconds)) return "0:00";
        return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
    }

    function updateUi() {
        if (!player) return;
        const song = state.currentSong;
        const image = player.querySelector("#playerImage");
        const title = player.querySelector("#playerTitle");
        const artist = player.querySelector("#playerArtist");
        const playButton = player.querySelector("#playPauseBtn");
        const progress = player.querySelector("#progressBar");
        const current = player.querySelector("#currentTime");
        const duration = player.querySelector("#duration");
        const volume = player.querySelector("#volumeBar");
        if (song) {
            image.src = song.image;
            image.alt = song.title;
            title.textContent = song.title;
            artist.textContent = song.artist;
            player.classList.add("active");
        }
        playButton.innerHTML = audio && !audio.paused ? '<i class="ri-pause-fill"></i>' : '<i class="ri-play-fill"></i>';
        if (progress && audio && audio.duration) progress.value = (audio.currentTime / audio.duration) * 100;
        if (current && audio) current.textContent = formatTime(audio.currentTime);
        if (duration && audio) duration.textContent = formatTime(audio.duration);
        if (volume && audio) volume.value = audio.volume;
        subscribers.forEach(listener => listener({ ...state, audio }));
    }

    function playSong(song, queue, index, restart) {
        const nextSong = normalizeSong(song);
        if (!nextSong) return;
        const sameSong = state.currentSong && state.currentSong.file === nextSong.file;
        state.currentSong = nextSong;
        if (Array.isArray(queue) && queue.length) {
            state.queue = queue.map(normalizeSong).filter(Boolean);
            state.currentIndex = Number.isInteger(index) ? index : state.queue.findIndex(item => item.file === nextSong.file);
        } else if (!Array.isArray(state.queue) || !state.queue.length || !state.queue.some(item => item.file === nextSong.file)) {
            state.queue = [nextSong];
            state.currentIndex = 0;
        }
        state.currentIndex = state.currentIndex < 0 ? 0 : state.currentIndex;
        state.currentTime = sameSong && !restart ? (state.currentTime || audio.currentTime || 0) : 0;
        state.isPlaying = true;
        audio.pause();
        audio.src = nextSong.file;
        audio.load();
        audio.addEventListener("loadedmetadata", function restorePosition() {
            audio.removeEventListener("loadedmetadata", restorePosition);
            audio.currentTime = Math.min(state.currentTime || 0, audio.duration || state.currentTime || 0);
            updateUi();
            audio.play().catch(() => updateUi());
        });
        updateUi();
        saveState();
    }

    function move(direction) {
        if (!state.queue || state.queue.length < 1) return;
        let index = Number.isInteger(state.currentIndex) ? state.currentIndex + direction : 0;
        if (index < 0) index = state.queue.length - 1;
        if (index >= state.queue.length) index = 0;
        playSong(state.queue[index], state.queue, index, true);
    }

    function bindControls() {
        player.addEventListener("click", event => {
            const button = event.target.closest("button");
            if (button) {
                event.preventDefault();
                event.stopImmediatePropagation();
                if (button.id === "playPauseBtn") {
                    if (audio.paused) audio.play().then(() => { state.isPlaying = true; saveState(); updateUi(); }).catch(updateUi);
                    else audio.pause();
                } else if (button.id === "prevBtn") move(-1);
                else if (button.id === "nextBtn") move(1);
                else if (button.id === "closePlayer") {
                    audio.pause();
                    state.currentSong = null;
                    state.queue = [];
                    state.currentIndex = -1;
                    state.currentTime = 0;
                    state.isPlaying = false;
                    player.classList.remove("active", "mobile-expanded");
                    saveState();
                }
                return;
            }
            if (player.classList.contains("active") && state.currentSong) {
                event.preventDefault();
                event.stopImmediatePropagation();
                sessionStorage.setItem("wavecraftNowPlayingReturnUrl", window.location.href);
                window.location.href = "now-playing.html";
            }
        }, true);
        player.querySelector("#progressBar").addEventListener("input", event => {
            if (audio.duration) audio.currentTime = (Number(event.target.value) / 100) * audio.duration;
            saveState();
        });
        player.querySelector("#volumeBar").addEventListener("input", event => {
            audio.volume = Number(event.target.value);
            saveState();
        });
    }

    function restore() {
        if (!state.currentSong) return;
        audio.src = state.currentSong.file;
        audio.volume = Number.isFinite(state.volume) ? state.volume : 1;
        audio.addEventListener("loadedmetadata", function restorePosition() {
            audio.removeEventListener("loadedmetadata", restorePosition);
            audio.currentTime = Math.min(state.currentTime || 0, audio.duration || state.currentTime || 0);
            updateUi();
            if (state.isPlaying) audio.play().catch(() => updateUi());
        });
        audio.load();
        updateUi();
    }

    function saveForNavigation() {
        if (!audio) return;
        if (!audio.paused) state.isPlaying = true;
        saveState();
    }

    function init() {
        ensureElements();
        if (player.dataset.wavecraftBound) return;
        player.dataset.wavecraftBound = "true";
        bindControls();
        audio.addEventListener("play", () => { state.isPlaying = true; updateUi(); saveState(); });
        audio.addEventListener("pause", () => { if (!restoring) state.isPlaying = false; updateUi(); saveState(); });
        audio.addEventListener("timeupdate", () => { updateUi(); });
        audio.addEventListener("durationchange", updateUi);
        audio.addEventListener("ended", () => {
            if (state.repeat === "one") playSong(state.currentSong, state.queue, state.currentIndex, true);
            else if (state.queue.length > 1) move(1);
            else {
                state.isPlaying = false;
                saveState();
                updateUi();
            }
        });
        setInterval(saveState, 1000);
        window.addEventListener("pagehide", saveState);
        window.addEventListener("beforeunload", saveState);
        restore();
    }

    window.WaveCraftPlayer = {
        init,
        play: playSong,
        next: () => move(1),
        previous: () => move(-1),
        getState: () => ({ ...state }),
        saveForNavigation,
        subscribe: listener => {
            subscribers.add(listener);
            listener({ ...state, audio });
            return () => subscribers.delete(listener);
        },
        togglePlay: () => {
            if (!audio || !state.currentSong) return;
            if (audio.paused) audio.play().catch(() => updateUi());
            else audio.pause();
        },
        seek: percentage => {
            if (audio && audio.duration) audio.currentTime = (Number(percentage) / 100) * audio.duration;
        },
        setVolume: value => {
            if (audio) {
                audio.volume = Number(value);
                saveState();
                updateUi();
            }
        }
    };

    init();
})();
