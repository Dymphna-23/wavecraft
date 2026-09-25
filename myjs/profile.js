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


// =========================================================
// WAVECRAFT PROFILE PAGE
// =========================================================


// =========================================================
// WAIT FOR PAGE
// =========================================================

document.addEventListener("DOMContentLoaded", function () {


    // =====================================================
    // ELEMENTS
    // =====================================================

    const profileName =
        document.getElementById("profileName");

    const profileNameButton =
        document.getElementById("profileNameButton");

    const profileImage =
        document.getElementById("profileImage");

    const profileImageButton =
        document.getElementById("profileImageButton");

    const profileImageModal =
        document.getElementById("profileImageModal");

    const profileImageInput =
        document.getElementById("profileImageInput");

    const removeProfileImage =
        document.getElementById("removeProfileImage");

    const usernameModal =
        document.getElementById("usernameModal");

    const usernameInput =
        document.getElementById("usernameInput");

    const saveUsernameButton =
        document.getElementById("saveUsernameButton");

    const playlistCount =
        document.getElementById("playlistCount");

    const mostListenedGrid =
        document.getElementById("mostListenedGrid");

    const mostListenedEmpty =
        document.getElementById("mostListenedEmpty");

    const accountList =
        document.getElementById("accountList");

    const addAccountButton =
        document.getElementById("addAccountButton");

    const logoutButton =
        document.getElementById("logoutButton");

    const logoutModal =
        document.getElementById("logoutModal");

    const confirmLogoutButton =
        document.getElementById("confirmLogoutButton");


    // =====================================================
    // GET USER
    // =====================================================

    function getUser() {

        const savedUser =
            localStorage.getItem("wavecraftUser");

        if (!savedUser) {

            return null;

        }

        try {

            return JSON.parse(savedUser);

        } catch (error) {

            console.error(
                "WaveCraft user data is invalid:",
                error
            );

            return null;

        }

    }


    let currentUser = getUser();


    // =====================================================
    // IF USER IS NOT LOGGED IN
    // =====================================================

    if (!currentUser) {

        window.location.href = "login.html";

        return;

    }


    // =====================================================
    // ENSURE USERNAME EXISTS
    // =====================================================

    if (!currentUser.username) {

        currentUser.username =
            currentUser.firstName || "WaveCraft User";

        saveUser();

    }


    // =====================================================
    // SAVE USER
    // =====================================================

    function saveUser() {

        localStorage.setItem(
            "wavecraftUser",
            JSON.stringify(currentUser)
        );

    }


    // =====================================================
    // GET INITIALS
    // =====================================================

    function getInitials(user) {

        if (!user) return "WC";

        const first =
            user.firstName
                ? user.firstName.charAt(0)
                : "";

        const last =
            user.lastName
                ? user.lastName.charAt(0)
                : "";

        const initials =
            (first + last).toUpperCase();

        return initials || "WC";

    }


    // =====================================================
    // DEFAULT PROFILE IMAGE
    // =====================================================

    function createDefaultAvatar() {

        return `
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
            >

                <rect
                    width="200"
                    height="200"
                    fill="#242424"
                />

                <circle
                    cx="100"
                    cy="72"
                    r="35"
                    fill="none"
                    stroke="#8b8b8b"
                    stroke-width="12"
                />

                <path
                    d="M45 165
                       C45 130 72 112 100 112
                       C128 112 155 130 155 165"
                    fill="none"
                    stroke="#8b8b8b"
                    stroke-width="12"
                />

            </svg>
        `;

    }


    // =====================================================
    // LOAD PROFILE IMAGE
    // =====================================================

    function loadProfileImage() {

        if (!profileImage) return;


        if (currentUser.profileImage) {

            profileImage.src =
                currentUser.profileImage;

            profileImage.classList.remove(
                "default-avatar"
            );

            return;

        }


        const svg =
            createDefaultAvatar();

        profileImage.src =
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(svg);

        profileImage.classList.add(
            "default-avatar"
        );

    }


    // =====================================================
    // LOAD PROFILE INFORMATION
    // =====================================================

    function loadProfileInformation() {

        if (profileName) {

            profileName.textContent =
                currentUser.username ||
                currentUser.firstName ||
                "WaveCraft User";

        }


        loadProfileImage();

        updatePlaylistCount();

    }


    // =====================================================
    // PLAYLIST COUNT
    // =====================================================

    function getPlaylists() {

        const possibleKeys = [

            "wavecraftPlaylists",

            "playlists",

            "wavecraftUserPlaylists"

        ];


        for (
            let i = 0;
            i < possibleKeys.length;
            i++
        ) {

            const data =
                localStorage.getItem(
                    possibleKeys[i]
                );

            if (!data) continue;


            try {

                const parsed =
                    JSON.parse(data);


                if (Array.isArray(parsed)) {

                    return parsed;

                }

                if (
                    parsed &&
                    Array.isArray(parsed.playlists)
                ) {

                    return parsed.playlists;

                }

            } catch (error) {

                console.warn(
                    "Could not read playlist data:",
                    error
                );

            }

        }


        return [];

    }


    function updatePlaylistCount() {

        const playlists =
            getPlaylists();


        // Only count playlists that are explicitly
        // public if that information exists.

        let publicPlaylists =
            playlists;


        if (playlists.length) {

            const hasVisibilityData =
                playlists.some(
                    playlist =>
                        playlist &&
                        (
                            playlist.isPublic !== undefined ||
                            playlist.public !== undefined ||
                            playlist.visibility !== undefined
                        )
                );


            if (hasVisibilityData) {

                publicPlaylists =
                    playlists.filter(
                        playlist => {

                            return (
                                playlist.isPublic === true ||
                                playlist.public === true ||
                                playlist.visibility === "public"
                            );

                        }
                    );

            }

        }


        const count =
            publicPlaylists.length;


        if (!playlistCount) return;


        if (count === 1) {

            playlistCount.textContent =
                "1 Public Playlist";

        } else {

            playlistCount.textContent =
                `${count} Public Playlists`;

        }

    }


    // =====================================================
    // OPEN MODAL
    // =====================================================

    function openModal(modal) {

        if (!modal) return;

        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    // =====================================================
    // CLOSE MODAL
    // =====================================================

    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        if (
            !document.querySelector(
                ".profile-modal.active"
            )
        ) {

            document.body.classList.remove(
                "modal-open"
            );

        }

    }


    // =====================================================
    // CLOSE ALL MODALS
    // =====================================================

    function closeAllModals() {

        document
            .querySelectorAll(".profile-modal")
            .forEach(modal => {

                closeModal(modal);

            });

    }


    // =====================================================
    // PROFILE IMAGE CLICK
    // =====================================================

    if (profileImageButton) {

        profileImageButton.addEventListener(
            "click",
            function () {

                openModal(profileImageModal);

            }
        );

    }


    // =====================================================
    // SELECT PROFILE IMAGE
    // =====================================================

    if (profileImageInput) {

        profileImageInput.addEventListener(
            "change",
            function () {

                const file =
                    this.files[0];


                if (!file) return;


                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) {

                    return;

                }


                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        const imageData =
                            event.target.result;


                        currentUser.profileImage =
                            imageData;


                        saveUser();


                        loadProfileImage();


                        // Update navbar if the
                        // existing navbar listens
                        // for this event.

                        window.dispatchEvent(
                            new CustomEvent(
                                "wavecraft:userUpdated",
                                {
                                    detail: currentUser
                                }
                            )
                        );


                        closeModal(
                            profileImageModal
                        );

                    };


                reader.readAsDataURL(file);


                // Reset input so selecting
                // the same image again works.

                this.value = "";

            }
        );

    }


    // =====================================================
    // REMOVE PROFILE IMAGE
    // =====================================================

    if (removeProfileImage) {

        removeProfileImage.addEventListener(
            "click",
            function () {

                delete currentUser.profileImage;

                saveUser();

                loadProfileImage();


                window.dispatchEvent(
                    new CustomEvent(
                        "wavecraft:userUpdated",
                        {
                            detail: currentUser
                        }
                    )
                );


                closeModal(
                    profileImageModal
                );

            }
        );

    }


    // =====================================================
    // PROFILE NAME CLICK
    // =====================================================

    if (profileNameButton) {

        profileNameButton.addEventListener(
            "click",
            function () {

                if (usernameInput) {

                    usernameInput.value =
                        currentUser.username ||
                        currentUser.firstName ||
                        "";

                }


                openModal(usernameModal);


                setTimeout(
                    function () {

                        if (usernameInput) {

                            usernameInput.focus();

                            usernameInput.select();

                        }

                    },
                    100
                );

            }
        );

    }


    // =====================================================
    // SAVE USERNAME
    // =====================================================

    if (saveUsernameButton) {

        saveUsernameButton.addEventListener(
            "click",
            function () {

                if (!usernameInput) return;


                const newUsername =
                    usernameInput.value.trim();


                if (!newUsername) {

                    usernameInput.focus();

                    return;

                }


                currentUser.username =
                    newUsername;


                saveUser();


                loadProfileInformation();


                window.dispatchEvent(
                    new CustomEvent(
                        "wavecraft:userUpdated",
                        {
                            detail: currentUser
                        }
                    )
                );


                closeModal(
                    usernameModal
                );

            }
        );

    }


    // =====================================================
    // ENTER KEY FOR USERNAME
    // =====================================================

    if (usernameInput) {

        usernameInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    if (saveUsernameButton) {

                        saveUsernameButton.click();

                    }

                }


                if (
                    event.key === "Escape"
                ) {

                    closeModal(
                        usernameModal
                    );

                }

            }
        );

    }


    // =====================================================
    // CLOSE MODALS
    // =====================================================

    document.addEventListener(
        "click",
        function (event) {

            const closeButton =
                event.target.closest(
                    "[data-close-modal]"
                );


            if (!closeButton) return;


            const modal =
                closeButton.closest(
                    ".profile-modal"
                );


            if (modal) {

                closeModal(modal);

            }

        }
    );


    // =====================================================
    // ESC KEY
    // =====================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeAllModals();

            }

        }
    );


    // =====================================================
    // MOST LISTENED SONG DATA
    // =====================================================

    const fallbackSongs = [

        {
            id: "last-last",
            title: "Last Last",
            artist: "Burna Boy",
            image: "img/last-last.jpg",
            song: "audio/Burna Boy - Last Last.mp3"
        },

        {
            id: "essence",
            title: "Essence",
            artist: "Wizkid ft. Tems",
            image: "img/wizkid essence.jpeg",
            song: "audio/Wizkid-Essence-ft-Tems-(JustNaija.com).mp3"
        },

        {
            id: "free-mind",
            title: "Free Mind",
            artist: "Tems",
            image: "img/tems free mind.jpg",
            song: "audio/Tems - Free Mind.mp3"
        },

        {
            id: "forgiveness",
            title: "Forgiveness",
            artist: "Asake",
            image: "img/Gratitude.webp",
            song: "audio/Asake-Forgiveness-(JustNaija.com).mp3"
        },

        {
            id: "pressure",
            title: "Pressure",
            artist: "Seyi Vibez",
            image: "img/seyi-vibes.jpg",
            song: "audio/Seyi-Vibez-Pressure-Official-Video-(CeeNaija.com).mp3"
        },

        {
            id: "what-you-need",
            title: "What You Need",
            artist: "Tems",
            image: "img/love.jpeg",
            song: "audio/Tems-What-You-Need-(JustNaija.com).mp3"
        }

    ];


    // =====================================================
    // FIND EXISTING SONG DATA
    // =====================================================

    function getExistingSongs() {

        const possibleKeys = [

            "wavecraftSongs",

            "songs",

            "wavecraftMusic",

            "musicLibrary"

        ];


        for (
            let i = 0;
            i < possibleKeys.length;
            i++
        ) {

            const data =
                localStorage.getItem(
                    possibleKeys[i]
                );


            if (!data) continue;


            try {

                const parsed =
                    JSON.parse(data);


                if (Array.isArray(parsed)) {

                    return parsed;

                }

            } catch (error) {

                console.warn(
                    "Could not read songs:",
                    error
                );

            }

        }


        return fallbackSongs;

    }


    // =====================================================
    // GET PLAY COUNTS
    // =====================================================

    function getPlayCounts() {

        const possibleKeys = [

            "wavecraftPlayCounts",

            "playCounts",

            "wavecraftListeningHistory"

        ];


        for (
            let i = 0;
            i < possibleKeys.length;
            i++
        ) {

            const data =
                localStorage.getItem(
                    possibleKeys[i]
                );


            if (!data) continue;


            try {

                const parsed =
                    JSON.parse(data);


                if (
                    parsed &&
                    typeof parsed === "object"
                ) {

                    return parsed;

                }

            } catch (error) {

                console.warn(
                    "Could not read listening data:",
                    error
                );

            }

        }


        return {};

    }


    // =====================================================
    // NORMALIZE SONG
    // =====================================================

    function normalizeSong(song) {

        return {

            id:
                song.id ||
                song.songId ||
                song.slug ||
                song.title,

            title:
                song.title ||
                song.name ||
                "Unknown Song",

            artist:
                song.artist ||
                song.artistName ||
                "Unknown Artist",

            image:
                song.image ||
                song.cover ||
                song.coverImage ||
                song.albumArt ||
                "img/som-choice.png",

            song:
                song.song ||
                song.audio ||
                song.audioUrl ||
                song.src ||
                ""

        };

    }


    // =====================================================
    // GET MOST LISTENED
    // =====================================================

    function getMostListenedSongs() {

        const songs =
            getExistingSongs()
                .map(normalizeSong);


        const playCounts =
            getPlayCounts();


        // Add play count

        const songsWithCounts =
            songs.map(song => {

                let count = 0;


                if (
                    playCounts[song.id] !== undefined
                ) {

                    count =
                        Number(
                            playCounts[song.id]
                        ) || 0;

                }


                if (
                    playCounts[song.title] !== undefined
                ) {

                    count =
                        Number(
                            playCounts[song.title]
                        ) || count;

                }


                return {

                    ...song,

                    playCount: count

                };

            });


        // Sort by actual play count

        songsWithCounts.sort(
            (a, b) =>
                b.playCount - a.playCount
        );


        // If there is no listening data,
        // use the first six existing songs.

        return songsWithCounts.slice(0, 6);

    }


    // =====================================================
    // CREATE SONG CARD
    // =====================================================

    function createSongCard(song) {

        const card =
            document.createElement("article");


        card.className =
            "profile-song-card";


        card.innerHTML = `

            <img
                src="${escapeHTML(song.image)}"
                alt="${escapeHTML(song.title)}"
                class="profile-song-image"
                onerror="this.src='img/som-choice.png'"
            >

            <div class="profile-song-info">

                <h3 class="profile-song-title">
                    ${escapeHTML(song.title)}
                </h3>

                <p class="profile-song-artist">
                    ${escapeHTML(song.artist)}
                </p>

            </div>

            <button
                type="button"
                class="profile-song-play"
                aria-label="Play ${escapeHTML(song.title)}"
            >

                <i class="fa-solid fa-play"></i>

            </button>

        `;


        const playButton =
            card.querySelector(
                ".profile-song-play"
            );


        playButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                playWaveCraftSong(song);

            }
        );


        card.addEventListener(
            "click",
            function () {

                playWaveCraftSong(song);

            }
        );


        return card;

    }


    // =====================================================
    // ESCAPE HTML
    // =====================================================

    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    // =====================================================
    // PLAY SONG THROUGH EXISTING WAVECRAFT PLAYER
    // =====================================================

    function playWaveCraftSong(song) {

        /*
            IMPORTANT:

            This function does NOT create another
            audio player.

            It tries to connect to the existing
            WaveCraft music-player system.
        */


        // -------------------------------------------------
        // OPTION 1
        // Existing global playSong function
        // -------------------------------------------------

        if (
            typeof window.playSong ===
            "function"
        ) {

            window.playSong(song);

            return;

        }


        // -------------------------------------------------
        // OPTION 2
        // Existing WaveCraft custom event
        // -------------------------------------------------

        window.dispatchEvent(
            new CustomEvent(
                "wavecraft:playSong",
                {
                    detail: {

                        song: song.song,

                        title: song.title,

                        artist: song.artist,

                        image: song.image,

                        id: song.id

                    }
                }
            )
        );


        /*
            If your existing music-player.js uses a
            different function name, connect that
            function here.

            DO NOT create another audio player.
        */

        console.log(
            "Requested WaveCraft player:",
            song.title
        );

    }


    // =====================================================
    // RENDER MOST LISTENED
    // =====================================================

    function renderMostListened() {

        if (!mostListenedGrid) return;


        mostListenedGrid.innerHTML = "";


        const songs =
            getMostListenedSongs();


        if (!songs.length) {

            if (mostListenedEmpty) {

                mostListenedEmpty.hidden =
                    false;

            }

            return;

        }


        if (mostListenedEmpty) {

            mostListenedEmpty.hidden =
                true;

        }


        songs.forEach(song => {

            mostListenedGrid.appendChild(
                createSongCard(song)
            );

        });

    }


    // =====================================================
    // ACCOUNTS
    // =====================================================

    function getAccounts() {

        const data =
            localStorage.getItem(
                "wavecraftAccounts"
            );


        if (!data) {

            return [currentUser];

        }


        try {

            const accounts =
                JSON.parse(data);


            if (
                Array.isArray(accounts) &&
                accounts.length
            ) {

                return accounts;

            }

        } catch (error) {

            console.warn(
                "Could not read accounts:",
                error
            );

        }


        return [currentUser];

    }


    // =====================================================
    // RENDER ACCOUNTS
    // =====================================================

    function renderAccounts() {

        if (!accountList) return;


        accountList.innerHTML = "";


        const accounts =
            getAccounts();


        accounts.forEach(function (account) {

            const button =
                document.createElement("button");


            button.type = "button";

            button.className =
                "account-item";


            const isCurrent =
                account.email === currentUser.email;


            if (isCurrent) {

                button.classList.add(
                    "active"
                );

            }


            const imageHTML =
                account.profileImage

                    ? `
                        <img
                            src="${escapeHTML(account.profileImage)}"
                            alt=""
                        >
                    `

                    : `
                        ${escapeHTML(
                            getInitials(account)
                        )}
                    `;


            button.innerHTML = `

                <span class="account-avatar">
                    ${imageHTML}
                </span>

                <span class="account-information">

                    <span class="account-name">
                        ${escapeHTML(
                            account.username ||
                            account.firstName ||
                            "WaveCraft User"
                        )}
                    </span>

                    <span class="account-email">
                        ${escapeHTML(
                            account.email || ""
                        )}
                    </span>

                </span>

                ${
                    isCurrent
                        ? `
                            <span class="account-check">
                                <i class="fa-solid fa-check"></i>
                            </span>
                        `
                        : ""
                }

            `;


            if (!isCurrent) {

                button.addEventListener(
                    "click",
                    function () {

                        switchAccount(
                            account
                        );

                    }
                );

            }


            accountList.appendChild(
                button
            );

        });

    }


    // =====================================================
    // SWITCH ACCOUNT
    // =====================================================

    function switchAccount(account) {

        if (!account) return;


        localStorage.setItem(
            "wavecraftUser",
            JSON.stringify(account)
        );


        currentUser =
            account;


        loadProfileInformation();

        renderAccounts();

        renderMostListened();


        window.dispatchEvent(
            new CustomEvent(
                "wavecraft:userUpdated",
                {
                    detail: currentUser
                }
            )
        );

    }


    // =====================================================
    // ADD ACCOUNT
    // =====================================================

    if (addAccountButton) {

        addAccountButton.addEventListener(
            "click",
            function () {

                /*
                    We do not create another authentication
                    system here.

                    Send the user to the existing login page.
                */

                window.location.href =
                    "login.html";

            }
        );

    }


    // =====================================================
    // LOGOUT BUTTON
    // =====================================================

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                openModal(
                    logoutModal
                );

            }
        );

    }


    // =====================================================
    // CONFIRM LOGOUT
    // =====================================================

    if (confirmLogoutButton) {

        confirmLogoutButton.addEventListener(
            "click",
            function () {

                /*
                    IMPORTANT:

                    Do not delete playlists,
                    liked songs or other
                    WaveCraft data here.

                    Only remove the active
                    login state.
                */


                localStorage.removeItem(
                    "wavecraftUser"
                );


                // Optional session state

                sessionStorage.removeItem(
                    "wavecraftLoggedIn"
                );


                window.location.href =
                    "login.html";

            }
        );

    }


    // =====================================================
    // INITIALIZE PAGE
    // =====================================================

    loadProfileInformation();

    renderMostListened();

    renderAccounts();

});


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
