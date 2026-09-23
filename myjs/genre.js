// WAVECRAFT INTRO VIDEO + LIGHT/DARK MODE

// ELEMENTS

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




/* =========================================================
   WAVECRAFT — GENRES & MOODS
   COMPLETE GENRE PLAYER
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const genresView =
    document.getElementById("genresView");

const genrePlaylistView =
    document.getElementById("genrePlaylistView");

const genreCards =
    document.querySelectorAll(".wc-genre-card");

const genreBackBtn =
    document.getElementById("genreBackBtn");

const genreHeroTitle =
    document.getElementById("genreHeroTitle");

const genreHeroDescription =
    document.getElementById("genreHeroDescription");

const genreHeroBackground =
    document.getElementById("genreHeroBackground");

const genreSongCount =
    document.getElementById("genreSongCount");

const genreSongList =
    document.getElementById("genreSongList");

const genrePlayBtn =
    document.getElementById("genrePlayBtn");

const genreShuffleBtn =
    document.getElementById("genreShuffleBtn");

const genreAddBtn =
    document.getElementById("genreAddBtn");

const genreDownloadBtn =
    document.getElementById("genreDownloadBtn");


/* =========================================================
   GLOBAL WAVECRAFT PLAYER
========================================================= */

const genreAudio =
    document.getElementById("audioPlayer");

const musicPlayer =
    document.getElementById("musicPlayer");

const playerImage =
    document.getElementById("playerImage");

const playerTitle =
    document.getElementById("playerTitle");

const playerArtist =
    document.getElementById("playerArtist");

const playPauseBtn =
    document.getElementById("playPauseBtn");

const progressInput =
    document.getElementById("progressBar");

const currentTimeLabel =
    document.getElementById("currentTime");

const durationLabel =
    document.getElementById("duration");

const volumeInput =
    document.getElementById("volumeBar");

const closePlayer =
    document.getElementById("closePlayer");

const previousPlayerButton =
    document.getElementById("prevBtn");

const nextPlayerButton =
    document.getElementById("nextBtn");


/* =========================================================
   CURRENT GENRE / CURRENT SONG
========================================================= */

let currentGenreId = null;

let currentGenreSongs = [];

let currentGenreSongIndex = -1;

let currentGenreSong = null;


/* =========================================================
   GENRE DATA
========================================================= */

