// =========================================
// WAVECRAFT INTRO VIDEO + LIGHT/DARK MODE
// =========================================


// =========================================
// ELEMENTS
// =========================================

const intro = document.getElementById("intro");
const introVideo = document.getElementById("introVideo");
const mainContent = document.getElementById("main-content");
const themeBtn = document.getElementById("themeBtn");


// =========================================
// INTRO VIDEOS
// =========================================

const darkIntroVideo =
    "video/wavecraft-intro-dark.mp4";

const lightIntroVideo =
    "video/wavecraft-intro-light.mp4";


// =========================================
// GET SAVED THEME
// =========================================

let savedTheme =
    localStorage.getItem("wavecraftTheme");


// If there is no saved theme,
// default to dark mode

if (!savedTheme) {

    savedTheme = "dark";

    localStorage.setItem(
        "wavecraftTheme",
        "dark"
    );

}


// =========================================
// APPLY THE SAVED THEME
// =========================================

function applyTheme() {

    if (savedTheme === "light") {

        document.body.classList.add("light");

    } else {

        document.body.classList.remove("light");

    }

}


// Apply theme immediately

applyTheme();


// =========================================
// UPDATE MOON / SUN ICON
// =========================================

function updateThemeIcon() {

    if (!themeBtn) return;

    const icon =
        themeBtn.querySelector("i");

    if (!icon) return;


    if (
        document.body.classList.contains("light")
    ) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

}


// Update icon when page loads

updateThemeIcon();


// =========================================
// SELECT INTRO VIDEO
// =========================================

function selectIntroVideo() {

    if (!introVideo) return;


    if (savedTheme === "light") {

        introVideo.src =
            lightIntroVideo;

    } else {

        introVideo.src =
            darkIntroVideo;

    }

}


// =========================================
// SHOW MAIN WEBSITE
// =========================================

function revealMainContent() {

    if (intro) {

        intro.style.display = "none";

    }

    if (mainContent) {

        mainContent.style.display = "block";

    }

}


// =========================================
// START INTRO VIDEO
// =========================================

function startIntroVideo() {

    if (!intro || !introVideo) {

        revealMainContent();

        return;

    }


    // Select correct video

    selectIntroVideo();


    // Show intro

    intro.style.display = "block";


    // Hide website

    if (mainContent) {

        mainContent.style.display = "none";

    }


    // Reset video

    introVideo.currentTime = 0;


    // Load selected video

    introVideo.load();


    // Play selected video

    introVideo.play()
        .catch(error => {

            console.log(
                "Intro video could not autoplay:",
                error
            );

            // Don't leave the website stuck

            revealMainContent();

        });

}


// =========================================
// INTRO VIDEO EVENTS
// =========================================

if (introVideo) {


    // Video finished

    introVideo.addEventListener(
        "ended",
        function () {

            revealMainContent();

        }
    );


    // Video error

    introVideo.addEventListener(
        "error",
        function () {

            console.error(
                "WaveCraft intro video failed to load."
            );

            revealMainContent();

        }
    );

}


// =========================================
// PLAY INTRO WHEN PAGE LOADS
// =========================================

startIntroVideo();


// =========================================
// THEME BUTTON
// =========================================

if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        function () {


            // =================================
            // TOGGLE LIGHT / DARK
            // =================================

            document.body.classList.toggle(
                "light"
            );


            // =================================
            // CHECK CURRENT MODE
            // =================================

            if (
                document.body.classList.contains(
                    "light"
                )
            ) {

                savedTheme = "light";

            } else {

                savedTheme = "dark";

            }


            // =================================
            // SAVE THEME
            // =================================

            localStorage.setItem(
                "wavecraftTheme",
                savedTheme
            );


            // =================================
            // UPDATE ICON
            // =================================

            updateThemeIcon();


            // =================================
            // PLAY NEW THEME INTRO
            // =================================

            startIntroVideo();

        }
    );

}

// end of intro video

// SCROLL PROGRESS BAR
const progressBar = document.querySelector(".progress-bar");

function updateProgressBar() {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

    progressBar.style.width = `${scrollPercentage}%`;
}

// listen for scrolling and page load
window.addEventListener("scroll", updateProgressBar);
window.addEventListener("load", updateProgressBar);

// End Of Progress Bar

// menu toggle
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const nav = document.querySelector("nav");
const navLogoHost = document.getElementById("navLogoHost");
const sidebarLogo = document.getElementById("sidebarLogo");
const phoneLayout = window.matchMedia("(max-width: 767px)");

function isPhoneLayout() {
    return phoneLayout.matches;
}

