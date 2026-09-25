
// WAVECRAFT INTRO VIDEO + LIGHT/DARK MODE
// ELEMENTS

const intro = document.getElementById("intro");
const introVideo = document.getElementById("introVideo");
const mainContent = document.getElementById("main-content");
const themeBtn = document.getElementById("themeBtn");

// INTRO VIDEOS

const darkIntroVideo =
    "video/wavecraft-intro-dark.mov";

const lightIntroVideo =
    "video/wavecraft-intro-light.mov";

// GET SAVED THEME

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

// APPLY THE SAVED THEME

function applyTheme() {

    if (savedTheme === "light") {

        document.body.classList.add("light");

    } else {

        document.body.classList.remove("light");

    }

}


// Apply theme immediately

applyTheme();

// UPDATE MOON / SUN ICON

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

// SELECT INTRO VIDEO

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

// SHOW MAIN WEBSITE

function revealMainContent() {

    if (intro) {

        intro.style.display = "none";

    }

    if (mainContent) {

        mainContent.style.display = "block";

    }

}


// START INTRO VIDEO

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


// INTRO VIDEO EVENTS

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


// PLAY INTRO WHEN PAGE LOADS

startIntroVideo();

// THEME BUTTON

if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        function () {

            // TOGGLE LIGHT / DARK

            document.body.classList.toggle(
                "light"
            );

            // CHECK CURRENT MODE

            if (
                document.body.classList.contains(
                    "light"
                )
            ) {

                savedTheme = "light";

            } else {

                savedTheme = "dark";

            }

            // SAVE THEME

            localStorage.setItem(
                "wavecraftTheme",
                savedTheme
            );


            // UPDATE ICON

            updateThemeIcon();


            // PLAY NEW THEME INTRO

            startIntroVideo();

        }
    );

}
// end of intro video

// PRE-LOADER
// =====================================================
// WAVECRAFT INTRO VIDEO — PLAY ONLY ONCE
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const preloader = document.getElementById("preloader");
    const introVideo = document.getElementById("intro-video");

    // -------------------------------------------------
    // Stop if the elements do not exist
    // -------------------------------------------------

    if (!preloader || !introVideo) {
        return;
    }


    // =================================================
    // STORAGE KEY
    // =================================================

    const INTRO_STORAGE_KEY = "wavecraftIntroPlayed";


    // =================================================
    // CHECK IF INTRO HAS ALREADY PLAYED
    // =================================================

    const introAlreadyPlayed =
        localStorage.getItem(INTRO_STORAGE_KEY);


    // =================================================
    // IF ALREADY PLAYED
    // SKIP INTRO COMPLETELY
    // =================================================

    if (introAlreadyPlayed === "true") {

        preloader.classList.add("hide");

        // Make sure video does not continue playing
        introVideo.pause();

        return;
    }


    // =================================================
    // FIRST VISIT
    // SHOW AND PREPARE INTRO
    // =================================================

    preloader.classList.remove("hide");

    introVideo.muted = true;
    introVideo.autoplay = true;
    introVideo.playsInline = true;
    introVideo.preload = "auto";


    // =================================================
    // FINISH INTRO
    // =================================================

    function finishIntro() {

        // Prevent this function from running repeatedly
        if (localStorage.getItem(INTRO_STORAGE_KEY) === "true") {
            return;
        }


        // Remember that the intro has played
        localStorage.setItem(
            INTRO_STORAGE_KEY,
            "true"
        );


        // Stop video
        introVideo.pause();


        // Hide preloader
        preloader.classList.add("hide");

    }


    // =================================================
    // VIDEO FINISHED
    // =================================================

    introVideo.addEventListener(
        "ended",
        finishIntro,
        { once: true }
    );


    // =================================================
    // VIDEO ERROR
    // =================================================

    introVideo.addEventListener(
        "error",
        function () {

            console.error(
                "WaveCraft intro video could not be loaded."
            );

            // Do NOT mark as played if the video failed.
            // This allows it to try again next time.
            preloader.classList.add("hide");

        },
        { once: true }
    );


    // =================================================
    // PLAY VIDEO
    // =================================================

    const playIntro = () => {

        introVideo.play()
            .then(() => {

                console.log(
                    "WaveCraft intro video started."
                );

            })
            .catch(error => {

                console.warn(
                    "WaveCraft intro video could not autoplay:",
                    error
                );

                // Don't leave the website stuck
                preloader.classList.add("hide");

            });

    };


    // =================================================
    // WAIT UNTIL VIDEO IS READY
    // =================================================

    if (introVideo.readyState >= 2) {

        playIntro();

    } else {

        introVideo.addEventListener(
            "canplay",
            playIntro,
            { once: true }
        );

        introVideo.load();

    }


    // =================================================
    // SAFETY TIMEOUT
    // =================================================

    // If something goes wrong and the video never
    // finishes, don't leave the website stuck.

    setTimeout(function () {

        if (
            localStorage.getItem(
                INTRO_STORAGE_KEY
            ) !== "true"
        ) {

            console.warn(
                "WaveCraft intro timeout."
            );

            // Mark as played after timeout so the
            // user is not forced to see a broken intro
            // repeatedly.

            localStorage.setItem(
                INTRO_STORAGE_KEY,
                "true"
            );

            introVideo.pause();

            preloader.classList.add("hide");
        }

    }, 10000);

});
// END OF PRE-LOADER


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
        sidebar.setAttribute('aria-expanded','false');
    } else {
        sidebar.setAttribute('aria-expanded','true');
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
// end of sign up profile

// HERO SECTION CAROUSEL
const slides = document.querySelectorAll(".carousel-item");
let current = 0;

function showSlide(index) {
    slides[current].classList.remove("active");

    current = (index + slides.length) % slides.length;

    slides[current].classList.add("active");
}

document.querySelector(".carousel-control-next").onclick = () => {
    showSlide(current + 1);
};

document.querySelector(".carousel-control-prev").onclick = () => {
    showSlide(current - 1);
};

setInterval(() => {
    showSlide(current + 1);
}, 5000);
// END OF HERO SECTION CAROUSEL



// WAVECRAFT — GLOBAL MUSIC SEARCH
//  Searches ALL music available on the website 

const searchContainer = document.getElementById("searchContainer");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

const searchSuggestions =
    document.getElementById("searchSuggestions");

const searchResultContent =
    document.getElementById("searchResultContent");

const searchAudio =
    document.getElementById("audioPlayer");

const searchMusicPlayer =
    document.getElementById("musicPlayer");

const searchPlayerImage =
    document.getElementById("playerImage");

const searchPlayerTitle =
    document.getElementById("playerTitle");

const searchPlayerArtist =
    document.getElementById("playerArtist");

let externalGenreSongs = [];

function preloadGenreCatalog() {
    const frame = document.createElement("iframe");
    frame.src = "genre.html";
    frame.title = "";
    frame.hidden = true;
    frame.addEventListener("load", () => {
        const catalog = frame.contentWindow.wavecraftGenreCatalog;
        if (Array.isArray(catalog)) {
            externalGenreSongs = catalog;
            if (searchInput && searchInput.value.trim()) {
                performSearch();
            }
        }
        frame.remove();
    }, { once: true });
    document.body.appendChild(frame);
}

preloadGenreCatalog();


// GET SONG FROM DATA 

function createSearchSong(
    title,
    artist,
    image,
    song,
    element = null,
    playFunction = null
) {

    if (!title || !artist || !song) {
        return null;
    }

    return {

        title: String(title).trim(),

        artist: String(artist).trim(),

        image: image || "",

        song: song,

        element: element,

        playFunction: playFunction

    };

}


// GET ALL SONGS 

function getAllSongs() {

    const songs = [];

    externalGenreSongs.forEach(song => {
        const searchableSong = createSearchSong(
            song.title,
            song.artist,
            song.image,
            song.file || song.song
        );
        if (searchableSong) songs.push(searchableSong);
    });


    // 1. NORMAL MUSIC CARDS 

    document
        .querySelectorAll(".music-card")
        .forEach(card => {

            const title =
                card.dataset.title;

            const artist =
                card.dataset.artist;

            const imageElement =
                card.querySelector(
                    ".music-card-image img"
                );

            const image =
                imageElement
                    ? imageElement.src
                    : card.dataset.image || "";

            const playButton =
                card.querySelector(".play-btn");

            const songFile =
                playButton
                    ? playButton.dataset.song
                    : card.dataset.song || "";

            const song =
                createSearchSong(
                    title,
                    artist,
                    image,
                    songFile,
                    card,
                    playButton
                        ? () => playSearchButton(playButton)
                        : null
                );

            if (song) {
                songs.push(song);
            }

        });


    // 2. TOP CHARTS 

    document
        .querySelectorAll(".top-chart-card")
        .forEach(card => {

            const title =
                card.querySelector(
                    ".top-chart-title"
                )?.textContent.trim();

            const artist =
                card.querySelector(
                    ".top-chart-artist"
                )?.textContent.trim();

            const imageElement =
                card.querySelector(
                    ".top-chart-image"
                );

            const image =
                imageElement
                    ? imageElement.src
                    : "";

            const playButton =
                card.querySelector(
                    ".top-chart-play"
                );

            const songFile =
                playButton
                    ? playButton.dataset.song
                    : "";

            const song =
                createSearchSong(
                    title,
                    artist,
                    image,
                    songFile,
                    card,
                    playButton
                        ? () => playSearchButton(playButton)
                        : null
                );

            if (song) {
                songs.push(song);
            }

        });


    // 3. RECOMMENDED ALBUMS
    // Uses the wavecraftAlbums array you already created.

    if (
        typeof wavecraftAlbums !== "undefined" &&
        Array.isArray(wavecraftAlbums)
    ) {

        wavecraftAlbums.forEach(album => {

            if (
                !album.song ||
                !album.song.file
            ) {
                return;
            }

            const card =
                document.querySelector(
                    `.album-card[data-album-id="${album.id}"]`
                );

            const song =
                createSearchSong(

                    album.song.title,

                    album.song.artist,

                    album.song.image ||
                    album.image,

                    album.song.file,

                    card,

                    card
                        ? () => playAlbum(
                            album,
                            card
                        )
                        : null

                );

            if (song) {
                songs.push(song);
            }

        });

    }


    // 4. UP & COMING ARTISTS
    //    Uses upcomingArtists array.

    if (
        typeof upcomingArtists !== "undefined" &&
        Array.isArray(upcomingArtists)
    ) {

        upcomingArtists.forEach(upcoming => {

            const card =
                document.querySelector(
                    `.upcoming-card[data-song-id="${upcoming.id}"]`
                );

            const song =
                createSearchSong(

                    upcoming.title,

                    upcoming.artist,

                    upcoming.playerImage ||
                    upcoming.image,

                    upcoming.song,

                    card,

                    card
                        ? () => playUpcomingSong(
                            upcoming,
                            card
                        )
                        : null

                );

            if (song) {
                songs.push(song);
            }

        });

    }


    // 5. ARTIST PLAY BUTTONS
    //    Popular Artists + Trending Artists

    document
        .querySelectorAll(
            ".wc-artist-play"
        )
        .forEach(button => {

            const title =
                button.dataset.title;

            const artist =
                button.dataset.artist;

            const image =
                button.dataset.image;

            const songFile =
                button.dataset.song;

            const card =
                button.closest(
                    ".wc-artist-card"
                );

            const song =
                createSearchSong(

                    title,

                    artist,

                    image,

                    songFile,

                    card,

                    () => playSearchButton(button)

                );

            if (song) {
                songs.push(song);
            }

        });


    // REMOVE DUPLICATES 

    const uniqueSongs = [];

    const seen = new Set();


    songs.forEach(song => {

        const key =
            (
                song.title +
                "|" +
                song.artist +
                "|" +
                song.song
            ).toLowerCase();


        if (!seen.has(key)) {

            seen.add(key);

            uniqueSongs.push(song);

        }

    });


    return uniqueSongs;

}


// GET ALL ARTISTS 

function getAllArtists() {

    const artists = [];


    // POPULAR + TRENDING ARTISTS 

    document
        .querySelectorAll(".wc-artist-card")
        .forEach(card => {

            const nameElement =
                card.querySelector("h3");

            const imageElement =
                card.querySelector(
                    ".wc-artist-image img"
                );

            if (!nameElement) {
                return;
            }

            const name =
                nameElement.textContent.trim();

            const image =
                imageElement
                    ? imageElement.src
                    : "";

            artists.push({

                name: name,

                image: image,

                element: card

            });

        });


    // ARTISTS FROM UP & COMING

    if (
        typeof upcomingArtists !== "undefined" &&
        Array.isArray(upcomingArtists)
    ) {

        upcomingArtists.forEach(upcoming => {

            artists.push({

                name: upcoming.artist,

                image:
                    upcoming.image || "",

                element:
                    document.querySelector(
                        `.upcoming-card[data-song-id="${upcoming.id}"]`
                    )

            });

        });

    }


    // ARTISTS FROM RECOMMENDED ALBUMS 

    if (
        typeof wavecraftAlbums !== "undefined" &&
        Array.isArray(wavecraftAlbums)
    ) {

        wavecraftAlbums.forEach(album => {

            artists.push({

                name: album.artist,

                image: album.image,

                element:
                    document.querySelector(
                        `.album-card[data-album-id="${album.id}"]`
                    )

            });

        });

    }


    // REMOVE DUPLICATE ARTISTS 

    const uniqueArtists = [];

    const seenArtists = new Set();


    artists.forEach(artist => {

        const key =
            artist.name.toLowerCase();


        if (!seenArtists.has(key)) {

            seenArtists.add(key);

            uniqueArtists.push(artist);

        }

    });


    return uniqueArtists;

}


//  PLAY SEARCH RESULT 

function playSearchSong(song) {

    if (!song) {
        return;
    }

    if (window.WaveCraftPlayer) {
        window.WaveCraftPlayer.play(song);
        closeSearch();
        return;
    }


    // IF ORIGINAL PLAY FUNCTION EXISTS 

    if (
        typeof song.playFunction === "function"
    ) {

        try {

            song.playFunction();

            closeSearch();

            return;

        } catch (error) {

            console.log(
                "Original play function failed:",
                error
            );

        }

    }


    // FALLBACK PLAYER 

    if (!searchAudio) {

        console.error(
            "WaveCraft audioPlayer was not found."
        );

        return;

    }


    searchAudio.src =
        song.song;

    searchAudio.load();


    if (searchPlayerImage) {

        searchPlayerImage.src =
            song.image;

        searchPlayerImage.alt =
            song.title;

    }


    if (searchPlayerTitle) {

        searchPlayerTitle.textContent =
            song.title;

    }


    if (searchPlayerArtist) {

        searchPlayerArtist.textContent =
            song.artist;

    }


    if (searchMusicPlayer) {

        searchMusicPlayer.classList.add(
            "active"
        );

    }


    searchAudio
        .play()
        .catch(error => {

            console.error(
                "WaveCraft search playback error:",
                error
            );

        });


    closeSearch();

}


// PLAY EXISTING BUTTON 

function playSearchButton(button) {

    if (!button) {
        return;
    }


    button.click();

}


// OPEN SEARCH 

if (searchInput) {

    searchInput.addEventListener(
        "focus",
        function () {

            if (searchContainer) {

                searchContainer.classList.add(
                    "active"
                );

            }

            performSearch();

        }
    );


    // SEARCH WHILE TYPING 

    searchInput.addEventListener(
        "input",
        function () {

            if (searchContainer) {

                searchContainer.classList.add(
                    "active"
                );

            }

            performSearch();

        }
    );

}


// MAIN SEARCH 

function performSearch() {

    if (!searchInput) {
        return;
    }


    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    const songs =
        getAllSongs();


    const artists =
        getAllArtists();


    // EMPTY SEARCH 

    if (!query) {

        renderEmptySearch();

        return;

    }


    // MATCH SONGS 

    const matchingSongs =
        songs.filter(song => {

            return (

                song.title
                    .toLowerCase()
                    .includes(query)

                ||

                song.artist
                    .toLowerCase()
                    .includes(query)

            );

        });


    // MATCH ARTISTS 

    const matchingArtists =
        artists.filter(artist => {

            return artist.name
                .toLowerCase()
                .includes(query);

        });


    // ARTISTS FOUND THROUGH SONGS 

    matchingSongs.forEach(song => {

        const exists =
            matchingArtists.some(
                artist =>
                    artist.name.toLowerCase() ===
                    song.artist.toLowerCase()
            );


        if (!exists) {

            matchingArtists.push({

                name: song.artist,

                image: song.image,

                element: song.element

            });

        }

    });


    renderSuggestions(
        matchingSongs,
        matchingArtists,
        query
    );


    renderResults(
        matchingSongs,
        matchingArtists,
        query
    );

}


// EMPTY SEARCH

function renderEmptySearch() {

    if (searchSuggestions) {

        searchSuggestions.innerHTML = "";

    }


    if (!searchResultContent) {
        return;
    }


    searchResultContent.innerHTML = `

        <div class="no-results">

            <i class="fa-solid fa-music"></i>

            <p>
                Search for a song or artist
            </p>

        </div>

    `;

}


// SEARCH SUGGESTIONS

function renderSuggestions(
    songs,
    artists,
    query
) {

    if (!searchSuggestions) {
        return;
    }


    searchSuggestions.innerHTML = "";


    if (!query) {
        return;
    }


    const suggestions = [];


    // SONG TITLES 

    songs.forEach(song => {

        suggestions.push({

            text: song.title,

            type: "song"

        });

    });


    //  ARTISTS 

    artists.forEach(artist => {

        const exists =
            suggestions.some(
                item =>
                    item.text.toLowerCase() ===
                    artist.name.toLowerCase()
            );


        if (!exists) {

            suggestions.push({

                text: artist.name,

                type: "artist"

            });

        }

    });


    //  MAXIMUM 6 

    suggestions
        .slice(0, 6)
        .forEach(item => {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.className =
                "search-suggestion";


            button.innerHTML = `

                <i class="fa-solid fa-magnifying-glass"></i>

                <span>
                    ${item.text}
                </span>

            `;


            button.addEventListener(
                "click",
                function () {

                    searchInput.value =
                        item.text;

                    performSearch();

                    searchInput.focus();

                }
            );


            searchSuggestions.appendChild(
                button
            );

        });

}


//  DISPLAY SEARCH RESULTS 

function renderResults(
    songs,
    artists,
    query
) {

    if (!searchResultContent) {
        return;
    }


    searchResultContent.innerHTML = "";


    //  NO RESULTS 

    if (
        songs.length === 0 &&
        artists.length === 0
    ) {

        searchResultContent.innerHTML = `

            <div class="no-results">

                <i class="fa-solid fa-music"></i>

                <p>
                    No music found for
                    <strong>"${query}"</strong>
                </p>

            </div>

        `;

        return;

    }


    //  ARTISTS 

    if (artists.length > 0) {

        const artistSection =
            document.createElement("div");

        artistSection.className =
            "result-section";


        artistSection.innerHTML = `

            <div class="result-title">
                Artists
            </div>

        `;


        artists
            .slice(0, 5)
            .forEach(artist => {

                const result =
                    document.createElement(
                        "div"
                    );


                result.className =
                    "artist-result";


                result.innerHTML = `

                    <img
                        src="${artist.image}"
                        alt="${artist.name}"
                    >

                    <div class="artist-info">

                        <h4>
                            ${artist.name}
                        </h4>

                        <p>
                            Artist
                        </p>

                    </div>

                `;


                result.addEventListener(
                    "click",
                    function () {

                        if (artist.element) {

                            artist.element.scrollIntoView({

                                behavior: "smooth",

                                block: "center"

                            });


                            artist.element.classList.add(
                                "search-highlight"
                            );


                            setTimeout(() => {

                                artist.element.classList.remove(
                                    "search-highlight"
                                );

                            }, 2000);

                        }

                        closeSearch();

                    }
                );


                artistSection.appendChild(
                    result
                );

            });


        searchResultContent.appendChild(
            artistSection
        );

    }


    //  SONGS 

    if (songs.length > 0) {

        const songSection =
            document.createElement("div");


        songSection.className =
            "result-section";


        songSection.innerHTML = `

            <div class="result-title">
                Songs
            </div>

        `;


        songs
            .slice(0, 10)
            .forEach(song => {

                const result =
                    document.createElement(
                        "div"
                    );


                result.className =
                    "video-result";


                result.innerHTML = `

                    <img
                        src="${song.image}"
                        alt="${song.title}"
                    >

                    <div class="video-info">

                        <h4>
                            ${song.title}
                        </h4>

                        <p>
                            ${song.artist}
                        </p>

                    </div>

                `;


                //  CLICK SEARCH RESULT TO PLAY 

                result.addEventListener(
                    "click",
                    function () {

                        playSearchSong(song);

                    }
                );


                songSection.appendChild(
                    result
                );

            });


        searchResultContent.appendChild(
            songSection
        );

    }

}


//  CLOSE SEARCH 

function closeSearch() {

    if (searchContainer) {

        searchContainer.classList.remove(
            "active"
        );

    }


    if (searchInput) {

        searchInput.blur();

    }

}


//  CLEAR SEARCH 

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            if (searchInput) {

                searchInput.value = "";

            }


            if (searchSuggestions) {

                searchSuggestions.innerHTML = "";

            }


            if (searchResultContent) {

                searchResultContent.innerHTML = "";

            }


            closeSearch();

        }
    );

}


