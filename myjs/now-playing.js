(function () {
    const player = window.WaveCraftPlayer;
    const lyricsList = document.getElementById("lyricsList");
    const videoStage = document.getElementById("videoStage");
    const image = document.getElementById("nowPlayingImage");
    const album = document.getElementById("nowPlayingAlbum");
    const title = document.getElementById("nowPlayingTitle");
    const artist = document.getElementById("nowPlayingArtist");
    const playButton = document.getElementById("playButton");
    const previousButton = document.getElementById("previousButton");
    const nextButton = document.getElementById("nextButton");
    const progress = document.getElementById("nowProgress");
    const currentTime = document.getElementById("nowCurrentTime");
    const duration = document.getElementById("nowDuration");
    const volume = document.getElementById("nowVolume");
    const waveform = document.getElementById("waveform");
    const themeButton = document.getElementById("nowThemeButton");
    let activeLyrics = [];
    let lastSongFile = "";
    let lastActiveLyricIndex = -1;

    if (localStorage.getItem("wavecraftTheme") === "light") {
        document.body.classList.add("light");
    }

    function updateThemeButton() {
        if (!themeButton) return;
        const icon = themeButton.querySelector("i");
        const isLight = document.body.classList.contains("light");
        icon.className = isLight ? "ri-sun-line" : "ri-moon-line";
        themeButton.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
        themeButton.title = isLight ? "Switch to dark mode" : "Switch to light mode";
    }

    updateThemeButton();

    if (themeButton) {
        themeButton.addEventListener("click", () => {
            document.body.classList.toggle("light");
            localStorage.setItem("wavecraftTheme", document.body.classList.contains("light") ? "light" : "dark");
            updateThemeButton();
        });
    }

    function formatTime(seconds) {
        if (!Number.isFinite(seconds)) return "0:00";
        return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
    }

    function createWaveform() {
        waveform.innerHTML = "";
        for (let index = 0; index < 54; index += 1) {
            const bar = document.createElement("span");
            bar.style.setProperty("--height", `${8 + ((index * 17) % 22)}px`);
            bar.style.setProperty("--delay", `${(index % 9) * .08}s`);
            waveform.appendChild(bar);
        }
    }

    function renderLyrics(lyrics) {
        activeLyrics = Array.isArray(lyrics) ? lyrics.filter(line => line && typeof line.text === "string") : [];
        lastActiveLyricIndex = -1;
        lyricsList.innerHTML = "";
        if (!activeLyrics.length) {
            const empty = document.createElement("p");
            empty.className = "lyric-line empty";
            empty.textContent = "Lyrics aren't available for this song.";
            lyricsList.appendChild(empty);
            return;
        }
        activeLyrics.forEach(line => {
            const element = document.createElement("p");
            element.className = "lyric-line";
            element.dataset.time = String(Number(line.time) || 0);
            element.textContent = line.text;
            lyricsList.appendChild(element);
        });
    }

    function renderVideo(song) {
        videoStage.innerHTML = "";
        if (song && song.video) {
            const video = document.createElement("video");
            video.src = song.video;
            video.controls = true;
            video.playsInline = true;
            video.muted = true;
            video.loop = true;
            if (song.image) video.poster = song.image;
            videoStage.appendChild(video);
            return;
        }
        if (song && song.image) {
            const art = document.createElement("img");
            art.className = "fallback-art";
            art.src = song.image;
            art.alt = "";
            videoStage.appendChild(art);
        }
        const shade = document.createElement("div");
        shade.className = "fallback-shade";
        const label = document.createElement("span");
        label.className = "fallback-label";
        label.textContent = "WAVECRAFT";
        videoStage.append(shade, label);
    }

    function updateLyrics(time) {
        if (!activeLyrics.length) return;
        let activeIndex = 0;
        activeLyrics.forEach((line, index) => {
            if (Number(line.time) <= time) activeIndex = index;
        });
        [...lyricsList.children].forEach((line, index) => line.classList.toggle("active", index === activeIndex));
        if (activeIndex !== lastActiveLyricIndex) {
            lastActiveLyricIndex = activeIndex;
            const activeLine = lyricsList.children[activeIndex];
            if (activeLine) activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    function updateView(snapshot) {
        const song = snapshot.currentSong;
        if (song && song.file !== lastSongFile) {
            lastSongFile = song.file;
            image.src = song.image || "";
            image.alt = `${song.title} album artwork`;
            title.textContent = song.title;
            artist.textContent = song.artist;
            album.textContent = song.album || "WAVECRAFT PLAYLIST";
            renderLyrics(song.lyrics);
            renderVideo(song);
        }
        if (!song) return;
        const audio = snapshot.audio;
        const playing = audio && !audio.paused;
        playButton.innerHTML = playing ? '<i class="ri-pause-fill"></i>' : '<i class="ri-play-fill"></i>';
        waveform.classList.toggle("playing", playing);
        if (audio) {
            progress.value = audio.duration ? String((audio.currentTime / audio.duration) * 100) : "0";
            currentTime.textContent = formatTime(audio.currentTime);
            duration.textContent = formatTime(audio.duration);
            volume.value = String(audio.volume);
            updateLyrics(audio.currentTime);
        }
    }

    createWaveform();
    if (player) {
        player.subscribe(updateView);
        playButton.addEventListener("click", () => player.togglePlay());
        previousButton.addEventListener("click", () => player.previous());
        nextButton.addEventListener("click", () => player.next());
        progress.addEventListener("input", event => player.seek(event.target.value));
        volume.addEventListener("input", event => player.setVolume(event.target.value));
    } else {
        title.textContent = "Player unavailable";
    }

    document.getElementById("backButton").addEventListener("click", () => {
        if (player && player.saveForNavigation) player.saveForNavigation();
        const returnUrl = sessionStorage.getItem("wavecraftNowPlayingReturnUrl");
        sessionStorage.removeItem("wavecraftNowPlayingReturnUrl");

        if (returnUrl) {
            window.location.href = returnUrl;
        } else if (document.referrer && window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
    });
})();
