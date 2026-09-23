/* WaveCraft shared store — liked songs + playlists, single source of truth.
   Keeps every page (Home, Library, Liked, Genres) synchronized via localStorage.
   Keys: wavecraftLikedSongs, wavecraftPlaylists, wavecraftTheme, wavecraftPlayerState */
(function () {
    const LIKED_KEY = "wavecraftLikedSongs";
    const PLAYLIST_KEY = "wavecraftPlaylists";

    function readJson(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return fallback;
            const parsed = JSON.parse(raw);
            return parsed == null ? fallback : parsed;
        } catch { return fallback; }
    }
    function writeJson(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
        try { window.dispatchEvent(new StorageEvent("storage", { key })); } catch {
            try { window.dispatchEvent(new Event("storage")); } catch {}
        }
    }
    function songId(song, index) {
        if (!song) return "song-" + index;
        return String(song.id || song.song || song.file || (song.title + "__" + song.artist + "__" + index));
    }
    function normalizeSong(song, index) {
        if (!song) return null;
        const file = song.file || song.song;
        if (!file && !song.title) return null;
        return {
            id: songId(song, index || 0),
            title: song.title || "Unknown song",
            artist: song.artist || "Unknown artist",
            image: song.image || song.playerImage || "img/nav-logo-removebg-preview (1).png",
            file: file || "",
            album: song.album || "",
            likedAt: Number(song.likedAt) || Date.now()
        };
    }
    function getLikedSongs() {
        const seen = new Set();
        return readJson(LIKED_KEY, []).map(normalizeSong).filter((s) => {
            if (!s || seen.has(s.id)) return false;
            seen.add(s.id);
            return true;
        });
    }
    function saveLikedSongs(songs) { writeJson(LIKED_KEY, songs || []); }
    function isLiked(songIdValue) {
        return getLikedSongs().some((s) => String(s.id) === String(songIdValue));
    }
    function toggleLike(song) {
        const normalized = normalizeSong(song, Date.now());
        if (!normalized) return { liked: false, songs: getLikedSongs() };
        let songs = getLikedSongs();
        const exists = songs.some((s) => String(s.id) === String(normalized.id));
        if (exists) songs = songs.filter((s) => String(s.id) !== String(normalized.id));
        else songs = [normalized, ...songs];
        saveLikedSongs(songs);
        return { liked: !exists, songs };
    }
    function normalizePlaylist(raw, index) {
        if (!raw) return null;
        return {
            id: String(raw.id || ("playlist-" + Date.now() + "-" + index)),
            name: String(raw.name || "Untitled Playlist"),
            description: String(raw.description || ""),
            songs: Array.isArray(raw.songs) ? raw.songs.map(normalizeSong).filter(Boolean) : [],
            createdAt: Number(raw.createdAt) || Date.now(),
            artwork: raw.artwork || ""
        };
    }
    function collectSiteSongs() {
        const songs = [];
        try {
            document.querySelectorAll(".music-card").forEach((card, cardIndex) => {
                const playBtn = card.querySelector(".play-btn");
                const likeBtn = card.querySelector(".like-btn");
                if (!playBtn && !likeBtn) return;
                const source = playBtn || likeBtn;
                const datasetTitle = (card.dataset.title || source.dataset.title || "").trim();
                const datasetArtist = (card.dataset.artist || source.dataset.artist || "").trim();
                const file = playBtn ? (playBtn.dataset.song || playBtn.dataset.file || "") : "";
                const image = source.dataset.image || (card.querySelector("img") ? card.querySelector("img").getAttribute("src") : "") || "";
                const titleEl = card.querySelector("h5, h4, h3");
                const title = datasetTitle || (titleEl ? titleEl.textContent.trim() : "") || ("Song " + (cardIndex + 1));
                const artistEl = card.querySelector("p");
                const artist = datasetArtist || (artistEl ? artistEl.textContent.trim() : "") || "Unknown artist";
                const song = normalizeSong({ id: title + "__" + artist, title, artist, image, file }, cardIndex);
                if (song) songs.push(song);
            });
        } catch {}
        return songs;
    }
    function getPlaylists() { return readJson(PLAYLIST_KEY, []).map(normalizePlaylist).filter(Boolean); }
    function savePlaylists(playlists) { writeJson(PLAYLIST_KEY, playlists || []); }
    function createPlaylist(name, description) {
        const playlists = getPlaylists();
        const playlist = {
            id: "playlist-" + Date.now(),
            name: String(name || "My Playlist").trim() || "My Playlist",
            description: String(description || "").trim(),
            songs: [],
            createdAt: Date.now(),
            artwork: ""
        };
        playlists.unshift(playlist);
        savePlaylists(playlists);
        return playlist;
    }
    function deletePlaylist(id) {
        savePlaylists(getPlaylists().filter((p) => String(p.id) !== String(id)));
    }
    function renamePlaylist(id, name, description) {
        const playlists = getPlaylists().map((p) => {
            if (String(p.id) !== String(id)) return p;
            return {
                ...p,
                name: String(name || p.name).trim() || p.name,
                description: description == null ? p.description : String(description)
            };
        });
        savePlaylists(playlists);
        return playlists.find((p) => String(p.id) === String(id)) || null;
    }
    function addSongToPlaylist(playlistId, song) {
        const normalized = normalizeSong(song, Date.now());
        if (!normalized) return { status: "error" };
        const playlists = getPlaylists();
        const playlist = playlists.find((p) => String(p.id) === String(playlistId));
        if (!playlist) return { status: "missing" };
        if (playlist.songs.some((s) => String(s.id) === String(normalized.id))) return { status: "exists", playlist };
        playlist.songs.unshift(normalized);
        savePlaylists(playlists);
        return { status: "added", playlist };
    }
    window.WaveCraftStore = {
        LIKED_KEY, PLAYLIST_KEY, collectSiteSongs, getLikedSongs, saveLikedSongs, isLiked, toggleLike,
        getPlaylists, savePlaylists, createPlaylist, deletePlaylist, renamePlaylist, addSongToPlaylist, normalizeSong
    };
})();