const wavecraftGenres = {

    /* =====================================================
       K-POP
    ===================================================== */

    kpop: {

        name: "K-Pop",

        description:
            "Discover the biggest K-Pop songs, artists and sounds from Korea.",

        image: "img/kpop-hits.jpg",

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

    },


    /* =====================================================
       R&B
    ===================================================== */

    rnb: {

        name: "R&B",

        description:
            "Smooth vocals, soulful melodies and unforgettable R&B sounds.",

        image: "img/r&b-vibes.jpg",

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


    /* =====================================================
       AFROBEATS
    ===================================================== */

    afrobeats: {

        name: "Afrobeats",

        description:
            "The biggest sounds and hottest artists from the world of Afrobeats.",

        image: "img/afrobeats-mix.jpg",

        songs: [

            {
                title: "Forgiveness",
                artist: "Asake",
                album: "Lungu Boy",
                image: "img/asake.jpg",
                duration: "3:18",
                file: "audio/Asake-Forgiveness-(JustNaija.com).mp3"
            },

            {
                title: "For Everybody",
                artist: "Burna Boy",
                album: "No Sign of Weakness",
                image: "img/Burna-boy.jpg",
                duration: "3:21",
                file: "audio/Burna-Boy-For-Everybody.mp3"
            },

            {
                title: "Essence",
                artist: "Wizkid",
                album: "Made in Lagos",
                image: "img/wizkid.jpeg",
                duration: "4:08",
                file: "audio/Wizkid_Ft._Tems_-_Essence.mp3"
            },

            {
                title: "What You Need",
                artist: "Tems",
                album: "Born in the Wild",
                image: "img/tems.jpg",
                duration: "3:29",
                file: "audio/Tems-What-You-Need-Vistanaij.com_.mp3"
            },

            {
                title: "Pressure",
                artist: "Seyi Vibez",
                album: "Thy Kingdom Come",
                image: "img/seyi-vibes.jpg",
                duration: "3:14",
                file: "audio/Seyi-Vibez-Pressure-Official-Video-(CeeNaija.com).mp3"
            },

            {
                title: "I Know Who I Be",
                artist: "Davido",
                album: "Davido",
                image: "img/davido.jpg",
                duration: "3:15",
                file: "audio/Davido-I-Know-Who-I-Be-feat-JAZZWRLD-GL_Ceejay.mp3"
            },

            {
                title: "Hightension",
                artist: "Shallipopi",
                album: "Shallipopi",
                image: "img/shallipopi.jpg",
                duration: "2:56",
                file: "audio/Shallipopi-Hightension-(JustNaija.com).mp3"
            },

            {
                title: "Tornado",
                artist: "Ayra Starr",
                album: "Ayra Starr",
                image: "img/Ayra=star.jpg",
                duration: "3:04",
                file: "audio/Ayra-Starr-Tornado.mp3"
            },

            {
                title: "Vision",
                artist: "Qing Madi",
                album: "Qing Madi",
                image: "img/qing-madi.jpg",
                duration: "3:11",
                file: "audio/Qing-Madi-Vision-(JustNaija.com).mp3"
            },

            {
                title: "Motion Sickness",
                artist: "ODUMODUBLVCK",
                album: "The Machine Is Coming",
                image: "img/Odumodublvck.webp",
                duration: "3:07",
                file: "audio/ODUMODUBLVCK-MOTION-SICKNESS-feat-Zlatan.mp3"
            }

        ]

    },


    /* =====================================================
       OTHER GENRES
    ===================================================== */

    hiphop: {
        name: "Hip-Hop",
        description: "The biggest hip-hop tracks, rappers and sounds.",
        image: "img/hip-hop-hits.jpg",
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

    jazz: {
        name: "Jazz",
        description: "Classic and modern jazz from incredible musicians.",
        image: "img/jazz-essentials.jpg",
        songs: [
            {
                title: "Universal Truth",
                artist: "Emmet Cohen",
                album: "Universal Truth",
                image: "img/emmet-cohen.jpg",
                song: "audio/universal-truth.mp3",
                duration: "6:12"
            },

            {
                title: "Freezer Jam",
                artist: "Rik Wright's Fundamental Forces",
                album: "Freezer Jam",
                image: "img/freezer-jam.jpg",
                song: "audio/freezer-jam.mp3",
                duration: "5:42"
            },

            {
                title: "In Motion",
                artist: "Jeremy Green",
                album: "In Motion",
                image: "img/in-motion.jpg",
                song: "audio/in-motion.mp3",
                duration: "4:58"
            },

            {
                title: "Talk to Your Daughter",
                artist: "Robben Ford",
                album: "Talk to Your Daughter",
                image: "img/talk-to-your-daughter.jpg",
                song: "audio/talk-to-your-daughter.mp3",
                duration: "5:10"
            },

            {
                title: "The Rewinder",
                artist: "Guitar Elation",
                album: "The Rewinder",
                image: "img/the-rewinder.jpg",
                song: "audio/the-rewinder.mp3",
                duration: "4:42"
            },

            {
                title: "Oracles",
                artist: "Helen Sung Big Band",
                album: "Oracles",
                image: "img/oracles.jpg",
                song: "audio/oracles.mp3",
                duration: "6:05"
            },

            {
                title: "Torch Bearers",
                artist: "Brian Lynch",
                album: "Torch Bearers",
                image: "img/touch-bearers.jpg",
                song: "audio/torch-bearers.mp3",
                duration: "5:28"
            },

            {
                title: "Inner Fire",
                artist: "Steve Oliver",
                album: "Inner Fire",
                image: "img/inner-fire.jpg",
                song: "audio/inner-fire.mp3",
                duration: "4:31"
            },

            {
                title: "Chill It",
                artist: "Nils",
                album: "Chill It",
                image: "img/chill-it.jpg",
                song: "audio/chill-it.mp3",
                duration: "4:15"
            },

            {
                title: "Next Steps",
                artist: "Lawson Rollins",
                album: "Next Steps",
                image: "img/next-steps.webp",
                song: "audio/.mp3",
                duration: "5:02"
            }
        ]
    },

    christian: {
        name: "Christian & Gospel",
        description: "Music of faith, worship, hope and inspiration.",
        image: "img/gospel.jpg",
        songs: [ 
            {
                title: "Oluwatosin",
                artist: "TKeys ft SteveHills",
                album: "Oluwatosin",
                image: "img/oluwatosin.jpg",
                file: "audio/TKeyz-Oluwatosin-Jesus-Is-Enough-Tkeyz-Ft-SteveHills-visualizer-(CeeNaija.com) (2).mp3",
                duration: "4:25"
            },

            {
                title: "So Will I",
                artist: "100 Billion X",
                album: "So will I",
                image: "img/so-will-i.webp",
                song: "audio/So Will I (100 Billion X) - Hillsong Worship [ ezmp3.cc ].mp3",
                duration: "7:02"
            },

            {
                title: "Reckless Love",
                artist: "Cory Asbury",
                album: "Reckless Love 0f God",
                image: "img/reckless-love.webp",
                song: "audio/Reckless-Love-CEENAIJA.COM-Cory-Asbury-Reckless-Love.mp3",
                duration: "5:31"
            },

            {
                title: "Kumama Papa",
                artist: "Prinx Emmanuel",
                album: "Kumama Papa",
                image: "img/kumama-papa.webp",
                song: "audio/Prinx_Emmanuel_-_Kumama_Papa_refix__CeeNaija.com_.mp3",
                duration: "2:28"
            },

            {
                title: "Anchor of my Strength",
                artist: "Paul Cleverlee",
                album: "Anchor of my Strength",
                image: "img/anchor-of-my-strength.jpg",
                song: "audio/Paul_Cleverlee_-_Anchor_of_My_Strength_CeeNaija.com_.mp3",
                duration: "4:14"
            },

            {
                title: "Tobechukwu",
                artist: "Nathaniel Bassey",
                album: "Tobechukwu",
                image: "img/tobechukwu.webp",
                song: "audio/Nathaniel_Bassey_-_TOBECHUKWU_Praise_God_Ft_Mercy_Chinwo_Blessed_CeeNaija.com_.mp3",
                duration: "8:04"
            },

            {
                title: "Miracle no dey tire Jesus",
                artist: "Moses Bliss ft Festizie Chizie",
                album: "Miracle no dey Tire Jesus",
                image: "img/miracle-no-dey-tire-jesus.jpeg",
                song: "audio/Moses_Bliss_-_Miracle_No_Dey_Tire_Jesus_Ft_Festizie_Chizie_CeeNaija.com_.mp3",
                duration: "3:14"
            },

            {
                title: "Favour",
                artist: "Lawrence Oyor",
                album: "Favour",
                image: "img/favour.jpg",
                song: "audio/FAVOUR-Lawrence-Oyor-praise-love-prayer-gospelmusic-itsurroundsmelikeashield-affirmations-(CeeNaija.com).mp3",
                duration: "5:52"
            },

            {
                title: "E Ti Tobi To",
                artist: "EmmaOMG",
                album: "E Ti Tobi To",
                image: "img/etitobito.webp",
                song: "audio/EmmaOMG_-_E_Ti_Tobi_To_CeeNaija.com_.mp3",
                duration: "13:45"
            },

            {
                title: "Songs of Sons (I am not alone)",
                artist: "Asher Ruona",
                album: "Songs of Sons",
                image: "img/i-am-not-alone.jpg",
                song: "audio/Asher_Ruona_-_Songs_of_Sons_I_am_Not_alone__CeeNaija.com_.mp3",
                duration: "9:04"
            }
        ]
    },

    rock: {
        name: "Rock",
        description: "Powerful guitars, unforgettable riffs and legendary rock.",
        image: "img/rock.jpg",
        songs: [
            {
                title: "Bite My Tongue",
                artist: "The Warning",
                album: "Everything's Falling",
                image: "img/bite-my-tongue.jpg",
                song: "audio/universal-truth.mp3",
                duration: "3:19"
            },

            {
                title: "Marianne",
                artist: "Fontaines D.C",
                album: "Marianne",
                image: "img/marianne.jpg",
                song: "audio/freezer-jam.mp3",
                duration: "3:45"
            },

            {
                title: "7563",
                artist: "Florence Road",
                album: "7563",
                image: "img/7563.jpg",
                song: "audio/in-motion.mp3",
                duration: "4:03"
            },

            {
                title: "Sun has Set",
                artist: "Beebadoobee",
                album: "Sun Has Set",
                image: "img/sun-has-set.jpg",
                song: "audio/talk-to-your-daughter.mp3",
                duration: "2:21"
            },

            {
                title: "Beaches in Tennessee",
                artist: "Cage The Elephant",
                album: "Beaches in Tennssee",
                image: "img/beaches-in-tennessee.jpg",
                song: "audio/the-rewinder.mp3",
                duration: "3:16"
            },

            {
                title: "Bugs in the Cake",
                artist: "Violet Grohl",
                album: "Be Sweet to Me",
                image: "img/bug-in-the-cake.webp",
                song: "audio/Violet_Grohl_-_Bug_In_The_Cake_(mp3.pm).mp3",
                duration: "2:48"
            },

            {
                title: "Serena Joy",
                artist: "Olivia Rodrigo",
                album: "Serena Joy",
                image: "img/serena-joy.webp",
                song: "audio/torch-bearers.mp3",
                duration: "3:05"
            },

            {
                title: "Ur Bedroom",
                artist: "Bby",
                album: "Ur Bedroom",
                image: "img/bby.jpg",
                song: "audio/inner-fire.mp3",
                duration: "4:35"
            },

            {
                title: "Wings on Fire",
                artist: "Interpol",
                album: "The mirror Weighs a Ton",
                image: "img/wings-of-fire.jpg",
                song: "audio/chill-it.mp3",
                duration: "4:15"
            },

            {
                title: "Voir Dire",
                artist: "Die Spitz",
                album: "Something to Consume",
                image: "img/voir-dire.jpg",
                song: "audio/next-steps.mp3",
                duration: "3:00"
            }
        ]
    },

    instrumental: {
        name: "Instrumental",
        description: "Beautiful instrumental music for every mood.",
        image: "img/instrumental.jpg",
        songs: [ {
                title: "Aphelion",
                artist: "Aetheria Solara",
                album: "Aphelion",
                image: "img/aphelion.jpg",
                song: "audio/universal-truth.mp3",
                duration: "2:24"
            },

            {
                title: "Mellow",
                artist: "The Inner Room",
                album: "Mellow",
                image: "img/mellow.webp",
                song: "audio/freezer-jam.mp3",
                duration: "2:25"
            },

            {
                title: "Calm Horizon",
                artist: "Somnifera",
                album: "Calm Horizon",
                image: "img/calm-horizon.jpg",
                song: "audio/in-motion.mp3",
                duration: "2:22"
            },

            {
                title: "Resounding Hymn",
                artist: "Warmth of MUba",
                album: "Resounding Hymn",
                image: "img/resounding-hymn.jpg",
                song: "audio/talk-to-your-daughter.mp3",
                duration: "2:29"
            },

            {
                title: "We almost Stayed",
                artist: "Avyr",
                album: "We almost Stayed",
                image: "img/we-almost-stayed.jpg",
                song: "audio/the-rewinder.mp3",
                duration: "2:39"
            },

            {
                title: "Holding on to YOu",
                artist: "Stellar Stones",
                album: "Holding on to You",
                image: "img/holding on to you.jpg",
                song: "audio/Violet_Grohl.mp3",
                duration: "2:50"
            },

            {
                title: "Nebel",
                artist: "Mystisse",
                album: "Nebel",
                image: "img/nebel.jpg",
                song: "audio/torch-bearers.mp3",
                duration: "2:45"
            },

            {
                title: "Prepere for Landing",
                artist: "Lasant",
                album: "Prepere for Landing",
                image: "img/prepare for landing.jpg",
                song: "audio/inner-fire.mp3",
                duration: "2:41"
            },

            {
                title: "Moon Etching",
                artist: "Stellian",
                album: "Moon Etching",
                image: "img/moon-etching.jpg",
                song: "audio/chill-it.mp3",
                duration: "2:22"
            },

            {
                title: "Timeless",
                artist: "Emiko",
                album: "Timeless",
                image: "img/emiko.jpg",
                song: "audio/next-steps.mp3",
                duration: "2:22"
            }
        ]
    },

    anime: {
        name: "Anime",
        description: "Discover music inspired by the world of anime.",
        image: "img/anime.webp",
        songs: [
            {
                title: "GO GHOST",
                artist: "King Gnu",
                album: "GO GHOST",
                image: "img/go-ghost.jpg",
                song: "audio/anime/King Gnu - GO GHOST [192kbps].mp3",
                duration: "2:50"
            },

            {
                title: "STELLA",
                artist: "SEKAI NO OWARI",
                album: "Jaadugar: A Witch in Mongolia",
                image: "img/stella.jpg",
                song: "audio/anime/SEKAI NO OWARI - SEKAI NO OWARI - Stella [Opening Jaadugar A Witch in Mongolia] [192kbps].mp3",
                duration: "3:49"
            },

            {
                title: "Sunny",
                artist: "MILET",
                album: "Futsutsuka na Akujo dewa Gozaimasu ga: Suuguu Chouso Torikae Den",
                image: "img/sunny.jpg",
                song: "audio/anime/milet - Sunny [192kbps].mp3",
                duration: "3:34"
            },

            {
                title: "BoooM!!!",
                artist: "Houshou Marine",
                album: "Kabushikigaisha Magi-Lumière 2nd Season ED",
                image: "img/boooom.webp",
                song: "audio/anime/Houshou Marine - BooooM [192kbps].mp3",
                duration: "2:55"
            },

            {
                title: "Act! Addict! Actors!",
                artist: "A3ders!",
                album: "Act! Addict! Actors!",
                image: "img/a3ders.jpg",
                song: "audio/anime/A3ders - Act Addict Actors [192kbps].mp3",
                duration: "3:44"
            },

            {
                title: "Everscape",
                artist: "Millsage",
                album: "BanG Dream! Theme Song",
                image: "img/millsage.jpg",
                song: "audio/anime/millsage - everscape.mp3",
                duration: "4:34"
            },

            {
                title: "Rasen",
                artist: "9Lana",
                album: "RASEN",
                image: "img/rasen.webp",
                song: "audio/anime/9Lana - Rasen [192kbps].mp3",
                duration: "3:09"
            },

            {
                title: "TACTIC",
                artist: "Daoko",
                album: "TACTIC",
                image: "img/tactic.jpg",
                song: "audio/anime/Daoko - TACTIC [192kbps].mp3",
                duration: "3:14"
            },

            {
                title: "Back Shot",
                artist: "Masanori Otoda",
                album: "back shot",
                image: "img/back-shot.jpg",
                song: "audio/anime/Masanori Otoda - back shot [192kbps].mp3",
                duration: "3:10"
            },

            {
                title: "AMORE",
                artist: "ReoNa",
                album: "Amore",
                image: "img/amore.jpg",
                song: "audio/anime/ReoNa - Amore [192kbps].mp3",
                duration: "2:22"
            }
        ]
    },

    soul: {
        name: "Soul",
        description: "Deep vocals, emotion and timeless soul music.",
        image: "img/soul-music.jpg",
        songs: [
            {
                title: "My Love Is Your Love",
                artist: "Whitney Houston",
                album: "My Love Is Your Love",
                image: "img/whitney.jpg",
                file: "audio/Whitney_Houston_-_My_Love_is_Your_Love_-_1999_(mp3.pm).mp3",
                duration: "4:23"
            },

            {
                title: "No Ordinary Love",
                artist: "Sade",
                album: "The Ultimate Collection",
                image: "img/sade.jpg",
                song: "audio/soul/Sade_-_No_Ordinary_Love_(mp3.pm).mp3",
                duration: "7:18"
            },

            {
                title: "Human Nature",
                artist: "Michael Jackson",
                album: "Thriller 25 Super deluxe Edition",
                image: "img/human-nature.jpeg",
                song: "audio/soul/Michael_Jackson_-_Human_Nature_(mp3.pm).mp3",
                duration: "4:05"
            },

            {
                title: "Sexual Healing",
                artist: "Marvin Gaye",
                album: "Midnight Love",
                image: "img/marvin-gaye.jpg",
                song: "audio/soul/Marvin_Gaye_-_Sexual_Healing_Album_Version_(mp3.pm).mp3",
                duration: "3:58"
            },

            {
                title: "Ain't No Love in the Heart of The City",
                artist: "Bobby Blue Band",
                album: "Music for Groovin",
                image: "img/bobby-bland.jpg",
                song: "audio/soul/Bobby_Blue_Band_-_Ain_t_No_Love_In_the_Heart_Of_The_City_(mp3.pm).mp3",
                duration: "3:45"
            },

            {
                title: "Ain't No Sunshine",
                artist: "Bill Withers",
                album: "Just As I Am",
                image: "img/bill-withers.jpg",
                song: "audio/soul/Bill_Withers_-_Ain_t_No_Sunshine_(mp3.pm).mp3",
                duration: "2:06"
            },

            {
                title: "Sweet Love",
                artist: "Anita Baker",
                album: "Rapture",
                image: "img/sweet-love.jpg",
                song: "audio/soulAnita_Baker_-_Sweet_Love_(mp3.pm).mp3",
                duration: "4:27"
            },

            {
                title: "If I ain't got You",
                artist: "Alicia Keys ft Usher",
                album: "Love Songs",
                image: "img/alicia-keys.jpg",
                song: "audio/soul/Alicia_Keys_ft._Usher_-_If_I_Ain_t_Got_You_(mp3.pm).mp3",
                duration: "3:50"
            },

            {
                title: "7 days",
                artist: "Craig David",
                album: "born to do it",
                image: "img/7-days.jpg",
                song: "audio/soul/7_days_Original_-_craig_david_-_(mp3.pm).mp3",
                duration: "3:55"
            },

            {
                title: "Signed Sealed Delivered, I'm Yours",
                artist: "Ruby Turner",
                album: "Signed Sealed Delivered, I'm Yours",
                image: "img/ruby-turner.jpg",
                song: "audio/soul/Ruby_Turner_-_Signed_Sealed_Delivered_I_m_Yours_(mp3.pm).mp3",
                duration: "3:23"
            }
        ]
    },


    indie: {
        name: "Indie",
        description: "Discover independent artists and alternative sounds.",
        image: "img/indie.jpg",
        songs: [
            {
                title: "Pretty in Possible",
                artist: "Caroline Polachek",
                album: "Desire, I Want to Turn Into You",
                image: "img/caroline.png",
                song: "audio/indie/Caroline_Polachek_-_Pretty_in_Possible_(mp3.pm).mp3",
                duration: "3:36"
            },

            {
                title: "But Not Kiss",
                artist: "Faye Webster",
                album: "Underdressed at The Symphony",
                image: "img/faye-webster.webp",
                song: "audio/indie/Faye_Webster_-_But_Not_Kiss_(mp3.pm).mp3",
                duration: "3:42"
            },

            {
                title: "SMOG",
                artist: "Indigo De Souza",
                album: "All of This Will End",
                image: "img/smog.jpg",
                song: "audio/indie/Indigo_De_Souza_-_Smog_(mp3.pm).mp3",
                duration: "3:14"
            },

            {
                title: "My Love Mine all Mine",
                artist: "Mitski",
                album: "The Land is Inhospitable and So are We",
                image: "img/mitski.webp",
                song: "audio/indie/Mitski_-_My_Love_Mine_All_Mine_(mp3.pm).mp3",
                duration: "2:17"
            },

            {
                title: "Ribbons",
                artist: "Ryan Beatty",
                album: "Calico",
                image: "img/ribbons.jpg",
                song: "audio/indie/Ryan_Beatty_-_Ribbons_(mp3.pm).mp3",
                duration: "3:17"
            },

            {
                title: "House Song",
                artist: "Searows",
                album: "House Song",
                image: "img/searow.jpg",
                song: "audio/indie/searows_-_House_Song_(mp3.pm).mp3",
                duration: "4:55"
            },

            {
                title: "Slugs",
                artist: "Slow Pulp",
                album: "Yard",
                image: "img/slug.png",
                song: "audio/indie/Slow_Pulp_-_Slugs_(mp3.pm).mp3",
                duration: "3:06"
            },

            {
                title: "Sunshine Baby",
                artist: "The Japanese House",
                album: "In The End It Always Does",
                image: "img/sunshine-baby.jpg",
                song: "audio/indie/The_Japanese_House_-_Sunshine_Baby_(mp3.pm).mp3",
                duration: "3:39"
            },

            {
                title: "Idaho Alien",
                artist: "Youth Lagoon",
                album: "Heaven is a Junkyard",
                image: "img/idaho-alien.webp",
                song: "audio/indie/Youth_Lagoon_-_Idaho_Alien_(mp3.pm).mp3",
                duration: "3:23"
            },

            {
                title: "Echolalia",
                artist: "Yves Tumor",
                album: "Praise a Lord Who Chews but Which does not Consume; (or Simply, Hot Between Worlds)",
                image: "img/echolalia.jpg",
                song: "audio/indie/Yves_Tumor_-_Echolalia_(mp3.pm).mp3",
                duration: "3:00"
            }
        ]
    },

    country: {
        name: "Country",
        description: "From classic country to today's biggest country sounds.",
        image: "img/country.jpg",
        songs: [
            {
                title: "Sunburn",
                artist: "Tucker Wetmore",
                album: "Sunburn",
                image: "img/sunburn.webp",
                song: "audio/country/Tucker_Wetmore_-_Sunburn_(mp3.pm).mp3",
                duration: "3:05"
            },

            {
                title: "Take Me Back (Leave me There)",
                artist: "Cody Johnson",
                album: "Take me Back (Leave me There)",
                image: "img/cody-johnson.jpg",
                song: "audio/.mp3",
                duration: "2:58"
            },

            {
                title: "Damned if I Do",
                artist: "Vincent Mason",
                album: "There I go",
                image: "img/vincent-mason.jpg",
                song: "audio/country/Vincent_Mason_-_Damned_If_I_Do_(mp3.pm).mp3",
                duration: "3:37"
            },

            {
                title: "Bet On That",
                artist: "Blake Whiten",
                album: "Bet on That",
                image: "img/bet-on-that.webp",
                song: "audio/.mp3",
                duration: "3:10"
            },

            {
                title: "Mess",
                artist: "Jordan Davis",
                album: "Mess",
                image: "img/mess.webp",
                song: "audio/.mp3",
                duration: "2:39"
            },

            {
                title: "Cowgirl",
                artist: "Shaboozey",
                album: "Cowgirl",
                image: "img/cowgirl.webp",
                song: "audio/country/Shaboozey_-_Cowgirl_(mp3.pm).mp3",
                duration: "2:55"
            },

            {
                title: "Get to Drinkin'",
                artist: "Zach John King",
                album: "Get to Drinkin'",
                image: "img/zach-john-king.jpg",
                song: "audio/.mp3",
                duration: "2:48"
            },

            {
                title: "Done For",
                artist: "Max McNown",
                album: "Done For",
                image: "img/done-for.jpg",
                song: "audio/country/Max_McNown_-_Done_For_(mp3.pm).mp3",
                duration: "2:33"
            },

            {
                title: "Be by You",
                artist: "Luke Combs",
                album: "Be by You",
                image: "img/be-by-you.webp",
                song: "audio/country/Luke_Combs_-_Be_By_You_(mp3.pm).mp3",
                duration: "3:17"
            },

            {
                title: "Been By Now",
                artist: "Morgan Wallen",
                album: "Been by Now",
                image: "img/morgan.webp",
                song: "audio/.mp3",
                duration: "3:33"
            }
        ]
    },

    metal: {
        name: "Metal",
        description: "Heavy riffs, powerful drums and intense sounds.",
        image: "img/metal.jpg",
        songs: [
            {
                title: "Hail to the King",
                artist: "Avenged Sevenfold",
                album: "Hail to the King",
                image: "img/avenged.jpg",
                song: "audio/metal/Avenged_Sevenvold_-_Hail_to_the_King_(mp3.pm).mp3",
                duration: "5:05"
            },

            {
                title: "Blind",
                artist: "Korn",
                album: "Korn",
                image: "img/korn.jpg",
                song: "audio/metal/Blind_-_Korn_(mp3.pm).mp3",
                duration: "4:19"
            },

            {
                title: "Mother",
                artist: "Danzig",
                album: "Danzig",
                image: "img/danzig.jpg",
                song: "audio/metal/Danzig_-_Mother_Danzig_1988_(mp3.pm).mp3",
                duration: "3:24"
            },

            {
                title: "Du Hast",
                artist: "Rammstein",
                album: "Sehnsucht (Remastered 2003)",
                image: "img/du-hast.jpg",
                song: "audio/metal/Du_Hast_-_Rammstein_(mp3.pm).mp3",
                duration: "3:55"
            },

            {
                title: "Master of Puppet",
                artist: "Metallica",
                album: "Master of puppet",
                image: "img/metallica.jpg",
                song: "audio/metal/Matallica_-_Master_of_Puppets_(mp3.pm).mp3",
                duration: "8:35"
            },

            {
                title: "Symphony of Destruction",
                artist: "Megadeth",
                album: "Countdown to Extinction(Expanded Edition-Remastered)",
                image: "img/megadeth.jpg",
                song: "audio/metal/Megadeht_-_symphony_of_destruction_(mp3.pm).mp3",
                duration: "4:07"
            },

            {
                title: "Crazy Train",
                artist: "Ozzy Osbourne",
                album: "Nebel",
                image: "img/crazy train.jpg",
                song: "audio/metal/Ozzy_Osburne_-_Crazy_train_(mp3.pm).mp3",
                duration: "4:53"
            },

            {
                title: "Cowboys from Hell",
                artist: "Pantera",
                album: "Cowboys from Hell",
                image: "img/pantera.jpg",
                song: "audio/metal/Pantera_-_Cowboys_from_hell_(mp3.pm).mp3",
                duration: "4:03"
            },

            {
                title: "Raining Blood",
                artist: "Slayer",
                album: "Reign in Blood (Expanded)",
                image: "img/slayer.webp",
                song: "audio/metal/Slayer_-_Raining_Blood_(mp3.pm).mp3",
                duration: "4:15"
            },

            {
                title: "Duality",
                artist: "Slip Knot",
                album: "Vol.3: The Subliminal verses (Special Edition)",
                image: "img/emiko.jpg",
                song: "music/metal/next-steps.mp3",
                duration: "2:22"
            }
        ]
    },

    latin: {
        name: "Latin",
        description: "Explore Latin rhythms, artists and global sounds.",
        image: "img/latin.jpg",
        songs: [
              {
                title: "DtMF",
                artist: "Bad Bunny",
                album: "DeBI TiRAR MaS FoToS",
                image: "img/dtmf.jpg",
                song: "audio/latin/Bad_Bunny_-_DtMF_(mp3.pm).mp3",
                duration: "3:57"
            },

            {
                title: "Frente Al Mar",
                artist: "Beele",
                album: "Frente al mar",
                image: "img/beele.jpg",
                song: "audio/latin/Beele_-_Frente_al_Mar_(mp3.pm).mp3",
                duration: "2:45"
            },

            {
                title: "AMEN BEBE",
                artist: "ELENA ROSE",
                album: "Bendito Verano",
                image: "img/amen-bebe.jpg",
                song: "audio/latin/ELENA_ROSE_-_AM_N_BEB_(mp3.pm).mp3",
                duration: "2:31"
            },

            {
                title: "Ohnana",
                artist: "Kapo",
                album: "OHNANA",
                image: "img/kapo.jpg",
                song: "audio/latin/Kapo_-_Ohnana_(mp3.pm).mp3",
                duration: "2:36"
            },

            {
                title: "Ivonny Bonita",
                artist: "KAROL G",
                album: "Tropicoqueta",
                image: "img/karol-g.jpg",
                song: "audio/latin/KAROL_G_-_Ivonny_Bonita_(mp3.pm).mp3",
                duration: "3:42"
            },

            {
                title: "TU VAS SIN",
                artist: "Rels B",
                album: "AfroLOVA25'",
                image: "img/rels-b.jpg",
                song: "audio/latin/Rels_B_-_TU_VAS_SIN_(mp3.pm).mp3",
                duration: "1:50"
            },

            {
                title: "Malibu",
                artist: "Rusowsky",
                album: "DAISY",
                image: "img/malibu.jpg",
                song: "audio/latin/rusowsky_-_malibU_(mp3.pm).mp3",
                duration: "3:35"
            },

            {
                title: "WASSUP",
                artist: "Young MIKO",
                album: "WASSUP",
                image: "img/young-miko.jpg",
                song: "audio/latin/Young_Miko_-_WASSUP_(mp3.pm).mp3",
                duration: "2:42"
            },

            {
                title: "La Ultima Vez",
                artist: "Feid",
                album: "La Ultima Vez",
                image: "img/feid.jpg",
                song: "audio/latin/Feid_-_La_Ultima_Vez_(mp3.pm).mp3",
                duration: "3:38"
            },

            {
                title: "Donde",
                artist: "Rauw Alejandro",
                album: "Donde",
                image: "img/donde.jpg",
                song: "audio/latin/Rauw_Alejandro_-_Donde_(mp3.pm).mp3",
                duration: "3:56"
            }
        ]
    }

};

window.wavecraftGenreCatalog = Object.values(wavecraftGenres)
    .flatMap(genre => genre.songs || []);


/* =========================================================
   OPEN GENRE
========================================================= */

function openGenre(genreId) {

    const genre = wavecraftGenres[genreId];

    if (!genre) {

        console.error(
            "WaveCraft: Genre not found:",
            genreId
        );

        return;
    }


    /* Save current genre */

    currentGenreId = genreId;

    currentGenreSongs = genre.songs;

    currentGenreSongIndex = -1;

    currentGenreSong = null;


    /* Hide genre discovery */

    if (genresView) {

        genresView.classList.add("hidden");

    }


    /* Show playlist view */

    if (genrePlaylistView) {

        genrePlaylistView.classList.add("active");

    }


    /* Hero title */

    if (genreHeroTitle) {

        genreHeroTitle.textContent =
            genre.name;

    }


    /* Description */

    if (genreHeroDescription) {

        genreHeroDescription.textContent =
            genre.description;

    }


    /* Hero image */

    if (genreHeroBackground) {

        genreHeroBackground.style.backgroundImage =
            `url("${genre.image}")`;

    }


    /* Song count */

    if (genreSongCount) {

        genreSongCount.textContent =
            `${genre.songs.length} songs`;

    }


    /* Display songs */

    displayGenreSongs(
        genre.songs
    );


    /* Reset play button */

    if (genrePlayBtn) {

        genrePlayBtn.innerHTML =
            `<i class="ri-play-fill"></i>`;

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   DISPLAY GENRE SONGS
========================================================= */

function displayGenreSongs(songs) {

    if (!genreSongList) return;


    genreSongList.innerHTML = "";


    if (!songs.length) {

        genreSongList.innerHTML = `

            <div class="wc-empty-genre">

                <i class="ri-music-2-line"></i>

                <h3>
                    Songs coming soon
                </h3>

                <p>
                    WaveCraft is preparing this genre for you.
                </p>

            </div>

        `;

        return;
    }


    songs.forEach(
        (song, index) => {

            const row =
                document.createElement("div");


            row.className =
                "wc-genre-song";


            row.dataset.index =
                index;


            row.innerHTML = `

                <span class="wc-song-number">
                    ${index + 1}
                </span>


                <div class="wc-song-main">

                    <img
                        src="${song.image}"
                        alt="${song.title}"
                        loading="lazy"
                    >

                    <div>

                        <h3>
                            ${song.title}
                        </h3>

                        <p>
                            ${song.artist}
                        </p>

                    </div>

                </div>


                <span class="wc-song-album">
                    ${song.album}
                </span>


                <span class="wc-song-duration">
                    ${song.duration}
                </span>

            `;


            /* Click song */

            row.addEventListener(
                "click",
                function () {

                    playGenreSong(
                        song,
                        index
                    );

                }
            );


            genreSongList.appendChild(row);

        }
    );

}


/* =========================================================
   PLAY GENRE SONG
========================================================= */

function playGenreSong(
    song,
    index = -1
) {

    if (!genreAudio) {

        console.error(
            "WaveCraft: #audioPlayer was not found."
        );

        return;
    }


    /* No audio file */

    const audioFile = song.file || song.song;

    if (!audioFile) {

        console.warn(
            `WaveCraft: No audio file assigned to "${song.title}".`
        );

        return;
    }


    if (window.WaveCraftPlayer) {
        currentGenreSong = song;
        currentGenreSongIndex = index;
        window.WaveCraftPlayer.play(song, currentGenreSongs, index, true);
        updateGenrePlayButton(true);
        return;
    }

    /* Save current song */

    currentGenreSong =
        song;

    currentGenreSongIndex =
        index;


    /* Remove playing state */

    document
        .querySelectorAll(".wc-genre-song")
        .forEach(row => {

            row.classList.remove(
                "playing"
            );

        });


    /* Highlight current row */

    if (index >= 0) {

        const currentRow =
            genreSongList.querySelector(
                `.wc-genre-song[data-index="${index}"]`
            );


        if (currentRow) {

            currentRow.classList.add(
                "playing"
            );

        }

    }


    /* Stop current audio */

    genreAudio.pause();


    /* Load new audio */

    genreAudio.src =
        audioFile;

    genreAudio.load();


    /* Update player image */

    if (playerImage) {

        playerImage.src =
            song.image;

        playerImage.alt =
            song.title;

    }


    /* Update title */

    if (playerTitle) {

        playerTitle.textContent =
            song.title;

    }


    /* Update artist */

    if (playerArtist) {

        playerArtist.textContent =
            song.artist;

    }


    /* Show player */

    if (musicPlayer) {

        musicPlayer.classList.add(
            "active"
        );

    }


    /* Play */

    const playPromise =
        genreAudio.play();


    if (playPromise) {

        playPromise
            .then(() => {

                updateGenrePlayButton(
                    true
                );

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

function formatGenreTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
}

if (playPauseBtn) {
    playPauseBtn.addEventListener("click", () => {
        if (!genreAudio || !currentGenreSong) return;
        if (genreAudio.paused) {
            genreAudio.play().then(() => updateGenrePlayButton(true)).catch(() => {});
        } else {
            genreAudio.pause();
            updateGenrePlayButton(false);
        }
    });
}

if (genreAudio) {
    genreAudio.addEventListener("loadedmetadata", () => {
        if (durationLabel) durationLabel.textContent = formatGenreTime(genreAudio.duration);
    });
    genreAudio.addEventListener("timeupdate", () => {
        if (progressInput && genreAudio.duration) {
            progressInput.value = String((genreAudio.currentTime / genreAudio.duration) * 100);
        }
        if (currentTimeLabel) currentTimeLabel.textContent = formatGenreTime(genreAudio.currentTime);
    });
    genreAudio.addEventListener("ended", () => updateGenrePlayButton(false));
}

if (progressInput) {
    progressInput.addEventListener("input", () => {
        if (genreAudio && genreAudio.duration) {
            genreAudio.currentTime = (Number(progressInput.value) / 100) * genreAudio.duration;
        }
    });
}

if (volumeInput && genreAudio) {
    genreAudio.volume = Number(volumeInput.value);
    volumeInput.addEventListener("input", () => {
        genreAudio.volume = Number(volumeInput.value);
    });
}

if (closePlayer) {
    closePlayer.addEventListener("click", () => {
        if (!musicPlayer) return;
        genreAudio.pause();
        musicPlayer.classList.remove("active", "mobile-expanded");
        updateGenrePlayButton(false);
    });
}

if (musicPlayer) {
    musicPlayer.addEventListener("click", event => {
        if (window.matchMedia("(max-width: 767px)").matches &&
            event.target.closest(".player-song")) {
            musicPlayer.classList.toggle("mobile-expanded");
        }
    });
}

function playAdjacentGenreSong(direction) {
    if (!currentGenreSongs.length) return;
    const nextIndex = currentGenreSongIndex < 0
        ? 0
        : (currentGenreSongIndex + direction + currentGenreSongs.length) % currentGenreSongs.length;
    playGenreSong(currentGenreSongs[nextIndex], nextIndex);
}

if (previousPlayerButton) {
    previousPlayerButton.addEventListener("click", () => playAdjacentGenreSong(-1));
}

if (nextPlayerButton) {
    nextPlayerButton.addEventListener("click", () => playAdjacentGenreSong(1));
}


/* =========================================================
   GENRE PLAY BUTTON
========================================================= */

function playCurrentGenre() {

    if (!currentGenreSongs.length) {

        console.warn(
            "This genre has no songs yet."
        );

        return;

    }


    /* If a song is currently playing */

    if (
        currentGenreSong &&
        genreAudio &&
        !genreAudio.paused
    ) {

        genreAudio.pause();

        updateGenrePlayButton(
            false
        );

        return;

    }


    /* Resume current song */

    if (
        currentGenreSong &&
        currentGenreSongIndex >= 0
    ) {

        playGenreSong(
            currentGenreSong,
            currentGenreSongIndex
        );

        return;

    }


    /* Otherwise play first song */

    playGenreSong(
        currentGenreSongs[0],
        0
    );

}


/* =========================================================
   PLAY BUTTON ICON
========================================================= */

function updateGenrePlayButton(
    isPlaying
) {

    if (!genrePlayBtn) return;


    genrePlayBtn.innerHTML =
        isPlaying
            ? `<i class="ri-pause-fill"></i>`
            : `<i class="ri-play-fill"></i>`;

}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffleGenre() {

    if (!currentGenreSongs.length) {

        console.warn(
            "There are no songs to shuffle."
        );

        return;

    }


    let randomIndex =
        Math.floor(
            Math.random() *
            currentGenreSongs.length
        );


    /* Avoid selecting same song */

    if (
        currentGenreSongs.length > 1 &&
        randomIndex === currentGenreSongIndex
    ) {

        randomIndex++;

        if (
            randomIndex >=
            currentGenreSongs.length
        ) {

            randomIndex = 0;

        }

    }


    playGenreSong(
        currentGenreSongs[randomIndex],
        randomIndex
    );

}


/* =========================================================
   ADD GENRE TO PLAYLIST
========================================================= */

function addGenreToPlaylist() {

    if (!currentGenreSongs.length) {

        console.warn(
            "No songs available to add."
        );

        return;

    }


    let playlist =
        JSON.parse(
            localStorage.getItem(
                "wavecraftPlaylist"
            )
        ) || [];


    currentGenreSongs.forEach(song => {

        const alreadyAdded =
            playlist.some(
                item =>
                    item.title === song.title &&
                    item.artist === song.artist
            );


        if (!alreadyAdded) {

            playlist.push({

                title: song.title,

                artist: song.artist,

                album: song.album,

                image: song.image,

                duration: song.duration,

                song: song.file

            });

        }

    });


    localStorage.setItem(
        "wavecraftPlaylist",
        JSON.stringify(playlist)
    );


    /* Visual feedback */

    if (genreAddBtn) {

        genreAddBtn.innerHTML =
            `<i class="ri-check-line"></i>`;

        genreAddBtn.title =
            "Added to playlist";


        setTimeout(() => {

            genreAddBtn.innerHTML =
                `<i class="ri-add-line"></i>`;

            genreAddBtn.title =
                "Add to playlist";

        }, 1500);

    }


    console.log(
        `${currentGenreSongs.length} ${wavecraftGenres[currentGenreId].name} songs added to playlist.`
    );

}


/* =========================================================
   DOWNLOAD CURRENT SONG
========================================================= */

function downloadCurrentSong() {

    if (!currentGenreSong) {

        console.warn(
            "Select a song first."
        );

        return;

    }


    if (!currentGenreSong.file) {

        console.warn(
            "No audio file available for this song."
        );

        return;

    }


    const link =
        document.createElement("a");


    link.href =
        currentGenreSong.file;


    link.download =
        `${currentGenreSong.artist} - ${currentGenreSong.title}.mp3`;


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );

}


/* =========================================================
   GENRE PLAY BUTTON CLICK
========================================================= */

if (genrePlayBtn) {

    genrePlayBtn.addEventListener(
        "click",
        function () {

            playCurrentGenre();

        }
    );

}


/* =========================================================
   SHUFFLE BUTTON CLICK
========================================================= */

if (genreShuffleBtn) {

    genreShuffleBtn.addEventListener(
        "click",
        function () {

            shuffleGenre();

        }
    );

}


/* =========================================================
   ADD BUTTON CLICK
========================================================= */

if (genreAddBtn) {

    genreAddBtn.addEventListener(
        "click",
        function () {

            addGenreToPlaylist();

        }
    );

}


/* =========================================================
   DOWNLOAD BUTTON CLICK
========================================================= */

if (genreDownloadBtn) {

    genreDownloadBtn.addEventListener(
        "click",
        function () {

            downloadCurrentSong();

        }
    );

}


/* =========================================================
   GENRE CARD CLICK
========================================================= */

genreCards.forEach(card => {

    card.addEventListener(
        "click",
        function () {

            const genreId =
                this.dataset.genre;


            if (!genreId) {

                console.error(
                    "WaveCraft: Genre card has no data-genre."
                );

                return;

            }


            openGenre(
                genreId
            );

        }
    );

});


/* =========================================================
   BACK BUTTON
========================================================= */

if (genreBackBtn) {

    genreBackBtn.addEventListener(
        "click",
        function () {

            /* Stop genre song */

            if (genreAudio) {

                genreAudio.pause();

            }


            /* Remove playing states */

            document
                .querySelectorAll(".wc-genre-song")
                .forEach(row => {

                    row.classList.remove(
                        "playing"
                    );

                });


            currentGenreId = null;

            currentGenreSongs = [];

            currentGenreSongIndex = -1;

            currentGenreSong = null;


            /* Hide playlist */

            if (genrePlaylistView) {

                genrePlaylistView.classList.remove(
                    "active"
                );

            }


            /* Show genres */

            if (genresView) {

                genresView.classList.remove(
                    "hidden"
                );

            }


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   URL-BASED GENRE LOAD
========================================================= */

function resolveGenreIdFromParam(rawValue) {

    if (!rawValue) return null;

    const decodedValue = decodeURIComponent(rawValue).trim();

    if (!decodedValue) return null;

    const normalizedValue = decodedValue.toLowerCase();

    const match = Object.keys(wavecraftGenres).find(genreKey => {

        const genre = wavecraftGenres[genreKey];

        if (!genre) return false;

        const genreName = String(genre.name || "").toLowerCase();

        return (
            genreKey.toLowerCase() === normalizedValue ||
            genreName === normalizedValue ||
            genreName.replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim() ===
            normalizedValue.replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim()
        );

    });

    return match || null;

}

const params = new URLSearchParams(window.location.search);
const requestedGenre = params.get("genre");

if (requestedGenre) {

    const resolvedGenreId = resolveGenreIdFromParam(requestedGenre);

    if (resolvedGenreId) {

        openGenre(resolvedGenreId);

    }

}

/* =========================================================
   AUDIO PLAY EVENT
========================================================= */

if (genreAudio) {

    genreAudio.addEventListener(
        "play",
        function () {

            if (
                currentGenreSong &&
                currentGenreSongIndex >= 0
            ) {

                const row =
                    genreSongList?.querySelector(
                        `.wc-genre-song[data-index="${currentGenreSongIndex}"]`
                    );


                if (row) {

                    row.classList.add(
                        "playing"
                    );

                }

            }


            updateGenrePlayButton(
                true
            );

        }
    );


    /* =====================================================
       AUDIO PAUSE
    ===================================================== */

    genreAudio.addEventListener(
        "pause",
        function () {

            updateGenrePlayButton(
                false
            );

        }
    );


    /* =====================================================
       AUDIO ENDED
    ===================================================== */

    genreAudio.addEventListener(
        "ended",
        function () {

            updateGenrePlayButton(
                false
            );


            /* Remove current playing state */

            document
                .querySelectorAll(".wc-genre-song")
                .forEach(row => {

                    row.classList.remove(
                        "playing"
                    );

                });


            /* Automatically play next song */

            if (
                currentGenreSongIndex >= 0 &&
                currentGenreSongIndex <
                    currentGenreSongs.length - 1
            ) {

                const nextIndex =
                    currentGenreSongIndex + 1;


                playGenreSong(
                    currentGenreSongs[nextIndex],
                    nextIndex
                );

            }

        }
    );


    /* =====================================================
       AUDIO ERROR
    ===================================================== */

    genreAudio.addEventListener(
        "error",
        function () {

            console.error(
                "WaveCraft could not load:",
                genreAudio.src
            );

        }
    );

}


/* =========================================================
   INITIAL STATE
========================================================= */

if (genrePlaylistView) {

    genrePlaylistView.classList.remove(
        "active"
    );

}

if (genresView) {

    genresView.classList.remove(
        "hidden"
    );

}


/* =========================================================
   WAVECRAFT GENRES READY
========================================================= */

console.log(
    "WaveCraft Genres initialized successfully."
);


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