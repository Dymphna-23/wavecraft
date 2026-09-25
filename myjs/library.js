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

/* =========================================================
   WAVECRAFT — LIBRARY
   CONNECTS TO THE EXISTING:
   - wavecraftLikedSongs
   - wavecraftPlaylists
   - WaveCraft Music Player
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       STORAGE KEYS
    ===================================================== */

    const LIKED_KEY = "wavecraftLikedSongs";
    const PLAYLIST_KEY = "wavecraftPlaylists";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const playlistGrid =
        document.getElementById("playlistGrid");

    const likedSection =
        document.getElementById("likedSection");

    const likedCount =
        document.querySelector(".wc-song-count");

    const playLikedBtn =
        document.getElementById("playLikedBtn");

    const searchInput =
        document.getElementById("librarySearchInput");

    const searchClearBtn =
        document.getElementById("searchClearBtn");

    const emptyPlaylistState =
        document.getElementById("emptyPlaylistState");

    const createPlaylistBtn =
        document.getElementById("createPlaylistBtn");

    const emptyCreatePlaylistBtn =
        document.getElementById("emptyCreatePlaylistBtn");

    const filterButtons =
        document.querySelectorAll(".wc-filter-btn");


    /* =====================================================
       GET EXISTING LIKED SONGS
    ===================================================== */

    function getLikedSongs() {

        try {

            return JSON.parse(
                localStorage.getItem(LIKED_KEY)
            ) || [];

        } catch (error) {

            console.error(
                "WaveCraft: Could not load liked songs.",
                error
            );

            return [];

        }

    }


    /* =====================================================
       GET EXISTING PLAYLISTS
    ===================================================== */

    function getPlaylists() {

        try {

            return JSON.parse(
                localStorage.getItem(PLAYLIST_KEY)
            ) || [];

        } catch (error) {

            console.error(
                "WaveCraft: Could not load playlists.",
                error
            );

            return [];

        }

    }


    /* =====================================================
       SAVE PLAYLISTS
    ===================================================== */

    function savePlaylists(playlists) {

        localStorage.setItem(
            PLAYLIST_KEY,
            JSON.stringify(playlists)
        );

    }


    /* =====================================================
       UPDATE LIKED SONG COUNT
    ===================================================== */

    function updateLikedCount() {

        const likedSongs =
            getLikedSongs();

        if (!likedCount) return;

        const count =
            likedSongs.length;

        likedCount.textContent =
            `${count} ${
                count === 1
                    ? "song"
                    : "songs"
            }`;

    }


    /* =====================================================
       RENDER EXISTING PLAYLISTS
    ===================================================== */

    function renderPlaylists(
        searchTerm = ""
    ) {

        if (!playlistGrid) return;


        const playlists =
            getPlaylists();


        playlistGrid.innerHTML = "";


        const query =
            searchTerm
                .trim()
                .toLowerCase();


        const filtered =
            playlists.filter(
                playlist => {

                    if (!query) {
                        return true;
                    }

                    const name =
                        String(
                            playlist.name || ""
                        ).toLowerCase();

                    const description =
                        String(
                            playlist.description || ""
                        ).toLowerCase();

                    return (
                        name.includes(query) ||
                        description.includes(query)
                    );

                }
            );


        /* =================================================
           NO PLAYLISTS
        ================================================= */

        if (filtered.length === 0) {

            if (emptyPlaylistState) {

                emptyPlaylistState.hidden =
                    false;

                const title =
                    emptyPlaylistState.querySelector("h3");

                const text =
                    emptyPlaylistState.querySelector("p");


                if (title) {

                    title.textContent =
                        query
                            ? "No playlists found"
                            : "No playlists yet";

                }


                if (text) {

                    text.textContent =
                        query
                            ? "Try another search."
                            : "Create a playlist and it will appear here.";

                }

            }

            return;

        }


        /* =================================================
           HIDE EMPTY STATE
        ================================================= */

        if (emptyPlaylistState) {

            emptyPlaylistState.hidden =
                true;

        }


        /* =================================================
           CREATE CARDS
        ================================================= */

        filtered.forEach(
            playlist => {

                const card =
                    createPlaylistCard(
                        playlist
                    );

                playlistGrid.appendChild(
                    card
                );

            }
        );

    }


    /* =====================================================
       CREATE PLAYLIST CARD
    ===================================================== */

    function createPlaylistCard(
        playlist
    ) {

        const card =
            document.createElement("article");


        card.className =
            "wc-playlist-card";


        card.dataset.playlistId =
            playlist.id;


        const image =
            playlist.image ||
            playlist.artwork ||
            "img/som-choice.png";


        const songs =
            Array.isArray(
                playlist.songs
            )
                ? playlist.songs
                : [];


        const songCount =
            songs.length;


        card.innerHTML = `

            <div class="wc-playlist-card-image">

                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(
                        playlist.name || "Playlist"
                    )}"
                    loading="lazy"
                >

                <button
                    type="button"
                    class="wc-playlist-card-play"
                    aria-label="Play ${
                        escapeHTML(
                            playlist.name || "playlist"
                        )
                    }"
                >

                    <i class="ri-play-fill"></i>

                </button>

            </div>


            <div class="wc-playlist-card-info">

                <h3 class="wc-playlist-card-title">
                    ${escapeHTML(
                        playlist.name || "Untitled Playlist"
                    )}
                </h3>

                <p class="wc-playlist-card-meta">

                    Playlist • ${songCount}
                    ${
                        songCount === 1
                            ? "song"
                            : "songs"
                    }

                </p>

            </div>

        `;


        /* =================================================
           PLAY BUTTON
        ================================================= */

        const playButton =
            card.querySelector(
                ".wc-playlist-card-play"
            );


        if (playButton) {

            playButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    playPlaylist(
                        playlist
                    );

                }
            );

        }


        /* =================================================
           OPEN PLAYLIST
        ================================================= */

        card.addEventListener(
            "click",
            function () {

                openPlaylist(
                    playlist
                );

            }
        );


        return card;

    }


    /* =====================================================
       OPEN PLAYLIST PAGE
    ===================================================== */

    function openPlaylist(
        playlist
    ) {

        if (!playlist || !playlist.id) {

            console.error(
                "WaveCraft: Invalid playlist."
            );

            return;

        }


        /*
         * Keep the exact existing playlist ID.
         */

        localStorage.setItem(
            "wavecraftCurrentPlaylist",
            playlist.id
        );


        /*
         * Open the dedicated playlist page.
         */

        window.location.href =
            `playlist.html?playlist=${encodeURIComponent(
                playlist.id
            )}`;

    }


    /* =====================================================
       PLAY PLAYLIST
    ===================================================== */

    function playPlaylist(
        playlist
    ) {

        if (!playlist) return;


        const songs =
            Array.isArray(
                playlist.songs
            )
                ? playlist.songs
                : [];


        if (songs.length === 0) {

            showMessage(
                `"${playlist.name}" has no songs yet.`
            );

            return;

        }


        /*
         * Save current queue so the
         * existing WaveCraft player can
         * continue through the playlist.
         */

        localStorage.setItem(
            "wavecraftCurrentQueue",
            JSON.stringify(songs)
        );


        localStorage.setItem(
            "wavecraftQueueIndex",
            "0"
        );


        playSong(
            songs[0]
        );

    }


    /* =====================================================
       PLAY LIKED MUSIC
    ===================================================== */

    function playLikedMusic() {

        const likedSongs =
            getLikedSongs();


        if (likedSongs.length === 0) {

            showMessage(
                "You don't have any liked songs yet."
            );

            return;

        }


        /*
         * Save liked songs as the
         * current playback queue.
         */

        localStorage.setItem(
            "wavecraftCurrentQueue",
            JSON.stringify(
                likedSongs
            )
        );


        localStorage.setItem(
            "wavecraftQueueIndex",
            "0"
        );


        playSong(
            likedSongs[0]
        );

    }


    /* =====================================================
       PLAY SONG USING EXISTING WAVECRAFT PLAYER
    ===================================================== */

    function playSong(
        song
    ) {

        if (!song) return;


        /*
         * Your existing WaveCraft player
         * already uses #audioPlayer.
         */

        const audioPlayer =
            document.getElementById(
                "audioPlayer"
            );


        const musicPlayer =
            document.getElementById(
                "musicPlayer"
            );


        if (!audioPlayer) {

            console.error(
                "WaveCraft: #audioPlayer not found."
            );

            return;

        }


        /* ================================================
           PLAYER IMAGE
        ================================================ */

        const playerImage =
            document.getElementById(
                "playerImage"
            );


        if (playerImage) {

            playerImage.src =
                song.playerImage ||
                song.image ||
                "img/som-choice.png";

            playerImage.alt =
                song.title ||
                "Song";

        }


        /* ================================================
           PLAYER TITLE
        ================================================ */

        const playerTitle =
            document.getElementById(
                "playerTitle"
            );


        if (playerTitle) {

            playerTitle.textContent =
                song.title ||
                "Unknown Song";

        }


        /* ================================================
           PLAYER ARTIST
        ================================================ */

        const playerArtist =
            document.getElementById(
                "playerArtist"
            );


        if (playerArtist) {

            playerArtist.textContent =
                song.artist ||
                "Unknown Artist";

        }


        /* ================================================
           AUDIO FILE
        ================================================ */

        const audioSource =
            song.song ||
            song.audio ||
            song.src;


        if (!audioSource) {

            console.error(
                "WaveCraft: This song has no audio file.",
                song
            );

            showMessage(
                "This song does not have an audio file."
            );

            return;

        }


        audioPlayer.src =
            audioSource;

        audioPlayer.load();


        /* ================================================
           SHOW PLAYER
        ================================================ */

        if (musicPlayer) {

            musicPlayer.classList.add(
                "active"
            );

        }


        /* ================================================
           SAVE CURRENT SONG
        ================================================ */

        localStorage.setItem(
            "wavecraftCurrentSong",
            JSON.stringify(
                song
            )
        );


        /* ================================================
           PLAY
        ================================================ */

        const playPromise =
            audioPlayer.play();


        if (
            playPromise !== undefined
        ) {

            playPromise.catch(
                error => {

                    console.warn(
                        "WaveCraft playback could not start:",
                        error
                    );

                }
            );

        }

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const value =
                    this.value;


                renderPlaylists(
                    value
                );


                if (
                    searchClearBtn
                ) {

                    searchClearBtn.classList.toggle(
                        "visible",
                        value.length > 0
                    );

                }

            }
        );

    }


    /* =====================================================
       CLEAR SEARCH
    ===================================================== */

    if (searchClearBtn) {

        searchClearBtn.addEventListener(
            "click",
            function () {

                if (!searchInput) return;


                searchInput.value =
                    "";


                renderPlaylists(
                    ""
                );


                this.classList.remove(
                    "visible"
                );


                searchInput.focus();

            }
        );

    }


    /* =====================================================
       PLAY LIKED BUTTON
    ===================================================== */

    if (playLikedBtn) {

        playLikedBtn.addEventListener(
            "click",
            function () {

                playLikedMusic();

            }
        );

    }


    /* =====================================================
       FILTER BUTTONS
    ===================================================== */

    filterButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                    this.classList.add(
                        "active"
                    );


                    const filter =
                        this.dataset.filter;


                    if (
                        filter === "liked"
                    ) {

                        window.location.href =
                            "liked.html";

                        return;

                    }


                    if (
                        filter === "albums"
                    ) {

                        showMessage(
                            "Albums will appear here."
                        );

                        return;

                    }


                    if (
                        filter === "artists"
                    ) {

                        window.location.href =
                            "artist.html";

                        return;

                    }


                    renderPlaylists(
                        searchInput
                            ? searchInput.value
                            : ""
                    );

                }
            );

        }
    );


    /* =====================================================
       CREATE PLAYLIST
    ===================================================== */

    if (createPlaylistBtn) {

        createPlaylistBtn.addEventListener(
            "click",
            createNewPlaylist
        );

    }


    if (emptyCreatePlaylistBtn) {

        emptyCreatePlaylistBtn.addEventListener(
            "click",
            createNewPlaylist
        );

    }


    function createNewPlaylist() {

        const name =
            prompt(
                "Enter a name for your new playlist:"
            );


        if (!name) return;


        const cleanName =
            name.trim();


        if (!cleanName) return;


        const playlists =
            getPlaylists();


        const alreadyExists =
            playlists.some(
                playlist =>
                    String(
                        playlist.name || ""
                    ).toLowerCase() ===
                    cleanName.toLowerCase()
            );


        if (alreadyExists) {

            showMessage(
                "A playlist with that name already exists."
            );

            return;

        }


        const newPlaylist = {

            id:
                createPlaylistId(
                    cleanName,
                    playlists
                ),

            name:
                cleanName,

            image:
                "img/som-choice.png",

            description:
                "A WaveCraft playlist.",

            songs:
                [],

            createdAt:
                Date.now()

        };


        playlists.push(
            newPlaylist
        );


        savePlaylists(
            playlists
        );


        renderPlaylists(
            searchInput
                ? searchInput.value
                : ""
        );


        showMessage(
            `"${cleanName}" playlist created.`
        );

    }


    /* =====================================================
       CREATE UNIQUE PLAYLIST ID
    ===================================================== */

    function createPlaylistId(
        name,
        playlists
    ) {

        let base =
            name
                .toLowerCase()
                .replace(
                    /[^a-z0-9]+/g,
                    "-"
                )
                .replace(
                    /^-+|-+$/g,
                    ""
                );


        if (!base) {

            base =
                "playlist";

        }


        let id =
            base;

        let number =
            2;


        while (
            playlists.some(
                playlist =>
                    playlist.id === id
            )
        ) {

            id =
                `${base}-${number}`;

            number++;

        }


        return id;

    }


    /* =====================================================
       ADD SONG TO EXISTING PLAYLIST
    ===================================================== */

    function addSongToPlaylist(
        song,
        playlistId
    ) {

        const playlists =
            getPlaylists();


        const playlist =
            playlists.find(
                item =>
                    item.id ===
                    playlistId
            );


        if (!playlist) {

            showMessage(
                "Playlist not found."
            );

            return;

        }


        if (!Array.isArray(
            playlist.songs
        )) {

            playlist.songs =
                [];

        }


        const songId =
            getSongId(
                song
            );


        const alreadyAdded =
            playlist.songs.some(
                existingSong =>
                    getSongId(
                        existingSong
                    ) === songId
            );


        if (alreadyAdded) {

            showMessage(
                `"${song.title}" is already in ${playlist.name}.`
            );

            return;

        }


        playlist.songs.push(
            song
        );


        savePlaylists(
            playlists
        );


        showMessage(
            `"${song.title}" added to ${playlist.name}.`
        );

    }


    /* =====================================================
       REMOVE SONG FROM PLAYLIST
    ===================================================== */

    function removeSongFromPlaylist(
        song,
        playlistId
    ) {

        const playlists =
            getPlaylists();


        const playlist =
            playlists.find(
                item =>
                    item.id ===
                    playlistId
            );


        if (!playlist) return;


        const songId =
            getSongId(
                song
            );


        playlist.songs =
            (playlist.songs || [])
                .filter(
                    item =>
                        getSongId(
                            item
                        ) !== songId
                );


        savePlaylists(
            playlists
        );

    }


    /* =====================================================
       SONG ID
    ===================================================== */

    function getSongId(
        song
    ) {

        if (!song) {
            return "";
        }


        return String(

            song.id ||

            song.song ||

            song.audio ||

            `${song.title || ""}-${
                song.artist || ""
            }`

        ).toLowerCase();

    }


    /* =====================================================
       GLOBAL LIBRARY API
    ===================================================== */

    /*
     * Other WaveCraft pages can use this.
     *
     * Example:
     *
     * WaveCraftLibrary.addSongToPlaylist(
     *     song,
     *     playlistId
     * );
     */

    window.WaveCraftLibrary = {

        getLikedSongs,

        getPlaylists,

        addSongToPlaylist,

        removeSongFromPlaylist,

        playSong,

        playPlaylist,

        playLikedMusic,

        openPlaylist,

        refresh: function () {

            updateLikedCount();

            renderPlaylists(
                searchInput
                    ? searchInput.value
                    : ""
            );

        }

    };


    /* =====================================================
       STORAGE SYNCHRONIZATION
    ===================================================== */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                LIKED_KEY
            ) {

                updateLikedCount();

            }


            if (
                event.key ===
                PLAYLIST_KEY
            ) {

                renderPlaylists(
                    searchInput
                        ? searchInput.value
                        : ""
                );

            }

        }
    );


    /* =====================================================
       CUSTOM WAVECRAFT EVENTS
    ===================================================== */

    window.addEventListener(
        "wavecraft:likedChanged",
        function () {

            updateLikedCount();

        }
    );


    window.addEventListener(
        "wavecraft:playlistUpdated",
        function () {

            renderPlaylists(
                searchInput
                    ? searchInput.value
                    : ""
            );

        }
    );


    /* =====================================================
       MESSAGE
    ===================================================== */

    function showMessage(
        message
    ) {

        let box =
            document.getElementById(
                "libraryMessage"
            );


        if (!box) {

            box =
                document.createElement(
                    "div"
                );

            box.id =
                "libraryMessage";

            box.className =
                "wc-library-message";

            document.body.appendChild(
                box
            );

        }


        box.textContent =
            message;


        box.classList.add(
            "show"
        );


        clearTimeout(
            box.timer
        );


        box.timer =
            setTimeout(
                function () {

                    box.classList.remove(
                        "show"
                    );

                },
                2500
            );

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(
        value
    ) {

        return String(
            value
        )
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateLikedCount();

    renderPlaylists();

});