//  CLICK OUTSIDE 

document.addEventListener(
    "click",
    function (event) {

        if (
            searchContainer &&
            !searchContainer.contains(
                event.target
            )
        ) {

            closeSearch();

        }

    }
);


//  KEYBOARD NAVIGATION 

let selectedSuggestion = -1;


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            const items =
                searchSuggestions
                    ? searchSuggestions.querySelectorAll(
                        ".search-suggestion"
                    )
                    : [];


            //  ARROW DOWN

            if (event.key === "ArrowDown") {

                event.preventDefault();


                if (items.length === 0) {
                    return;
                }


                selectedSuggestion++;


                if (
                    selectedSuggestion >=
                    items.length
                ) {

                    selectedSuggestion = 0;

                }


                updateSelectedSuggestion(
                    items
                );

            }


            //  ARROW UP 

            else if (event.key === "ArrowUp") {

                event.preventDefault();


                if (items.length === 0) {
                    return;
                }


                selectedSuggestion--;


                if (
                    selectedSuggestion < 0
                ) {

                    selectedSuggestion =
                        items.length - 1;

                }


                updateSelectedSuggestion(
                    items
                );

            }


            //  ENTER

            else if (
                event.key === "Enter"
            ) {

                event.preventDefault();


                if (
                    selectedSuggestion >= 0 &&
                    items[selectedSuggestion]
                ) {

                    items[
                        selectedSuggestion
                    ].click();


                    selectedSuggestion = -1;

                }

            }


            //  ESCAPE

            else if (
                event.key === "Escape"
            ) {

                closeSearch();

                selectedSuggestion = -1;

            }

        }
    );

}


//  KEYBOARD HIGHLIGHT 

function updateSelectedSuggestion(
    items
) {

    items.forEach(item => {

        item.classList.remove(
            "selected"
        );

    });


    if (
        items[selectedSuggestion]
    ) {

        items[
            selectedSuggestion
        ].classList.add(
            "selected"
        );

    }

}


//  END OF WAVECRAFT GLOBAL SEARCH


// LIKE MUSIC

const likeButtons =
    document.querySelectorAll(".like-btn");

likeButtons.forEach(button => {

    button.addEventListener("click", function (event) {

        event.stopPropagation();

        const icon =
            this.querySelector("i");

        if (!icon) return;

        const isLiked =
            this.classList.contains("liked");

        const card = this.closest(".music-card");
        const playButton = card ? card.querySelector(".play-btn[data-song]") : null;
        const songId = playButton?.dataset.song || `${this.dataset.title}-${this.dataset.artist}`;
        let likedSongs = [];

        try {
            likedSongs = JSON.parse(localStorage.getItem("wavecraftLikedSongs")) || [];
        } catch {
            likedSongs = [];
        }


        if (isLiked) {

            this.classList.remove("liked");

            icon.classList.remove(
                "ri-heart-fill"
            );

            icon.classList.add(
                "ri-heart-line"
            );

            this.title = "Like";
            likedSongs = likedSongs.filter(song => song.id !== songId);

        } else {

            this.classList.add("liked");

            icon.classList.remove(
                "ri-heart-line"
            );

            icon.classList.add(
                "ri-heart-fill"
            );

            this.title = "Unlike";
            if (!likedSongs.some(song => song.id === songId)) {
                likedSongs.push({
                    id: songId,
                    title: this.dataset.title || card?.dataset.title || "Unknown song",
                    artist: this.dataset.artist || card?.dataset.artist || "Unknown artist",
                    image: this.dataset.image || card?.querySelector("img")?.getAttribute("src") || "",
                    song: songId,
                    likedAt: Date.now()
                });
            }

        }

        localStorage.setItem("wavecraftLikedSongs", JSON.stringify(likedSongs));

    });

});