function toggleNavbarLogo() {
    if (!nav || !navLogoHost || !sidebarLogo || !sidebar) return;

    if (isPhoneLayout()) {
        if (sidebarLogo.parentElement !== navLogoHost) {
            navLogoHost.appendChild(sidebarLogo);
        }
        nav.classList.add("nav-with-logo");
        return;
    }

    const sidebarLogoHost = sidebar.querySelector(".nav-logo");
    const isSidebarClosed = sidebar.classList.contains("close");

    if (isSidebarClosed) {
        if (sidebarLogo.parentElement !== navLogoHost) {
            navLogoHost.appendChild(sidebarLogo);
        }
        nav.classList.add("nav-with-logo");
        return;
    }

    if (sidebarLogoHost && sidebarLogo.parentElement !== sidebarLogoHost) {
        sidebarLogoHost.appendChild(sidebarLogo);
    }

    nav.classList.remove("nav-with-logo");
}

function syncPhoneNavigation() {
    if (!menuBtn || !sidebar) return;

    if (isPhoneLayout()) {
        toggleNavbarLogo();
        sidebar.classList.remove("close", "mobile-open");
        sidebar.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
        return;
    }

    sidebar.classList.remove("mobile-open");
    toggleNavbarLogo();
}

if (menuBtn && sidebar) menuBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    if (isPhoneLayout()) {
        const isOpen = sidebar.classList.toggle("mobile-open");
        sidebar.setAttribute("aria-expanded", String(isOpen));
        menuBtn.textContent = isOpen ? "✕" : "☰";
        return;
    }

    // Toggle collapsed state
    const isClosed = sidebar.classList.toggle("close");

    // If collapsed, hide link text but allow icons to be focusable
    if (isClosed) {
        sidebar.setAttribute('aria-expanded', 'false');
    } else {
        sidebar.setAttribute('aria-expanded', 'true');
    }

    toggleNavbarLogo();

    // Expand or reduce main area when the sidebar closes or opens
    const mainArea = document.getElementById("mainArea");
    if (mainArea) {
        mainArea.classList.toggle("expand", isClosed);
    }
});

document.addEventListener("click", function (event) {
    if (isPhoneLayout() && sidebar && menuBtn && !sidebar.contains(event.target)) {
        sidebar.classList.remove("mobile-open");
        sidebar.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
    }
});

syncPhoneNavigation();
phoneLayout.addEventListener("change", syncPhoneNavigation);
// END OF MENU TOGGLE


// NEWSLETTER

const footerSubscribe = document.querySelector(".footer-subscribe");

if (footerSubscribe) {

    footerSubscribe.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = this.querySelector("input").value.trim();

        if (!email) return;

        alert("Thanks for subscribing to WaveCraft!");

        this.reset();

    });

}

// END OF NEWSLETTER


// Scroll to top button
// Select the Button
const scrollTopBtn = document.getElementById("scroll-top");