// ============================================
// WAVECRAFT AUTH / PROFILE NAVIGATION
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const authLink = document.getElementById("authLink");
    const authText = document.getElementById("authText");
    const authIcon = document.getElementById("authIcon");

    // Stop if the elements do not exist
    if (!authLink || !authText) return;


    // ============================================
    // GET SAVED WAVECRAFT USER
    // ============================================

    const savedUser = localStorage.getItem("wavecraftUser");


    // ============================================
    // USER IS NOT LOGGED IN
    // ============================================

    if (!savedUser) {

        // Show normal Sign Up link
        authLink.href = "signup.html";

        authText.textContent = "Sign Up";

        // Show user icon
        if (authIcon) {
            authIcon.style.display = "inline-block";
        }

        // Remove profile styling
        authLink.classList.remove("logged-in");

        return;
    }


    // ============================================
    // GET USER DATA
    // ============================================

    let user;

    try {

        user = JSON.parse(savedUser);

    } catch (error) {

        console.error(
            "WaveCraft user data is invalid:",
            error
        );

        localStorage.removeItem("wavecraftUser");

        authLink.href = "signup.html";
        authText.textContent = "Sign Up";

        if (authIcon) {
            authIcon.style.display = "inline-block";
        }

        return;
    }


    // ============================================
    // CREATE USER INITIALS
    // ============================================

    const firstInitial = user.firstName
        ? user.firstName.charAt(0).toUpperCase()
        : "";

    const lastInitial = user.lastName
        ? user.lastName.charAt(0).toUpperCase()
        : "";


    const initials =
        firstInitial + lastInitial;


    // ============================================
    // CHANGE AUTH LINK INTO PROFILE BUTTON
    // ============================================

    authText.textContent = initials;

    authLink.href = "profile.html";


    // ============================================
    // HIDE USER ICON
    // ============================================

    if (authIcon) {
        authIcon.style.display = "none";
    }


    // ============================================
    // APPLY PROFILE BUTTON CLASS
    // ============================================

    authLink.classList.add("logged-in");

});

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