function restoreHomeLikedSongs() {
    let likedSongs = [];
    try { likedSongs = JSON.parse(localStorage.getItem("wavecraftLikedSongs")) || []; } catch { return; }
    document.querySelectorAll(".like-btn").forEach(button => {
        const card = button.closest(".music-card");
        const playButton = card?.querySelector(".play-btn[data-song]");
        const songId = playButton?.dataset.song || `${button.dataset.title}-${button.dataset.artist}`;
        const liked = likedSongs.some(song => song.id === songId);
        button.classList.toggle("liked", liked);
        const icon = button.querySelector("i");
        if (icon) icon.className = liked ? "ri-heart-fill" : "ri-heart-line";
        button.title = liked ? "Unlike" : "Like";
    });
}

restoreHomeLikedSongs();


// THREE DOT MENU

const moreButtons =
    document.querySelectorAll(".more-btn");

moreButtons.forEach(button => {

    button.addEventListener("click", function (event) {

        event.stopPropagation();

        const card =
            this.closest(".music-card");

        if (!card) return;

        const menu =
            card.querySelector(".playlist-menu");

        if (!menu) return;


        // Close other menus

        document
            .querySelectorAll(".playlist-menu")
            .forEach(otherMenu => {

                if (otherMenu !== menu) {

                    otherMenu.classList.remove("show");

                }

            });


        // Toggle current menu

        menu.classList.toggle("show");

    });

});



// CLOSE PLAYLIST MENU

document.addEventListener("click", () => {

    document
        .querySelectorAll(".playlist-menu")
        .forEach(menu => {

            menu.classList.remove("show");

        });

});



// PLAYLIST OPTIONS

const playlistOptions =
    document.querySelectorAll(".playlist-option");

playlistOptions.forEach(option => {

    option.addEventListener("click", function (event) {

        event.stopPropagation();

        const card =
            this.closest(".music-card");

        if (!card) return;


        const titleElement =
            card.querySelector(
                ".music-card-body h5, .card-title"
            );


        const title =
            titleElement
                ? titleElement.textContent.trim()
                : "this song";


        const optionText =
            this.textContent
                .trim()
                .toLowerCase();


        if (optionText.includes("add to playlist")) {

            alert(
                "Choose a playlist for: " +
                title
            );

        }


        else if (
            optionText.includes("create playlist")
        ) {

            alert(
                "Create a new playlist with: " +
                title
            );

        }


        const menu =
            card.querySelector(".playlist-menu");

        if (menu) {
            menu.classList.remove("show");
        }

    });

});
// END OF PLAYLIST MENU




// WAVECRAFT TOP CHARTS
// ELEMENTS

const carousel = document.getElementById("topChartsCarousel");

const prevBtn = document.getElementById("topChartPrev");
const nextBtn = document.getElementById("topChartNext");


// DROPDOWN BUTTONS

const genreBtn = document.getElementById("genreBtn");
const typeBtn = document.getElementById("typeBtn");
const periodBtn = document.getElementById("periodBtn");


// DROPDOWN MENUS

const genreMenu = document.getElementById("genreMenu");
const typeMenu = document.getElementById("typeMenu");
const periodMenu = document.getElementById("periodMenu");


// SELECTED VALUES

const genreSelected = document.getElementById("genreSelected");
const typeSelected = document.getElementById("typeSelected");
const periodSelected = document.getElementById("periodSelected");

// CHECK REQUIRED ELEMENTS

// if (
//     !carousel ||
//     !prevBtn ||
//     !nextBtn ||
//     !genreBtn ||
//     !typeBtn ||
//     !periodBtn ||
//     !genreMenu ||
//     !typeMenu ||
//     !periodMenu
// ) {
//     console.error("WaveCraft Top Charts: Required HTML elements are missing.");
// }


// FILTER STATE

let chartFilters = {

    genre: "Afrobeat",

    type: "song",

    period: "this week"

};


// =========================================
// CHART DATA
// =========================================
//
// Add more chart data here as we build WaveCraft.
//
// Each song now has a "song" property.
// That is the path to the MP3 file.
//
// IMPORTANT:
// Make sure the filenames actually exist
// inside your music folder.
// =========================================