if (scrollTopBtn) {
    // Listen for Scrolling
    window.addEventListener("scroll", () => {

        // Check if the user has scrolled down
        if (window.scrollY > 300) {

            // Show the Button
            scrollTopBtn.style.display = "block";

        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    // Listen for Button Clicks
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// active navigation links
// select all navigation links
const navlinks = document.querySelectorAll(".nav-link a");

// select all sections
const sections = document.querySelectorAll("section");

// listen for scrolling
window.addEventListener("scroll", () => {
    let currentSection = "";

    // check which section is currently on the screen
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");

        }

    });

    // remove the active class from every link
    navlinks.forEach(link => {
        link.classList.remove("active");

        // add the ative class to the matching link
        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });

});

// LIKED MUSIC LIBRARY
const likedList = document.getElementById("likedSongsList");
const emptyState = document.getElementById("likedEmptyState");
const likedSummary = document.getElementById("likedSummary");
const likedSearch = document.getElementById("likedSearch");
// const likedSort = document.getElementById("likedSort");
let currentLikedSongs = [];

function readJson(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}

function normalizeLikedSong(song, index) {
    if (!song || (!song.song && !song.file)) return null;
    return {
        id: String(song.id || song.song || song.file || `liked-${index}`),
        title: song.title || "Unknown song",
        artist: song.artist || "Unknown artist",
        image: song.image || song.playerImage || "img/nav-logo-removebg-preview (1).png",
        file: song.file || song.song,
        likedAt: Number(song.likedAt) || index
    };
}

function getLikedSongs() {
    const seen = new Set();
    return readJson("wavecraftLikedSongs", []).map(normalizeLikedSong).filter(song => {
        if (!song || seen.has(song.id)) return false;
        seen.add(song.id);
        return true;
    });
}

function saveLikedSongs(songs) {
    localStorage.setItem("wavecraftLikedSongs", JSON.stringify(songs));
    window.dispatchEvent(new StorageEvent("storage", { key: "wavecraftLikedSongs", newValue: JSON.stringify(songs) }));
}

function durationSeconds(duration) {
    const parts = String(duration).split(":").map(Number);
    return parts.length === 2 ? parts[0] * 60 + parts[1] : 0;
}

function formatDuration(seconds) {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function playLikedSong(song, queue = currentLikedSongs) {
    if (window.WaveCraftPlayer) window.WaveCraftPlayer.play(song, queue, queue.findIndex(item => item.id === song.id), true);
}

function removeLikedSong(songId) {
    saveLikedSongs(getLikedSongs().filter(song => song.id !== songId));
    renderLikedSongs();
}

function renderLikedSongs() {
    if (!likedList) return;
    const query = (likedSearch?.value || "").trim().toLowerCase();
    const sort = likedSort?.value || "recent";
    const songs = getLikedSongs();
    currentLikedSongs = songs.slice();
    const filtered = songs.filter(song => [song.title, song.artist].join(" ").toLowerCase().includes(query));
    filtered.sort((a, b) => sort === "duration" ? durationSeconds(a.duration) - durationSeconds(b.duration) : sort === "recent" ? b.likedAt - a.likedAt : String(a[sort]).localeCompare(String(b[sort])));
    const totalSeconds = songs.reduce((total, song) => total + durationSeconds(song.duration), 0);
   
    if (likedSummary) likedSummary.innerHTML = `${songs.length} ${songs.length === 1 ? "song" : "songs"} <span aria-hidden="true">•</span> ${formatDuration(totalSeconds)}`;
    likedList.innerHTML = filtered.map((song, index) => `
        <article class="liked-song" data-song-id="${escapeHtml(song.id)}">

            <span class="liked-song-number">${String(index + 1).padStart(2, "0")}</span>

            <button class="liked-song-main" type="button" data-action="play" aria-label="Play ${escapeHtml(song.title)}">
                <img class="liked-song-art" src="${escapeHtml(song.image)}" alt="${escapeHtml(song.title)} cover" loading="lazy">
                <span><span class="liked-song-title">${escapeHtml(song.title)}</span></span>
            </button>

            <span class="liked-song-artist liked-song-album">${escapeHtml(song.artist)}</span>
            <span class="liked-song-actions">
            <button type="button" data-action="like" class="is-liked" aria-label="Remove ${escapeHtml(song.title)} from liked music">
            <i class="ri-heart-fill"></i></button>
            <button type="button" data-action="playlist" aria-label="Add ${escapeHtml(song.title)} to playlist">
            <i class="ri-add-line"></i></button>
            <button type="button" data-action="more" aria-label="More options for ${escapeHtml(song.title)}">
            <i class="ri-more-fill"></i></button>
            </span>

        </article>`).join("");

    if (emptyState) emptyState.hidden = songs.length > 0;
    if (!songs.length) likedList.innerHTML = "";
    if (songs.length && !filtered.length) likedList.innerHTML = `<p class="liked-no-results">No matching songs found.</p>`;
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[character]));
}

function getPlaylists() { return readJson("wavecraftPlaylists", []); }
function savePlaylists(playlists) { localStorage.setItem("wavecraftPlaylists", JSON.stringify(playlists)); }

function openPlaylistModal(song) {
    const playlists = getPlaylists();
    const modal = document.createElement("div");
    modal.className = "liked-modal-backdrop";
    modal.innerHTML = `<div class="liked-modal" role="dialog" aria-modal="true" aria-labelledby="playlistModalTitle">
    <button class="liked-modal-close" type="button" aria-label="Close">×</button><h2 id="playlistModalTitle">Add to playlist</h2><button class="liked-create-playlist" type="button">
    + Create new playlist</button><div class="liked-playlist-options">${playlists.map((playlist, index) => `<button type="button" data-playlist-index="${index}">${escapeHtml(playlist.name || "Untitled playlist")}</button>`).join("") || "<p>No playlists yet.</p>"}</div></div>`;
    document.body.appendChild(modal);
    const close = () => modal.remove();
    modal.querySelector(".liked-modal-close").addEventListener("click", close);
    modal.addEventListener("click", event => { if (event.target === modal) close(); });
    modal.querySelectorAll("[data-playlist-index]").forEach(button => button.addEventListener("click", () => { const next = playlists[Number(button.dataset.playlistIndex)]; next.songs = Array.isArray(next.songs) ? next.songs : []; if (!next.songs.some(item => item.id === song.id)) next.songs.push(song); savePlaylists(playlists); close(); }));
    modal.querySelector(".liked-create-playlist").addEventListener("click", () => openCreatePlaylistModal(song, close));
}