const chartData = {

    // AFROBEATS

    afrobeats: {

        songs: {

            week: [

                {
                    rank: 1,
                    title: "SLICK",
                    artist: "Victony",
                    image: "img/slick.jpg",
                    song: "audio/Victony-SLICK.mp3"
                },

                {
                    rank: 2,
                    title: "THAT GIRL",
                    artist: "Tyla",
                    image: "img/that-girl.jpg",
                    song: "audio/Tyla_-_That_Girl.mp3"
                },

                {
                    rank: 3,
                    title: "B4 B4",
                    artist: "Davido, Mayorkun & FOLA",
                    image: "img/b4-b4.jpg",
                    song: "audio/Davido-B4-B4-ft-Mayorkun-Fola-(JustNaija.com).mp3"
                },

                {
                    rank: 4,
                    title: "COMING HOME",
                    artist: "Odeal ft. Jorja Smith",
                    image: "img/ordeal.webp",
                    song: "audio/04-Odeal_-_Coming_Home_feat._Jorja_Smith.mp3"
                },

                {
                    rank: 5,
                    title: "EJA MEJA",
                    artist: "BNXN & Asake",
                    image: "img/eja-meja.webp",
                    song: "audio/BNXN-Eja-Meja-Ft-Asake-(JustNaija.com).mp3"
                },

                {
                    rank: 6,
                    title: "TELL EVERYBODY",
                    artist: "Davido ft. Leon Thomas",
                    image: "img/b4-b4.jpg",
                    song: "audio/Davido-Tell-Everybody-Ft-Leon-Thomas-(JustNaija.com).mp3"
                },

                {
                    rank: 7,
                    title: "Forgiveness",
                    artist: "Asake",
                    image: "img/asake.jpg",
                    song: "audio/Asake-Forgiveness-(JustNaija.com).mp3"
                },

                {
                    rank: 8,
                    title: "CHANEL",
                    artist: "Blaqbonez ft. Asake",
                    image: "img/chanel.jpg",
                    song: "audio/Blaqbonez-Chanel-ft-Asake-(JustNaija.com).mp3"
                },

                {
                    rank: 9,
                    title: "TREAT U RIGHT",
                    artist: "FOLA & Ayra Starr",
                    image: "img/fola.webp",
                    song: "audio/FOLA-treat-u-right-ft-Ayra-Starr-(JustNaija.com).mp3"
                },

                {
                    rank: 10,
                    title: "GTA",
                    artist: "Seyi Vibez",
                    image: "img/gta.webp",
                    song: "audio/Seyi-Vibez-GTA-(JustNaija.com).mp3"
                },

                {
                    rank: 11,
                    title: "TORNADO",
                    artist: "Ayra Starr",
                    image: "img/tornado.jpg",
                    song: "audio/Ayra-Starr-Tornado.mp3"
                },

                {
                    rank: 12,
                    title: "ELUMELU",
                    artist: "Young Jonn",
                    image: "img/elumelu.webp",
                    song: "audio/Young-Jonn-Elumelu-(JustNaija.com).mp3"
                },

                {
                    rank: 13,
                    title: "Gratitude",
                    artist: "Asake",
                    image: "img/Gratitude.webp",
                    song: "audio/Asake-Gratitude-(JustNaija.com) (1).mp3"
                },

                {
                    rank: 14,
                    title: "Jogodo",
                    artist: "Wizkid & Asake",
                    image: "img/jogodo.webp",
                    song: "audio/Wizkid-Jogodo-ft-Asake-(JustNaija.com).mp3"
                },

                {
                    rank: 15,
                    title: "Paparazzi",
                    artist: "Shoday & FOLA",
                    image: "img/paparazzi.jpg",
                    song: "audio/Shoday-Paparazzi-Ft-FOLA-(JustNaija.com).mp3"
                }


            ]

        }

    },


    // HIP-HOP

    hiphop: {

        songs: {

            week: [{
                    rank: 1,
                    title: "AH HA",
                    artist: "Cardi B",
                    image: "img/ah-ha.webp",
                    song: "audio/Cardi_B_-_AH_HA.mp3"
                },

                {
                    rank: 2,
                    title: "WHAT YOU SAYING",
                    artist: "Lil Uzi Vert",
                    image: "img/lil-uzi-vert.webp",
                    song: "audio/01 What You Saying.mp3"
                },

                {
                    rank: 3,
                    title: "I Just Might",
                    artist: "Bruno Mars",
                    image: "img/bruno.webp",
                    song: "audio/Bruno Mars - I Just Might.mp3"
                },

                {
                    rank: 4,
                    title: "Dead Fresh",
                    artist: "Lil Baby",
                    image: "img/dead-fresh.webp",
                    song: "audio/Lil-Baby-Dead-Fresh-(HipHopKit.com).mp3"
                },

                {
                    rank: 5,
                    title: "E85",
                    artist: "Don Toliver",
                    image: "img/e85.jpg",
                    song: "audio/Don Toliver - E85 [Official Visualizer] - Don Toliver (128k).mp3"
                },

                {
                    rank: 6,
                    title: "Two Six",
                    artist: "J. Cole",
                    image: "img/jcole.png",
                    song: "audio/two six by jcole02-24-2026 07-17-29_1.mp3"
                },

                {
                    rank: 7,
                    title: "FDO",
                    artist: "Pooh Shiesty",
                    image: "img/fdo.jpg",
                    song: "audio/Pooh-Shiesty-FDO.mp3"
                },

                {
                    rank: 8,
                    title: "Folded",
                    artist: "Kehlani",
                    image: "img/folded.webp",
                    song: "audio/Kehlani---Folded-Bazeafrika.com.mp3"
                },

                {
                    rank: 9,
                    title: "BODY",
                    artist: "Don Toliver",
                    image: "img/e85.jpg",
                    song: "audio/Don Toliver - Body Official Visualizer.mp3"
                },

                {
                    rank: 10,
                    title: "PUFFIN ON ZOOTIEZ",
                    artist: "Future",
                    image: "img/puffin-on-zootiez.webp",
                    song: "audio/Future-PUFFIN-ON-ZOOTIEZ-(HipHopKit.com).mp3"
                },

                {
                    rank: 11,
                    title: "First Class",
                    artist: "Jack Harlow",
                    image: "img/first-class.webp",
                    song: "audio/Jack_Harlow_-_First_Class_ScaryBeatz.com.mp3"
                },

                {
                    rank: 12,
                    title: "Janice STFU",
                    artist: "Drake",
                    image: "img/janice.png",
                    song: "audio/Drake-Janice-STFU-(HipHopKit.com).mp3"
                },

                {
                    rank: 13,
                    title: "Not Like Us",
                    artist: "Kendrick Lamar",
                    image: "img/not-like-us.jpg",
                    song: "audio/Not Like Us.mp3"
                },

                {
                    rank: 14,
                    title: "Timeless",
                    artist: "Playboi Carti & The Weeknd",
                    image: "img/timeless.jpg",
                    song: "audio/The Weeknd - Timeless (feat. Playboi Carti).mp3"
                },

                {
                    rank: 15,
                    title: "Spend Dat",
                    artist: "Yung Miami",
                    image: "img/spend-dat.png",
                    song: "audio/Yung Miami – Spend Dat (Lyrics).M4A"
                }// Add Top 15 Hip-Hop songs here later.

            ]

        }

    },


    // JAZZ

    jazz: {

        songs: {

            week: [

                 {
                    rank: 1,
                    title: "Universal Truth",
                    artist: "Emmet Cohen",
                    image: "img/emmet-cohen.jpg",
                    song: "music/universal-truth.mp3"
                },

                {
                    rank: 2,
                    title: "Freezer Jam",
                    artist: "Rik Wright's Fundamental Forces",
                    image: "img/freezer-jam.jpg",
                    song: "music/freezer-jam.mp3"
                },

                {
                    rank: 3,
                    title: "In Motion",
                    artist: "Jeremy Green",
                    image: "img/in-motion.jpg",
                    song: "music/in-motion.mp3"
                },

                {
                    rank: 4,
                    title: "Talk to Your Daughter",
                    artist: "Robben Ford",
                    image: "img/talk-to-your-daughter.jpg",
                    song: "music/talk-to-your-daughter.mp3"
                },

                {
                    rank: 5,
                    title: "The Rewinder (Live)",
                    artist: "Guitar Elation",
                    image: "img/the-rewinder.jpg",
                    song: "music/the-rewinder.mp3"
                },

                {
                    rank: 6,
                    title: "Oracles",
                    artist: "Helen Sung Big Band",
                    image: "img/oracles.jpg",
                    song: "music/oracles.mp3"
                },

                {
                    rank: 7,
                    title: "Torch Bearers",
                    artist: "Brian Lynch",
                    image: "img/touch-bearers.jpg",
                    song: "music/torch-bearers.mp3"
                },

                {
                    rank: 8,
                    title: "Inner Fire",
                    artist: "Steve Oliver",
                    image: "img/inner-fire.jpg",
                    song: "music/inner-fire.mp3"
                },

                {
                    rank: 9,
                    title: "Chill It",
                    artist: "Nils",
                    image: "img/chill-it.jpg",
                    song: "music/chill-it.mp3"
                },

                {
                    rank: 10,
                    title: "Next Steps",
                    artist: "Lawson Rollins",
                    image: "img/next-steps.webp",
                    song: "music/next-steps.mp3"
                },

                {
                    rank: 11,
                    title: "Dancing in the Sand",
                    artist: "Steve Oliver ft. Peter White",
                    image: "img/dancing-in-the-sand.jpg",
                    song: "music/dancing-in-the-sand.mp3"
                },

                {
                    rank: 12,
                    title: "Daybreak",
                    artist: "James Morgan Jazz Band & Cécile Dutrion",
                    image: "img/daybreak.jpg",
                    song: "music/daybreak.mp3"
                },

                {
                    rank: 13,
                    title: "All the Good Times",
                    artist: "Chris Standring",
                    image: "img/all-the-good-times.jpg",
                    song: "music/all-the-good-times.mp3"
                },

                {
                    rank: 14,
                    title: "Doin' Everything With You",
                    artist: "Nicole Henry",
                    image: "img/doin-everythin-with-you.jpg",
                    song: "music/doin-everything-with-you.mp3"
                },

                {
                    rank: 15,
                    title: "Velvet",
                    artist: "James Morgan Jazz Band",
                    image: "img/velvet.jpg",
                    song: "music/velvet.mp3"
                }


            ]

        }

    },


    // R&B

    rnb: {

        songs: {

            week: [

                {
                    rank: 1,
                    title: "Hot Body",
                    artist: "Ayra Star",
                    image: "img/hot-body.webp",
                    song: "audio/Ayra-Starr-Hot-Body-(HipHopKit.com).mp3"
                },

                {
                    rank: 2,
                    title: "Fallin'",
                    artist: "Chris Brown",
                    image: "img/fallin.jpg",
                    song: "audio/Chris-Brown-Fallin-ft-Leon-Thomas-(HipHopKit.com).mp3"
                },

                {
                    rank: 3,
                    title: "YUKON",
                    artist: "Justin Bieber",
                    image: "img/yukon.jpg",
                    song: "audio/Justin-Bieber-YUKON-(HipHopKit.com).mp3"
                },

                {
                    rank: 4,
                    title: "Body So Tea",
                    artist: "Coco Jones",
                    image: "img/body-so-tea.jpg",
                    song: "audio/coco-jones-body-so-tea.mp3"
                },

                {
                    rank: 5,
                    title: "Residuals",
                    artist: "Chris Brown",
                    image: "img/residuals.webp",
                    song: "audio/Chris-Brown-Residuals-(HipHopKit.com).mp3"
                },

                {
                    rank: 6,
                    title: "Million Dollar Baby",
                    artist: "Tommy Richman",
                    image: "img/million-dollar-baby.jpg",
                    song: "audio/MILLION DOLLAR BABY - Tommy Richman.mp3"
                },

                {
                    rank: 7,
                    title: "What You Need",
                    artist: "Tems",
                    image: "img/tems.jpg",
                    song: "audio/Tems-What-You-Need-(JustNaija.com).mp3"
                },

                {
                    rank: 8,
                    title: "Hell and Back",
                    artist: "Fireboy",
                    image: "img/hell-and-back.webp",
                    song: "audio/Fireboy-DML-hell-and-back-(HipHopKit.com).mp3"
                },

                {
                    rank: 9,
                    title: "Oh Yeah?",
                    artist: "Steve Lacy",
                    image: "img/oh-yeah.png",
                    song: "audio/Steve Lacy - oh yeah_ (Visualizer).mp3"
                },

                {
                    rank: 10,
                    title: "Shoulda Never",
                    artist: "Kehlani ft. Usher",
                    image: "img/shoulda-never.jpg",
                    song: "audio/Kehlani_ft._Usher_-_Shoulda_Never_feat._USHER_Instrumental_by_Djancarlo_Shatunov_(mp3.pm).mp3"
                },

                {
                    rank: 11,
                    title: "It Depends",
                    artist: "Chris Brown ft. Bryson Tiller",
                    image: "img/it-depends.jpeg",
                    song: "audio/Chris-Brown-It-Depends-Ft-Bryson-Tiller-(HipHopKit.com).mp3"
                },

                {
                    rank: 12,
                    title: "COCONUT",
                    artist: "SAILORR & Eem Triplin",
                    image: "img/coconut.webp",
                    song: "audio/SAILORR_Eem_Triplin_-_COCONUT_feat._Eem_Triplin_(mp3.pm).mp3"
                },

                {
                    rank: 13,
                    title: "Up Out & Gone",
                    artist: "Ne-Yo",
                    image: "img/up-out-and-gone.jpg",
                    song: "audio/Ne-Yo_-_Up_Out_Gone_(mp3.pm).mp3"
                },

                {
                    rank: 14,
                    title: "Touch Myself",
                    artist: "KWN",
                    image: "img/touch-myself.jpg",
                    song: "audio/kwn_-_touch_myself_(mp3.pm).mp3"
                },

                {
                    rank: 15,
                    title: "Room 69",
                    artist: "Tayc",
                    image: "img/room-69.jpg",
                    song: "audio/Tayc_-_Room_69_(mp3.pm).mp3"
                }

            ]

        }

    },


    // K-POP

    kpop: {

        songs: {

            week: [

                {
                    rank: 1,
                    title: "SWIM",
                    artist: "BTS",
                    image: "img/bts-swim.jpg",
                    song: "audio/BTS_-_SWIM_(mp3.pm).mp3"
                },

                {
                    rank: 2,
                    title: "Animal",
                    artist: "KATSEYE",
                    image: "img/animal.jpg",
                    song: "audio/Animal - KATSEYE.mp3"
                },

                {
                    rank: 3,
                    title: "Golden",
                    artist: "HUNTR/X",
                    image: "img/golden.jpeg",
                    song: "audio/Huntrix - Golden (Lyrics) KPop Demon Hunters.mp3"
                },

                {
                    rank: 4,
                    title: "NORMAL",
                    artist: "BTS",
                    image: "img/normal.webp",
                    song: "audio/BTS_-_Normal_(mp3.pm).mp3"
                },

                {
                    rank: 5,
                    title: "Less than a Lover",
                    artist: "Jennie",
                    image: "img/less-than-a-lover.jpg",
                    song: "audio/jennie-less-than-a-lover.mp3"
                },

                {
                    rank: 6,
                    title: "APT.",
                    artist: "ROSÉ & Bruno Mars",
                    image: "img/apt.jpg",
                    song: "audio/ROSÉ & Bruno Mars - APT..mp3"
                },

                {
                    rank: 7,
                    title: "ICONIC BY MISTAKE",
                    artist: "LE SSERAFIM * KatsEye * ILLIT",
                    image: "img/iconic-by-mistake.jpg",
                    song: "audio/KATSEYE x LE SSERAFIM x ILLIT - ICONIC BY MISTAKE.mp3"
                },

                {
                    rank: 8,
                    title: "THIS & THAT",
                    artist: "Stray Kids",
                    image: "img/stray kids.jpg",
                    song: "audio/Stray Kids This & That MV.mp3"
                },

                {
                    rank: 9,
                    title: "Champion",
                    artist: "BLACKPINK",
                    image: "img/champion.jpeg",
                    song: "audio/Champion.mp3"
                },

                {
                    rank: 10,
                    title: "GO",
                    artist: "BLACKPINK",
                    image: "img/go.jpg",
                    song: "audio/BLACKPINK - GO (Official Audio).mp3"
                },

                {
                    rank: 11,
                    title: "Body to Body",
                    artist: "BTS",
                    image: "img/body-to-body.jpg",
                    song: "audio/BTS_-_Body_To_Body_(mp3.pm).mp3"
                },

                {
                    rank: 12,
                    title: "Hooligan",
                    artist: "BTS",
                    image: "img/hooligan.jpg",
                    song: "audio/BTS_-_Hooligan_(mp3.pm).mp3"
                },

                {
                    rank: 13,
                    title: "2.0",
                    artist: "BTS",
                    image: "img/2.0.jpg",
                    song: "audio/BTS 방탄소년단 _2.0_ Official Audio(MP3_160K).mp3"
                },

                {
                    rank: 14,
                    title: "Like Animals",
                    artist: "BTS",
                    image: "img/normal.webp",
                    song: "audio/BTS_-_Like_Animals_(mp3.pm).mp3"
                },

                {
                    rank: 15,
                    title: "Aliens",
                    artist: "BTS",
                    image: "img/normal.webp",
                    song: "audio/BTS_-_Aliens_(mp3.pm) (1).mp3"
                }


            ]

        }

    }

};


// DISPLAY CHART

function displayChart() {

    // Clear existing cards

    carousel.innerHTML = "";


    // Get the selected chart

    const currentChart =
        chartData?.[
            chartFilters.genre
        ]?.[
            chartFilters.type
        ]?.[
            chartFilters.period
        ];


    // NO DATA

    if (!currentChart || currentChart.length === 0) {

        carousel.innerHTML = `

            <div class="chart-no-data">

                <p>
                    No chart data available yet.
                </p>

            </div>

        `;

        updateCarouselButtons();

        return;

    }


    // CREATE CARDS

    currentChart.forEach(item => {

        const card = document.createElement("article");

        card.className = "top-chart-card";


        // CARD HTML

        card.innerHTML = `

            <div class="chart-card-image">

                <img
                    src="${item.image}"
                    alt="${item.title} by ${item.artist}"
                    loading="lazy"
                >

                <span class="chart-rank">
                    #${item.rank}
                </span>

            </div>


            <div class="chart-card-info">

                <div class="chart-card-text">

                    <h3 class="chart-card-title">
                        ${item.title}
                    </h3>

                    <p class="chart-card-artist">
                        ${item.artist}
                    </p>

                </div>


                <button
                    class="chart-play-btn"
                    type="button"
                    aria-label="Play ${item.title}"
                    data-song="${item.song || ""}"
                    data-title="${item.title}"
                    data-artist="${item.artist}"
                    data-image="${item.image}"
                >

                    <i class="ri-play-fill"></i>

                </button>

            </div>

        `;


        // Add card to carousel

        carousel.appendChild(card);

    });


    // CONNECT PLAY BUTTONS

    connectChartPlayButtons();


    // UPDATE CAROUSEL BUTTONS

    updateCarouselButtons();

}


// CONNECT CHART PLAY BUTTONS
// =========================================
//
// This connects the Top Charts buttons
// to the existing WaveCraft music player.
//
// It does NOT create another audio player.
// =========================================

function connectChartPlayButtons() {

    const playButtons =
        carousel.querySelectorAll(".chart-play-btn");


    playButtons.forEach(button => {

        button.addEventListener("click", function(event) {

            event.stopPropagation();


            const song =
                this.dataset.song;

            const title =
                this.dataset.title;

            const artist =
                this.dataset.artist;

            const image =
                this.dataset.image;


            // CHECK SONG PATH

            if (!song) {

                console.warn(
                    `WaveCraft: No music file assigned to "${title}".`
                );

                return;

            }


            // USE EXISTING WAVECRAFT PLAYER

            playWaveCraftSong({

                song: song,

                title: title,

                artist: artist,

                image: image

            });

        });

    });

}


// PLAY WAVECRAFT SONG

function playWaveCraftSong(songData) {

    if (window.WaveCraftPlayer) {
        window.WaveCraftPlayer.play(songData);
        return;
    }

    const audioPlayer = document.getElementById("audioPlayer");
    const musicPlayer = document.getElementById("musicPlayer");

    if (!audioPlayer) {
        console.error("WaveCraft: audioPlayer not found.");
        return;
    }


    // PLAYER IMAGE
if (playerImage) {
    playerImage.src = songData.image;
    playerImage.alt = songData.title;
}


// PLAYER TITLE
if (playerTitle) {
    playerTitle.textContent = songData.title;
}


// PLAYER ARTIST
if (playerArtist) {
    playerArtist.textContent = songData.artist;
}

    // Load song
    audioPlayer.src = songData.song;
    audioPlayer.load();


    // Show player
    if (musicPlayer) {
        musicPlayer.classList.add("active");
    }


    // Play
    audioPlayer.play().catch(error => {
        console.error("Unable to play song:", error);
    });

}


// CLOSE ALL DROPDOWNS

function closeDropdowns() {

    genreMenu.classList.remove("active");

    typeMenu.classList.remove("active");

    periodMenu.classList.remove("active");

}


// GENRE DROPDOWN

genreBtn.addEventListener("click", function(event) {

    event.stopPropagation();


    typeMenu.classList.remove("active");

    periodMenu.classList.remove("active");


    genreMenu.classList.toggle("active");

});


// TYPE DROPDOWN

typeBtn.addEventListener("click", function(event) {

    event.stopPropagation();


    genreMenu.classList.remove("active");

    periodMenu.classList.remove("active");


    typeMenu.classList.toggle("active");

});


// PERIOD DROPDOWN

periodBtn.addEventListener("click", function(event) {

    event.stopPropagation();


    genreMenu.classList.remove("active");

    typeMenu.classList.remove("active");


    periodMenu.classList.toggle("active");

});


// CLICK OUTSIDE DROPDOWNS

document.addEventListener("click", function() {

    closeDropdowns();

});


// GENRE OPTIONS

genreMenu
    .querySelectorAll("button")
    .forEach(button => {

        button.addEventListener("click", function(event) {

            event.stopPropagation();


            // Save selected genre

            chartFilters.genre =
                this.dataset.value;


            // Update button text

            genreSelected.textContent =
                this.textContent;


            // Close menu

            closeDropdowns();


            // Reset carousel position

            carousel.scrollTo({

                left: 0,

                behavior: "instant"

            });


            // Display new chart

            displayChart();

        });

    });


// TYPE OPTIONS

typeMenu
    .querySelectorAll("button")
    .forEach(button => {

        button.addEventListener("click", function(event) {

            event.stopPropagation();


            // Save selected type

            chartFilters.type =
                this.dataset.value;


            // Update button text

            typeSelected.textContent =
                this.textContent;


            // Close menu

            closeDropdowns();


            // Reset carousel position

            carousel.scrollTo({

                left: 0,

                behavior: "instant"

            });


            // Display new chart

            displayChart();

        });

    });


// PERIOD OPTIONS

periodMenu
    .querySelectorAll("button")
    .forEach(button => {

        button.addEventListener("click", function(event) {

            event.stopPropagation();


            // Save selected period

            chartFilters.period =
                this.dataset.value;


            // Update button text

            periodSelected.textContent =
                this.textContent;


            // Close menu

            closeDropdowns();


            // Reset carousel position

            carousel.scrollTo({

                left: 0,

                behavior: "instant"

            });


            // Display new chart

            displayChart();

        });

    });


// CAROUSEL NEXT

nextBtn.addEventListener("click", function(event) {

    event.preventDefault();


    carousel.scrollBy({

        left: carousel.clientWidth,

        behavior: "smooth"

    });

});


// CAROUSEL PREVIOUS

prevBtn.addEventListener("click", function(event) {

    event.preventDefault();


    carousel.scrollBy({

        left: -carousel.clientWidth,

        behavior: "smooth"

    });

});


// UPDATE CAROUSEL BUTTONS

function updateCarouselButtons() {

    const maxScroll =
        carousel.scrollWidth -
        carousel.clientWidth;


    // Previous button

    prevBtn.disabled =
        carousel.scrollLeft <= 5;


    // Next button

    nextBtn.disabled =
        carousel.scrollLeft >= maxScroll - 5;

}


// LISTEN FOR CAROUSEL SCROLL

carousel.addEventListener("scroll", function() {

    updateCarouselButtons();

});

// INITIAL LOAD
displayChart();

// END OF WAVECRAFT TOP CHARTS





// WAVECRAFT TRENDING PLAYLISTS
// ELEMENTS

const playlistCarousel =
    document.getElementById("playlistCarousel");

const playlistPrev =
    document.getElementById("playlistPrev");

const playlistNext =
    document.getElementById("playlistNext");


// PLAYLIST DATA

const trendingPlaylists = [

    // 1. AFROBEATS MIX

    {
        id: "afrobeats-mix",

        name: "Afrobeats Mix",

        image: "img/afrobeats-mix.jpg",

        description:
            "The biggest Afrobeats sounds right now.",

        songs: [

            {
                title: "SLICK",
                artist: "Victony",
                album: "The Villain I Never Was",
                image: "img/slick.jpg",
                song: "audio/Victony-SLICK.mp3",
                duration: "3:21"
            },

            {
                title: "Forgiveness",
                artist: "Asake",
                album: "Lungu Boy",
                image: "img/Gratitude.webp",
                song: "audio/Asake-Forgiveness-(JustNaija.com).mp3",
                duration: "3:18"
            },

            {
                title: "B4 B4",
                artist: "Davido, Mayorkun & FOLA",
                album: "B4 B4",
                image: "img/b4-b4.jpg",
                song: "audio/Davido-B4-B4-ft-Mayorkun-Fola-(JustNaija.com).mp3",
                duration: "3:20"
            },

            {
                title: "EJA MEJA",
                artist: "BNXN & Asake",
                album: "EJA MEJA",
                image: "img/eja-meja.webp",
                song: "audio/BNXN-Eja-Meja-Ft-Asake-(JustNaija.com).mp3",
                duration: "3:14"
            },

            {
                title: "CHANEL",
                artist: "Blaqbonez ft. Asake",
                album: "No Excuses",
                image: "img/chanel.jpg",
                song: "audio/Blaqbonez-Chanel-ft-Asake-(JustNaija.com).mp3",
                duration: "2:58"
            },

            {
                title: "GTA",
                artist: "Seyi Vibez",
                album: "GTA",
                image: "img/gta.webp",
                song: "audio/Seyi-Vibez-GTA-(JustNaija.com).mp3",
                duration: "2:51"
            },

            {
                title: "Gratitude",
                artist: "Asake",
                album: "Gratitude",
                image: "img/Gratitude.webp",
                song: "audio/Asake-Gratitude-(JustNaija.com) (1).mp3",
                duration: "3:42"
            },

            {
                title: "Paparazzi",
                artist: "Shoday & FOLA",
                album: "Paparazzi",
                image: "img/paparazzi.jpg",
                song: "audio/Shoday-Paparazzi-Ft-FOLA-(JustNaija.com).mp3",
                duration: "2:55"
            },

            {
                title: "Tornado",
                artist: "Ayra Starr",
                album: "Tornado",
                image: "img/tornado.jpg",
                song: "audio/Ayra-Starr-Tornado.mp3",
                duration: "3:10"
            },

            {
                title: "Elumelu",
                artist: "Young Jonn",
                album: "Elumelu",
                image: "img/elumelu.webp",
                song: "audio/Young-Jonn-Elumelu-(JustNaija.com).mp3",
                duration: "2:47"
            }

        ]

    },


    // 2. HIP-HOP HEAT

    {
        id: "hip-hop-heat",

        name: "Hip-Hop Hit",

        image: "img/hip-hop-hits.jpg",

        description:
            "The hottest Hip-Hop tracks.",

        songs: [

            {
                title: "AH HA",
                artist: "Cardi B",
                album: "AH HA",
                image: "img/ah-ha.webp",
                song: "audio/Cardi_B_-_AH_HA.mp3",
                duration: "3:02"
            },

            {
                title: "WHAT YOU SAYING",
                artist: "Lil Uzi Vert",
                album: "What You Saying",
                image: "img/lil-uzi-vert.webp",
                song: "audio/01 What You Saying.mp3",
                duration: "3:15"
            },

            {
                title: "Coconut Water",
                artist: "TRIM",
                album: "Single",
                image: "img/coconut-water.webp",
                song: "audio/Trim_-_Coconut_Water_(mp3.pm).mp3",
                duration: "3:20"
            },

            {
                title: "E85",
                artist: "Don Toliver",
                album: "E85",
                image: "img/e85.jpg",
                song: "audio/Don Toliver - E85 [Official Visualizer] - Don Toliver (128k).mp3",
                duration: "3:01"
            },

            {
                title: "Two Six",
                artist: "J. Cole",
                album: "Two Six",
                image: "img/jcole.png",
                song: "audio/two six by jcole02-24-2026 07-17-29_1.mp3",
                duration: "3:12"
            },

            {
                title: "FDO",
                artist: "Pooh Shiesty",
                album: "FDO",
                image: "img/fdo.jpg",
                song: "audio/Pooh-Shiesty-FDO.mp3",
                duration: "2:54"
            },

            {
                title: "BODY",
                artist: "Don Toliver",
                album: "BODY",
                image: "img/e85.jpg",
                song: "audio/Don Toliver - Body Official Visualizer.mp3",
                duration: "3:09"
            },

            {
                title: "Timeless",
                artist: "Playboi Carti & The Weeknd",
                album: "MUSIC",
                image: "img/timeless.jpg",
                song: "audio/The Weeknd - Timeless (feat. Playboi Carti).mp3",
                duration: "4:16"
            },

            {
                title: "Not Like Us",
                artist: "Kendrick Lamar",
                album: "GNX",
                image: "img/not-like-us.jpg",
                song: "audio/Not Like Us.mp3",
                duration: "4:34"
            },

            {
                title: "First Class",
                artist: "Jack Harlow",
                album: "Come Home the Kids Miss You",
                image: "img/first-class.webp",
                song: "audio/Jack_Harlow_-_First_Class_ScaryBeatz.com.mp3",
                duration: "2:53"
            }

        ]

    },


    // 3. R&B VIBES

    {
        id: "rnb-vibes",

        name: "R&B Vibes",

        image: "img/r&b-vibes.jpg",

        description:
            "Smooth sounds for every mood.",

        songs: [

            {
                title: "I Just Might",
                artist: "Bruno Mars",
                album: "The Romantic",
                image: "img/Bruno-Mars.jpg",
                song: "audio/I Just Might - Bruno Mars.mp3",
                duration: "3:18"
            },

            {
                title: "Fallin'",
                artist: "Chris Brown",
                album: "Fallin'",
                image: "img/fallin.jpg",
                song: "audio/Chris-Brown-Fallin-ft-Leon-Thomas-(HipHopKit.com).mp3",
                duration: "3:12"
            },

            {
                title: "YUKON",
                artist: "Justin Bieber",
                album: "SWAG",
                image: "img/yukon.jpg",
                song: "audio/Justin-Bieber-YUKON-(HipHopKit.com).mp3",
                duration: "3:02"
            },

            {
                title: "Folded",
                artist: "Kehlani",
                album: "Folded",
                image: "img/folded.webp",
                song: "audio/Kehlani---Folded-Bazeafrika.com.mp3",
                duration: "3:25"
            },

            {
                title: "Residuals",
                artist: "Chris Brown",
                album: "11:11",
                image: "img/residuals.webp",
                song: "audio/Chris-Brown-Residuals-(HipHopKit.com).mp3",
                duration: "3:35"
            },

            {
                title: "What You Need",
                artist: "Tems",
                album: "Born in the Wild",
                image: "img/tems.jpg",
                song: "audio/Tems-What-You-Need-(JustNaija.com).mp3",
                duration: "3:27"
            },

            {
                title: "Oh Yeah?",
                artist: "Steve Lacy",
                album: "Oh Yeah?",
                image: "img/oh-yeah.png",
                song: "audio/Steve Lacy - oh yeah_ (Visualizer).mp3",
                duration: "2:58"
            },

            {
                title: "Shoulda Never",
                artist: "Kehlani ft. Usher",
                album: "Shoulda Never",
                image: "img/shoulda-never.jpg",
                song: "audio/Kehlani_ft._Usher_-_Shoulda_Never_feat._USHER_Instrumental_by_Djancarlo_Shatunov_(mp3.pm).mp3",
                duration: "3:16"
            },

            {
                title: "It Depends",
                artist: "Chris Brown ft. Bryson Tiller",
                album: "It Depends",
                image: "img/it-depends.jpeg",
                song: "audio/Chris-Brown-It-Depends-Ft-Bryson-Tiller-(HipHopKit.com).mp3",
                duration: "3:20"
            },

            {
                title: "Million Dollar Baby",
                artist: "Tommy Richman",
                album: "Coyote",
                image: "img/million-dollar-baby.jpg",
                song: "audio/MILLION DOLLAR BABY - Tommy Richman.mp3",
                duration: "2:35"
            }

        ]

    },


    // 4. JAZZ ESSENTIALS

    {
        id: "jazz-essentials",

        name: "Jazz Essentials",

        image: "img/jazz-essentials.jpg",

        description:
            "Essential jazz for every listener.",

        songs: [

            {
                title: "Universal Truth",
                artist: "Emmet Cohen",
                album: "Universal Truth",
                image: "img/emmet-cohen.jpg",
                song: "music/universal-truth.mp3",
                duration: "6:12"
            },

            {
                title: "Freezer Jam",
                artist: "Rik Wright's Fundamental Forces",
                album: "Freezer Jam",
                image: "img/freezer-jam.jpg",
                song: "music/freezer-jam.mp3",
                duration: "5:42"
            },

            {
                title: "In Motion",
                artist: "Jeremy Green",
                album: "In Motion",
                image: "img/in-motion.jpg",
                song: "music/in-motion.mp3",
                duration: "4:58"
            },

            {
                title: "Talk to Your Daughter",
                artist: "Robben Ford",
                album: "Talk to Your Daughter",
                image: "img/talk-to-your-daughter.jpg",
                song: "music/talk-to-your-daughter.mp3",
                duration: "5:10"
            },

            {
                title: "The Rewinder",
                artist: "Guitar Elation",
                album: "The Rewinder",
                image: "img/the-rewinder.jpg",
                song: "music/the-rewinder.mp3",
                duration: "4:42"
            },

            {
                title: "Oracles",
                artist: "Helen Sung Big Band",
                album: "Oracles",
                image: "img/oracles.jpg",
                song: "music/oracles.mp3",
                duration: "6:05"
            },

            {
                title: "Torch Bearers",
                artist: "Brian Lynch",
                album: "Torch Bearers",
                image: "img/touch-bearers.jpg",
                song: "music/torch-bearers.mp3",
                duration: "5:28"
            },

            {
                title: "Inner Fire",
                artist: "Steve Oliver",
                album: "Inner Fire",
                image: "img/inner-fire.jpg",
                song: "music/inner-fire.mp3",
                duration: "4:31"
            },

            {
                title: "Chill It",
                artist: "Nils",
                album: "Chill It",
                image: "img/chill-it.jpg",
                song: "music/chill-it.mp3",
                duration: "4:15"
            },

            {
                title: "Next Steps",
                artist: "Lawson Rollins",
                album: "Next Steps",
                image: "img/next-steps.webp",
                song: "music/next-steps.mp3",
                duration: "5:02"
            }

        ]

    },


    // 5. K-POP HITS

    {
        id: "kpop-hits",

        name: "K-Pop Hits",

        image: "img/kpop-hits.jpg",

        description:
            "The biggest K-Pop sounds.",

        songs: [

            {
                title: "SWIM",
                artist: "BTS",
                album: "SWIM",
                image: "img/bts-swim.jpg",
                song: "audio/BTS_-_SWIM_(mp3.pm).mp3",
                duration: "3:18"
            },

            {
                title: "Animal",
                artist: "KATSEYE",
                album: "Animal",
                image: "img/animal.jpg",
                song: "audio/Animal - KATSEYE.mp3",
                duration: "3:01"
            },

            {
                title: "Golden",
                artist: "HUNTR/X",
                album: "Golden",
                image: "img/golden.jpeg",
                song: "audio/Huntrix - Golden (Lyrics) KPop Demon Hunters.mp3",
                duration: "3:04"
            },

            {
                title: "NORMAL",
                artist: "BTS",
                album: "NORMAL",
                image: "img/normal.webp",
                song: "audio/BTS_-_Normal_(mp3.pm).mp3",
                duration: "3:20"
            },

            {
                title: "Less than a Lover",
                artist: "BTS",
                album: "Less than a Lover",
                image: "img/less-than-a-lover.jpg",
                song: "audio/jennie-less-than-a-lover.mp3",
                duration: "3:10"
            },

            {
                title: "APT.",
                artist: "ROSÉ & Bruno Mars",
                album: "rosie",
                image: "img/apt.jpg",
                song: "audio/ROSÉ & Bruno Mars - APT..mp3",
                duration: "2:49"
            },

            {
                title: "THIS & THAT",
                artist: "Stray Kids",
                album: "THIS & THAT",
                image: "img/stray kids.jpg",
                song: "audio/Stray Kids This & That MV.mp3",
                duration: "3:05"
            },

            {
                title: "Champion",
                artist: "BLACKPINK",
                album: "Champion",
                image: "img/champion.jpeg",
                song: "audio/Champion.mp3",
                duration: "3:02"
            },

            {
                title: "GO",
                artist: "BLACKPINK",
                album: "GO",
                image: "img/go.jpg",
                song: "audio/BLACKPINK - GO (Official Audio).mp3",
                duration: "2:58"
            },

            {
                title: "Hooligan",
                artist: "BTS",
                album: "Hooligan",
                image: "img/hooligan.jpg",
                song: "audio/BTS_-_Hooligan_(mp3.pm).mp3",
                duration: "3:15"
            }

        ]

    }

];