function openCreatePlaylistModal(song, parentClose) {
    parentClose();
    const modal = document.createElement("div");
    modal.className = "liked-modal-backdrop";
    modal.innerHTML = `<form class="liked-modal" id="createPlaylistForm" role="dialog" aria-modal="true" aria-labelledby="createPlaylistTitle"><button class="liked-modal-close" type="button" aria-label="Close">×</button><h2 id="createPlaylistTitle">Create playlist</h2><label>Playlist name<input name="name" required maxlength="60" placeholder="My playlist"></label><label>Description<input name="description" maxlength="120" placeholder="Add a description"></label><div class="liked-modal-actions"><button type="button" class="liked-cancel">Cancel</button><button type="submit" class="liked-primary-btn">Create playlist</button></div></form>`;
    document.body.appendChild(modal);
    const close = () => modal.remove();
    modal.querySelector(".liked-modal-close").addEventListener("click", close);
    modal.querySelector(".liked-cancel").addEventListener("click", close);
    modal.addEventListener("click", event => { if (event.target === modal) close(); });
    modal.querySelector("form").addEventListener("submit", event => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const playlists = getPlaylists();
        playlists.push({ id: `playlist-${Date.now()}`, name: String(form.get("name")).trim(), description: String(form.get("description") || "").trim(), songs: [song] });
        savePlaylists(playlists);
        close();
    });
}

function openMoreMenu(song) {
    const modal = document.createElement("div");
    modal.className = "liked-modal-backdrop";
    modal.innerHTML = `<div class="liked-modal" role="dialog" aria-modal="true" aria-labelledby="likedMoreTitle"><button class="liked-modal-close" type="button" aria-label="Close">×</button><h2 id="likedMoreTitle">${escapeHtml(song.title)}</h2><div class="liked-more-options"><button type="button" data-more-action="play"><i class="ri-play-line"></i> Play</button><button type="button" data-more-action="next"><i class="ri-skip-forward-line"></i> Play next</button><button type="button" data-more-action="playlist"><i class="ri-add-line"></i> Add to playlist</button><button type="button" data-more-action="remove"><i class="ri-heart-unfill"></i> Remove from liked music</button></div></div>`;
    document.body.appendChild(modal);
    const close = () => modal.remove();
    modal.querySelector(".liked-modal-close").addEventListener("click", close);
    modal.addEventListener("click", event => { if (event.target === modal) close(); });
    modal.querySelectorAll("[data-more-action]").forEach(button => button.addEventListener("click", () => {
        const action = button.dataset.moreAction;
        if (action === "play") playLikedSong(song);
        if (action === "next" && window.WaveCraftPlayer) window.WaveCraftPlayer.play(song, currentLikedSongs, currentLikedSongs.findIndex(item => item.id === song.id), true);
        if (action === "playlist") openPlaylistModal(song);
        if (action === "remove") removeLikedSong(song.id);
        close();
    }));
}

likedList?.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    const row = event.target.closest("[data-song-id]");
    if (!button || !row) return;
    const song = getLikedSongs().find(item => item.id === row.dataset.songId);
    if (!song) return;
    if (button.dataset.action === "play") playLikedSong(song);
    if (button.dataset.action === "like") removeLikedSong(song.id);
    if (button.dataset.action === "playlist") openPlaylistModal(song);
    if (button.dataset.action === "more") openMoreMenu(song);
});

document.getElementById("playLikedBtn")?.addEventListener("click", () => { const songs = getLikedSongs(); if (songs[0]) playLikedSong(songs[0], songs); });
document.getElementById("shuffleLikedBtn")?.addEventListener("click", () => { const songs = getLikedSongs().sort(() => Math.random() - .5); if (songs[0]) playLikedSong(songs[0], songs); });
likedSearch?.addEventListener("input", renderLikedSongs);
likedSort?.addEventListener("change", renderLikedSongs);
window.addEventListener("storage", event => { if (event.key === "wavecraftLikedSongs") renderLikedSongs(); });
const menuButton = document.getElementById("menuBtn");
const likedSidebar = document.getElementById("sidebar");
const likedNav = document.querySelector("nav");
renderLikedSongs();
// end of liked music page





// Scroll to top button
// Select the Button

if (scrollTopBtn) {
    // Listen for Scrolling
    window.addEventListener("scroll", () => {

        // Check if the user has scrolled down
        if (window.scrollY > 300) {

            // Show the Button
            scrollTopBtn.style.display = "block";

        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    // Listen for Button Clicks
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// active navigation links
// select all navigation links

// select all sections

// listen for scrolling
window.addEventListener("scroll", () => {
    let currentSection = "";

    // check which section is currently on the screen
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");

        }

    });

    // remove the active class from every link
    navlinks.forEach(link => {
        link.classList.remove("active");

        // add the ative class to the matching link
        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });

});