// DISPLAY PLAYLISTS

function displayTrendingPlaylists() {

    if (!playlistCarousel) return;


    playlistCarousel.innerHTML = "";


    trendingPlaylists.forEach(playlist => {

        const card = document.createElement("article");

        card.className = "playlist-card";

        card.dataset.playlistId = playlist.id;


        card.innerHTML = `

            <div class="playlist-card-image">

                <img
                    src="${playlist.image}"
                    alt="${playlist.name}"
                    loading="lazy"
                >

            </div>


            <div class="playlist-card-info">

                <h3 class="playlist-card-name">
                    ${playlist.name}
                </h3>


                <button
                    class="playlist-add-btn"
                    type="button"
                    aria-label="Add ${playlist.name} to My Playlists"
                >
                    +
                </button>

            </div>

        `;


        // OPEN PLAYLIST

        card.addEventListener("click", function() {

            window.location.href =
                `playlist.html?id=${playlist.id}`;

        });


        // ADD PLAYLIST

        const addButton =
            card.querySelector(".playlist-add-btn");


        addButton.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

                savePlaylist(playlist);

            }
        );


        playlistCarousel.appendChild(card);

    });


    updatePlaylistArrows();

}


// SAVE PLAYLIST

function savePlaylist(playlist) {

    let savedPlaylists =
        JSON.parse(
            localStorage.getItem("wavecraftPlaylists")
        ) || [];


    const alreadySaved =
        savedPlaylists.some(
            item => item.id === playlist.id
        );


    if (alreadySaved) {

        showPlaylistMessage(
            `${playlist.name} is already in your playlists.`
        );

        return;

    }


    savedPlaylists.push(playlist);


    localStorage.setItem(
        "wavecraftPlaylists",
        JSON.stringify(savedPlaylists)
    );


    showPlaylistMessage(
        `${playlist.name} added to My Playlists.`
    );

}


// MESSAGE

function showPlaylistMessage(message) {

    let messageBox =
        document.getElementById("playlistMessage");


    if (!messageBox) {

        messageBox =
            document.createElement("div");

        messageBox.id =
            "playlistMessage";

        messageBox.className =
            "playlist-message";

        document.body.appendChild(
            messageBox
        );

    }


    messageBox.textContent =
        message;


    messageBox.classList.add("show");


    setTimeout(() => {

        messageBox.classList.remove("show");

    }, 2500);

}


if (playlistCarousel) {

    // =========================================
    // NEXT
    // =========================================

    if (playlistNext) {

        playlistNext.addEventListener("click", function () {

            playlistCarousel.scrollBy({
                left: playlistCarousel.clientWidth * 0.75,
                behavior: "smooth"
            });

        });

    }


    // =========================================
    // PREVIOUS
    // =========================================

    if (playlistPrev) {

        playlistPrev.addEventListener("click", function () {

            playlistCarousel.scrollBy({
                left: -(playlistCarousel.clientWidth * 0.75),
                behavior: "smooth"
            });

        });

    }


    // =========================================
    // UPDATE ARROWS
    // =========================================

    function updatePlaylistArrows() {

        const maxScroll =
            playlistCarousel.scrollWidth -
            playlistCarousel.clientWidth;


        // Previous button
        if (playlistPrev) {

            playlistPrev.disabled =
                playlistCarousel.scrollLeft <= 5;

        }


        // Next button
        if (playlistNext) {

            playlistNext.disabled =
                playlistCarousel.scrollLeft >= maxScroll - 5;

        }

    }


    // =========================================
    // LISTEN FOR SCROLL
    // =========================================

    playlistCarousel.addEventListener(
        "scroll",
        updatePlaylistArrows
    );


    // =========================================
    // RESIZE
    // =========================================

    window.addEventListener(
        "resize",
        updatePlaylistArrows
    );


    // Initial state
    updatePlaylistArrows();

}

// INITIALIZE

displayTrendingPlaylists();

// END OF TRENDING PLAYLIST




// WAVECRAFT MUSIC SYSTEM
// Recommended Albums + Popular Artists + Trending Artist

document.addEventListener("DOMContentLoaded", function () {

    // AUDIO PLAYER ELEMENTS 

    const audio = document.getElementById("audioPlayer");
    const musicPlayer = document.getElementById("musicPlayer");

    const playerImage = document.getElementById("playerImage");
    const playerTitle = document.getElementById("playerTitle");
    const playerArtist = document.getElementById("playerArtist");

    const playPauseBtn = document.getElementById("playPauseBtn");
    const closePlayer = document.getElementById("closePlayer");

    const progressBar = document.getElementById("progressBar");
    const currentTime = document.getElementById("currentTime");
    const duration = document.getElementById("duration");

    const volumeBar = document.getElementById("volumeBar");


    //  CHECK AUDIO PLAYER 

    if (!audio) {

        console.error(
            "WAVECRAFT ERROR: #audioPlayer was not found."
        );

        return;

    }


    // CURRENT PLAYING CARD 

    let currentCard = null;


    //  RECOMMENDED ALBUMS

    const wavecraftAlbums = [

        {
            id: "lungu-boy",
            name: "M$NEY",
            artist: "Asake",
            image: "img/Gratitude.webp",

            song: {
                title: "Intro",
                artist: "Asake",
                image: "img/Gratitude.webp",
                file: "audio/Asake-Intro-(JustNaija.com).mp3"
            }
        },

        {
            id: "b4-b4",
            name: "Oriade",
            artist: "Davido",
            image: "img/oriade.webp",

            song: {
                title: "On The Road",
                artist: "Davido",
                image: "img/oriade.webp",
                file: "audio/Davido-On-The-Road-(JustNaija.com).mp3"
            }
        },

        {
            id: "no-excuses",
            name: "Morayo",
            artist: "Wizkid",
            image: "img/wizkid_-_Morayo.png",

            song: {
                title: "Trouble Mind",
                artist: "Wizkid",
                image: "img/wizkid_-_Morayo.png",
                file: "audio/Wizkid-Troubled-Mind-(JustNaija.com).mp3"
            }
        },

        {
            id: "eja-meja",
            name: "The Machine Is Coming",
            artist: "ODUMODUBLVCK",
            image: "img/machine.jpg",

            song: {
                title: "LEGOLAS",
                artist: "ODUMODUBLVCK",
                image: "img/machine.jpg",
                file: "audio/ODUMODUBLVCK-LEGOLAS-(JustNaija.com).mp3"
            }
        },

        {
            id: "gta",
            name: "Thy Kingdom Come",
            artist: "Seyi Vibez",
            image: "img/manoftheyear.webp",

            song: {
                title: "Man Of The Year",
                artist: "Seyi Vibez",
                image: "img/manoftheyear.webp",
                file: "audio/Seyi-Vibez-Man-of-The-Year-(JustNaija.com).mp3"
            }
        },

        {
            id: "timeless",
            name: "I'm The Blueprint",
            artist: "Qing Madi",
            image: "img/blueprint.jpg",

            song: {
                title: "Bucket List",
                artist: "Qing Madi",
                image: "img/blueprint.jpg",
                file: "audio/Qing-Madi-Bucket-List-(JustNaija.com).mp3"
            }
        },

        {
            id: "swag",
            name: "No Sign of Weakness",
            artist: "Burna Boy",
            image: "img/weakness.webp",

            song: {
                title: "No Panic",
                artist: "Burna Boy",
                image: "img/weakness.webp",
                file: "audio/Burna-Boy-No-Panic-(JustNaija.com).mp3"
            }
        },

        {
            id: "born-in-the-wild",
            name: "Love is a Kingdom",
            artist: "Tems",
            image: "img/love.jpeg",

            song: {
                title: "First",
                artist: "Tems",
                image: "img/love.jpeg",
                file: "audio/Tems-First-(JustNaija.com).mp3"
            }
        }

    ];


    //  GET ALL PLAYABLE CARDS 

    function getAllCards() {

        return document.querySelectorAll(
            ".album-card, .wc-artist-card, .music-card, .top-chart-card"
        );

    }


    //  REMOVE PLAYING STATES 

    function clearPlayingCards() {

        getAllCards().forEach(card => {

            card.classList.remove("active");
            card.classList.remove("playing");

        });

    }


    //  UPDATE BOTTOM PLAYER

    function updatePlayer(song) {

        if (playerImage) {

            playerImage.src = song.image || "";

            playerImage.alt =
                song.title || "WaveCraft";

        }


        if (playerTitle) {

            playerTitle.textContent =
                song.title || "Unknown Song";

        }


        if (playerArtist) {

            playerArtist.textContent =
                song.artist || "Unknown Artist";

        }


        if (musicPlayer) {

            musicPlayer.classList.add("active");

        }

    }


    //  UPDATE PLAY BUTTON

    function updatePlayPauseIcon() {

        if (!playPauseBtn) return;


        if (audio.paused) {

            playPauseBtn.innerHTML =
                '<i class="ri-play-fill"></i>';

        } else {

            playPauseBtn.innerHTML =
                '<i class="ri-pause-fill"></i>';

        }

    }


    // MAIN PLAY FUNCTION 

    function playSong(song, card) {

        if (!song || !song.file) {

            console.error(
                "WAVECRAFT ERROR: Song file is missing."
            );

            return;

        }

        if (window.WaveCraftPlayer) {
            clearPlayingCards();
            currentCard = card;
            if (currentCard) currentCard.classList.add("active");
            const pageQueue = Array.from(
                document.querySelectorAll(".play-btn[data-song], .wc-artist-play[data-song]")
            ).map(button => ({
                file: button.dataset.song,
                title: button.dataset.title,
                artist: button.dataset.artist,
                image: button.dataset.image
            }));
            window.WaveCraftPlayer.play(song, pageQueue);
            return;
        }


        /* Stop previous visual state */

        clearPlayingCards();


        /* Remember current card */

        currentCard = card;


        /* Activate current card */

        if (currentCard) {

            currentCard.classList.add("active");

        }


        /* Load audio */

        audio.src = song.file;

        audio.load();


        /* Update bottom player */

        updatePlayer(song);


        /* Play */

        const promise = audio.play();


        if (promise !== undefined) {

            promise

                .then(() => {

                    if (currentCard) {

                        currentCard.classList.add(
                            "playing"
                        );

                    }

                    updatePlayPauseIcon();

                })

                .catch(error => {

                    console.error(
                        "WAVECRAFT AUDIO ERROR:",
                        error
                    );

                });

        }

    }


    // 1. RECOMMENDED ALBUMS

    const albumCarousel =
        document.getElementById("albumCarousel");

    const albumPrev =
        document.getElementById("albumPrev");

    const albumNext =
        document.getElementById("albumNext");


    if (albumCarousel) {

        albumCarousel.innerHTML = "";


        wavecraftAlbums.forEach(album => {

            const card =
                document.createElement("article");


            card.className =
                "album-card";


            card.dataset.albumId =
                album.id;


            card.innerHTML = `

                <div class="album-artwork-wrapper">

                    <div class="album-artwork">

                        <img
                            src="${album.image}"
                            alt="${album.name}"
                            loading="lazy"
                        >

                    </div>

                    <div
                        class="album-headphones"
                        aria-hidden="true"
                    ></div>

                </div>

                <div class="album-info">

                    <h3 class="album-name">
                        ${album.name}
                    </h3>

                    <p class="album-artist">
                        ${album.artist}
                    </p>

                </div>

            `;


            //  ALBUM CLICK

            card.addEventListener(
                "click",
                function () {

                    playSong(
                        album.song,
                        card
                    );

                }
            );


            albumCarousel.appendChild(card);

        });

    }


    // ALBUM CAROUSEL 

    function updateAlbumArrows() {

        if (!albumCarousel) return;


        const maxScroll =
            albumCarousel.scrollWidth -
            albumCarousel.clientWidth;


        if (albumPrev) {

            albumPrev.disabled =
                albumCarousel.scrollLeft <= 5;

        }


        if (albumNext) {

            albumNext.disabled =
                albumCarousel.scrollLeft >=
                maxScroll - 5;

        }

    }


    if (albumNext && albumCarousel) {

        albumNext.addEventListener(
            "click",
            function () {

                albumCarousel.scrollBy({

                    left:
                        albumCarousel.clientWidth * 0.8,

                    behavior:
                        "smooth"

                });

            }
        );

    }


    if (albumPrev && albumCarousel) {

        albumPrev.addEventListener(
            "click",
            function () {

                albumCarousel.scrollBy({

                    left:
                        -(albumCarousel.clientWidth * 0.8),

                    behavior:
                        "smooth"

                });

            }
        );

    }


    if (albumCarousel) {

        albumCarousel.addEventListener(
            "scroll",
            updateAlbumArrows
        );

    }


    window.addEventListener(
        "resize",
        updateAlbumArrows
    );


    updateAlbumArrows();


    // 2. POPULAR + TRENDING ARTISTS

    const artistSections =
        document.querySelectorAll(
            ".wc-popular-artists"
        );


    artistSections.forEach(section => {

        const artistsRow =
            section.querySelector(
                ".wc-artists-row"
            );


        const artistPrev =
            section.querySelector(
                ".artist-prev"
            );


        const artistNext =
            section.querySelector(
                ".artist-next"
            );


        // ARTIST PLAY BUTTONS

        const artistButtons =
            section.querySelectorAll(
                ".wc-artist-play"
            );


        artistButtons.forEach(button => {

            button.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    const card =
                        this.closest(
                            ".wc-artist-card"
                        );


                    const song = {

                        title:
                            this.dataset.title,

                        artist:
                            this.dataset.artist,

                        image:
                            this.dataset.image,

                        file:
                            this.dataset.song

                    };


                    playSong(
                        song,
                        card
                    );

                }
            );

        });


        // ARTIST CAROUSEL

        if (!artistsRow) return;


        const scrollAmount = 500;

        let autoSlide;


        if (artistNext) {

            artistNext.addEventListener(
                "click",
                function () {

                    artistsRow.scrollBy({

                        left:
                            scrollAmount,

                        behavior:
                            "smooth"

                    });


                    restartArtistSlider();

                }
            );

        }


        if (artistPrev) {

            artistPrev.addEventListener(
                "click",
                function () {

                    artistsRow.scrollBy({

                        left:
                            -scrollAmount,

                        behavior:
                            "smooth"

                    });


                    restartArtistSlider();

                }
            );

        }


        function autoSlideArtists() {

            const maxScroll =
                artistsRow.scrollWidth -
                artistsRow.clientWidth;


            if (maxScroll <= 0) return;


            if (
                artistsRow.scrollLeft >=
                maxScroll - 10
            ) {

                artistsRow.scrollTo({

                    left: 0,

                    behavior:
                        "smooth"

                });

            } else {

                artistsRow.scrollBy({

                    left:
                        scrollAmount,

                    behavior:
                        "smooth"

                });

            }

        }


        function restartArtistSlider() {

            clearInterval(autoSlide);


            autoSlide =
                setInterval(
                    autoSlideArtists,
                    5500
                );

        }


        restartArtistSlider();

    });


    // 3. POPULAR MUSIC

    document
        .querySelectorAll(
            ".popular-music"
        )
        .forEach(section => {

            const musicRow =
                section.querySelector(
                    ".music-row"
                );


            const musicPrev =
                section.querySelector(
                    ".music-prev"
                );


            const musicNext =
                section.querySelector(
                    ".music-next"
                );


            if (!musicRow) return;


            // PLAY BUTTONS

            const buttons =
                section.querySelectorAll(
                    ".play-btn"
                );


            buttons.forEach(button => {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();


                        const card =
                            this.closest(
                                ".music-card"
                            );


                        const song = {

                            title:
                                this.dataset.title,

                            artist:
                                this.dataset.artist,

                            image:
                                this.dataset.image,

                            file:
                                this.dataset.song

                        };


                        playSong(
                            song,
                            card
                        );

                    }
                );

            });


            // CAROUSEL

            const scrollAmount = 500;

            let autoSlide;


            if (musicNext) {

                musicNext.addEventListener(
                    "click",
                    function () {

                        musicRow.scrollBy({

                            left:
                                scrollAmount,

                            behavior:
                                "smooth"

                        });

                        restartMusicSlider();

                    }
                );

            }


            if (musicPrev) {

                musicPrev.addEventListener(
                    "click",
                    function () {

                        musicRow.scrollBy({

                            left:
                                -scrollAmount,

                            behavior:
                                "smooth"

                        });

                        restartMusicSlider();

                    }
                );

            }


            function autoSlideMusic() {

                const maxScroll =
                    musicRow.scrollWidth -
                    musicRow.clientWidth;


                if (maxScroll <= 0) return;


                if (
                    musicRow.scrollLeft >=
                    maxScroll - 10
                ) {

                    musicRow.scrollTo({

                        left: 0,

                        behavior:
                            "smooth"

                    });

                } else {

                    musicRow.scrollBy({

                        left:
                            scrollAmount,

                        behavior:
                            "smooth"

                    });

                }

            }


            function restartMusicSlider() {

                clearInterval(autoSlide);


                autoSlide =
                    setInterval(
                        autoSlideMusic,
                        6000
                    );

            }


            restartMusicSlider();

        });


    // 4. AUDIO EVENTS

    audio.addEventListener(
        "play",
        function () {

            if (currentCard) {

                currentCard.classList.add(
                    "playing"
                );

            }


            updatePlayPauseIcon();

        }
    );


    audio.addEventListener(
        "pause",
        function () {

            if (currentCard) {

                currentCard.classList.remove(
                    "playing"
                );

            }


            updatePlayPauseIcon();

        }
    );


    audio.addEventListener(
        "ended",
        function () {

            if (currentCard) {

                currentCard.classList.remove(
                    "playing"
                );

                currentCard.classList.remove(
                    "active"
                );

            }


            currentCard = null;

            updatePlayPauseIcon();

        }
    );


    // 5. PLAY / PAUSE

    if (playPauseBtn) {

        playPauseBtn.addEventListener(
            "click",
            function () {

                if (!audio.src) return;


                if (audio.paused) {

                    audio.play()
                        .catch(error => {

                            console.error(
                                error
                            );

                        });

                } else {

                    audio.pause();

                }

            }
        );

    }


    function isPhoneLayout() {
        return window.innerWidth <= 767;
    }

    function syncMobilePlayerState() {
        if (!musicPlayer) return;

        if (!isPhoneLayout()) {
            musicPlayer.classList.remove("mobile-expanded");
            return;
        }

        if (!musicPlayer.classList.contains("active")) {
            musicPlayer.classList.remove("mobile-expanded");
        }
    }

    if (musicPlayer) {

        musicPlayer.addEventListener(
            "click",
            function (event) {

                if (!isPhoneLayout()) return;

                if (
                    event.target.closest("button") ||
                    event.target.closest("input")
                ) {
                    return;
                }

                if (!musicPlayer.classList.contains("active")) return;

                musicPlayer.classList.toggle("mobile-expanded");

            }
        );

    }


    // 6. CLOSE PLAYER

    if (closePlayer) {

        closePlayer.addEventListener(
            "click",
            function (event) {

                if (isPhoneLayout()) {

                    if (musicPlayer && musicPlayer.classList.contains("mobile-expanded")) {
                        musicPlayer.classList.remove("mobile-expanded");
                        event.stopPropagation();
                        return;
                    }

                }

                audio.pause();

                audio.removeAttribute(
                    "src"
                );

                audio.load();


                if (currentCard) {

                    currentCard.classList.remove(
                        "active"
                    );

                    currentCard.classList.remove(
                        "playing"
                    );

                }


                currentCard = null;


                if (musicPlayer) {

                    musicPlayer.classList.remove(
                        "active"
                    );

                    musicPlayer.classList.remove("mobile-expanded");

                }


                if (progressBar) {

                    progressBar.value = 0;

                }


                if (currentTime) {

                    currentTime.textContent =
                        "0:00";

                }


                if (duration) {

                    duration.textContent =
                        "0:00";

                }


                updatePlayPauseIcon();

            }
        );

    }

    window.addEventListener("resize", syncMobilePlayerState);


    // 7. PROGRESS

    audio.addEventListener(
        "timeupdate",
        function () {

            if (!audio.duration) return;


            const percentage =
                (audio.currentTime /
                    audio.duration) *
                100;


            if (progressBar) {

                progressBar.value =
                    percentage;

            }


            if (currentTime) {

                currentTime.textContent =
                    formatTime(
                        audio.currentTime
                    );

            }


            if (duration) {

                duration.textContent =
                    formatTime(
                        audio.duration
                    );

            }

        }
    );


    // 8. SEEK

    if (progressBar) {

        progressBar.addEventListener(
            "input",
            function () {

                if (!audio.duration) return;


                audio.currentTime =
                    (
                        this.value / 100
                    ) *
                    audio.duration;

            }
        );

    }


    // 9. VOLUME

    if (volumeBar) {

        audio.volume =
            volumeBar.value;


        volumeBar.addEventListener(
            "input",
            function () {

                audio.volume =
                    this.value;

            }
        );

    }


    // 10. FORMAT TIME

    function formatTime(seconds) {

        if (isNaN(seconds)) {

            return "0:00";

        }


        const minutes =
            Math.floor(
                seconds / 60
            );


        const secs =
            Math.floor(
                seconds % 60
            );


        return (
            minutes +
            ":" +
            (secs < 10 ? "0" : "") +
            secs
        );

    }


    console.log(
        "WaveCraft music system initialized successfully."
    );

});







// WAVECRAFT — UP & COMING ARTISTS
// ELEMENTS
const upcomingCarousel =
    document.getElementById("upcomingCarousel");

const upcomingPrev =
    document.getElementById("upcomingPrev");

const upcomingNext =
    document.getElementById("upcomingNext");

const upcomingAudio =  document.getElementById("audioPlayer");


// ============================================================
// UP & COMING MUSIC DATA
// ============================================================

const upcomingArtists = [

    {
        id: "d-rhock",

        title: "CHOKE ME",

        artist: "D RHOCK",

        // IMAGE USED ON THE CARD
        image: "img/drhock.jpg",

        // DIFFERENT IMAGE USED IN THE PLAYER
        playerImage: "img/choke.jpg",

        // AUDIO FILE
        song: "audio/D-RHOCK-Choke-Me-(JustNaija.com).mp3"
    },


    {
        id: "I KNOW",

        title: "I KNOW",

        artist: "EF MOON",

        image: "img/ef-moon.jpg",

        playerImage: "img/i-know.jpg",

        song: "audio/EF-Moon-I-Knoww-ft.-Star-Jay.mp3"
    },


    {
        id: "Ordinary",

        title: "Ordinary",

        artist: "Alex Warren",

        image: "img/alex-warren.jpg",

        playerImage: "img/ordinary.jpg",

        song: "audio/Alex warren - Ordinary.mp3"
    },


    {
        id: "Tease Me",

        title: "Tease Me",

        artist: "Zaylevelten",

        image: "img/tease-me.jpg",

        playerImage: "img/Zaylevelten.webp",

        song: "audio/Zaylevelten_-_-_Tease_MeHipopsongs.com.ng.mp3"
    },


    {
        id: "Champion",

        title: "Champion",

        artist: "Champz",

        image: "img/champz.webp",

        playerImage: "img/boluwatife.jpg",

        song: "audio/Champz-Champion-Sound-(JustNaija.com).mp3"
    },


    {
        id: "Machine Girl",

        title: "Machine Girl",

        artist: "ADELA",

        image: "img/machine-girl.jpg",

        playerImage: "img/adela.png",

        song: "audio/MachineGirl.mp3"
    }

];


// DISPLAY UP & COMING CARDS

function displayUpcomingArtists() {

    if (!upcomingCarousel) {

        console.error(
            "WaveCraft: #upcomingCarousel was not found."
        );

        return;
    }


    // Clear existing cards

    upcomingCarousel.innerHTML = "";


    // Create each card

    upcomingArtists.forEach(song => {

        const card =
            document.createElement("article");


        card.className =
            "upcoming-card";


        card.dataset.songId =
            song.id;


        // CARD HTML

        card.innerHTML = `

            <div class="upcoming-artwork">

                <img
                    src="${song.image}"
                    alt="${song.title} by ${song.artist}"
                    loading="lazy"
                    onerror="this.style.display='none';"
                >

                <div class="upcoming-play-overlay">

                    <i class="ri-play-fill"></i>

                </div>

            </div>


            <div class="upcoming-info">

                <div class="upcoming-title-row">

                    <h3 class="upcoming-title">
                        ${song.title}
                    </h3>

                    <button
                        type="button"
                        class="upcoming-like"
                        data-song-id="${song.id}"
                        aria-label="Like ${song.title}"
                    >

                        <i class="ri-heart-line"></i>

                    </button>

                </div>


                <p class="upcoming-artist">
                    ${song.artist}
                </p>

            </div>

        `;


        // CLICK CARD TO PLAY

        card.addEventListener(
            "click",
            function () {

                playUpcomingSong(song, card);

            }
        );


        // LIKE BUTTON

        const likeButton =
            card.querySelector(".upcoming-like");


        if (likeButton) {

            likeButton.addEventListener(
                "click",
                function (event) {

                    // Prevent card click
                    event.stopPropagation();


                    toggleUpcomingLike(
                        song,
                        likeButton
                    );

                }
            );

        };


        // ADD CARD

        upcomingCarousel.appendChild(card);

    });


    // Restore previously liked songs

    restoreLikedSongs();


    // Update carousel arrows

    updateUpcomingArrows();

}


// PLAY UPCOMING SONG

function playUpcomingSong(song, card) {

    if (!upcomingAudio) {

        console.error(
            "WaveCraft: #audioPlayer was not found."
        );

        return;
    }

    if (window.WaveCraftPlayer) {
        window.WaveCraftPlayer.play(song);
        if (card) card.classList.add("playing");
        return;
    }


    // REMOVE PLAYING STATE FROM OTHER CARDS

    document
        .querySelectorAll(".upcoming-card")
        .forEach(item => {

            item.classList.remove("playing");

        });


    // Add playing state to selected card

    if (card) {

        card.classList.add("playing");

    }

    // LOAD SONG

    upcomingAudio.src =
        song.song;

    upcomingAudio.load();


    // UPDATE PLAYER IMAGE

    if (playerImage) {

        playerImage.src =
            song.playerImage || song.image;

        playerImage.alt =
            song.title;

    }


    // UPDATE PLAYER TITLE

    if (playerTitle) {

        playerTitle.textContent =
            song.title;

    }

    // UPDATE PLAYER ARTIST

    if (playerArtist) {

        playerArtist.textContent =
            song.artist;

    }

    // SHOW MUSIC PLAYER

    if (musicPlayer) {

        musicPlayer.classList.add("active");

    }


    // PLAY

    const playPromise =
        upcomingAudio.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                console.log(
                    "Now playing:",
                    song.title,
                    "-",
                    song.artist
                );

            })
            .catch(error => {

                console.error(
                    "WaveCraft playback error:",
                    error
                );

            });

    }

}


// AUDIO EVENTS

if (upcomingAudio) {

    // SONG STARTED PLAYING

    upcomingAudio.addEventListener(
        "play",
        function () {

            console.log(
                "WaveCraft audio is playing."
            );

        }
    );

    // SONG PAUSED

    upcomingAudio.addEventListener(
        "pause",
        function () {

            document
                .querySelectorAll(".upcoming-card")
                .forEach(card => {

                    card.classList.remove("playing");

                });

        }
    );

    // SONG ENDED

    upcomingAudio.addEventListener(
        "ended",
        function () {

            document
                .querySelectorAll(".upcoming-card")
                .forEach(card => {

                    card.classList.remove("playing");

                });

        }
    );


    // AUDIO ERROR

    upcomingAudio.addEventListener(
        "error",
        function () {

            console.error(
                "WaveCraft: Audio file could not be loaded:",
                upcomingAudio.src
            );

        }
    );

}


// LIKE / UNLIKE

function toggleUpcomingLike(song, button) {

    let likedSongs =
        JSON.parse(
            localStorage.getItem(
                "wavecraftLikedSongs"
            )
        ) || [];


    const existingIndex =
        likedSongs.findIndex(
            item => item.id === song.id
        );


    // ADD TO LIKED

    if (existingIndex === -1) {

        likedSongs.push({

            id: song.id,

            title: song.title,

            artist: song.artist,

            image: song.image,

            playerImage: song.playerImage,

            song: song.song

        });


        button.classList.add("liked");


        button.innerHTML =
            `<i class="ri-heart-fill"></i>`;


        button.setAttribute(
            "aria-label",
            `Remove ${song.title} from liked music`
        );

    }


    // REMOVE FROM LIKED

    else {

        likedSongs.splice(
            existingIndex,
            1
        );


        button.classList.remove("liked");


        button.innerHTML =
            `<i class="ri-heart-line"></i>`;


        button.setAttribute(
            "aria-label",
            `Like ${song.title}`
        );

    }


    // Save

    localStorage.setItem(
        "wavecraftLikedSongs",
        JSON.stringify(likedSongs)
    );

}


// RESTORE LIKED SONGS

function restoreLikedSongs() {

    let likedSongs =
        JSON.parse(
            localStorage.getItem(
                "wavecraftLikedSongs"
            )
        ) || [];


    document
        .querySelectorAll(".upcoming-like")
        .forEach(button => {

            const songId =
                button.dataset.songId;


            const isLiked =
                likedSongs.some(
                    song => song.id === songId
                );


            if (isLiked) {

                button.classList.add("liked");


                button.innerHTML =
                    `<i class="ri-heart-fill"></i>`;

            }

        });

}


// UP & COMING CAROUSEL ARROWS

function scrollUpcoming(direction) {

    if (!upcomingCarousel) {
        console.error("upcomingCarousel not found");
        return;
    }

    // Get the first card
    const firstCard =
        upcomingCarousel.querySelector(".upcoming-card");

    if (!firstCard) {
        console.error("No upcoming cards found");
        return;
    }

    // Get card width
    const cardWidth =
        firstCard.getBoundingClientRect().width;

    // Get carousel gap
    const carouselStyle =
        window.getComputedStyle(upcomingCarousel);

    const gap =
        parseFloat(carouselStyle.columnGap) ||
        parseFloat(carouselStyle.gap) ||
        30;

    // Move approximately 3 cards
    const scrollAmount =
        (cardWidth + gap) * 3;

    upcomingCarousel.scrollBy({

        left:
            direction === "next"
                ? scrollAmount
                : -scrollAmount,

        behavior: "smooth"

    });

}


// NEXT ARROW

if (upcomingNext) {

    upcomingNext.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            scrollUpcoming("next");

        }
    );

}


// PREVIOUS ARROW

if (upcomingPrev) {

    upcomingPrev.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            scrollUpcoming("previous");

        }
    );

}


// KEEP ARROWS ALWAYS AVAILABLE

function updateUpcomingArrows() {

    if (!upcomingCarousel) return;

    /*
       We deliberately DO NOT disable the buttons.

       This prevents the CSS:

       .upcoming-arrow:disabled {
           opacity: 0;
           pointer-events: none;
       }

       from making the arrows disappear.
    */

    if (upcomingPrev) {
        upcomingPrev.disabled = false;
    }

    if (upcomingNext) {
        upcomingNext.disabled = false;
    }

}


// UPDATE AFTER SCROLL

if (upcomingCarousel) {

    upcomingCarousel.addEventListener(
        "scroll",
        function () {

            updateUpcomingArrows();

        }
    );

}


// UPDATE ON RESIZE

window.addEventListener(
    "resize",
    function () {

        updateUpcomingArrows();

    }
);


// INITIAL ARROW STATE

updateUpcomingArrows();


// Wait for layout/images before checking arrows

window.requestAnimationFrame(
    function () {

        updateUpcomingArrows();

    }
);

// DISPLAY THE CARDS
displayUpcomingArtists();

// END OF UP & COMING ARTIST




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
const navlinks=document.querySelectorAll(".nav-link a");

// select all sections
const sections=document.querySelectorAll("section");

// listen for scrolling
window.addEventListener("scroll", () => {
  let currentSection="";

  // check which section is currently on the screen
  sections.forEach(section => {
    const sectionTop=section.offsetTop - 120;
    const sectionHeight=section.offsetHeight;
    if(window.scrollY >= sectionTop){
      currentSection=section.getAttribute("id");

    }

  });

  // remove the active class from every link
  navlinks.forEach(link => {
    link.classList.remove("active");
    
    // add the ative class to the matching link
    if(link.getAttribute("href")==="#"+currentSection){
      link.classList.add("active");
    }
  });

});