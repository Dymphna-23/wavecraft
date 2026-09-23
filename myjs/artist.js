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


/* ARTIST DIRECTORY + DEDICATED VIEW (WaveCraft Artist page only) */
(function () {
    if (!window.WaveCraftArtists) return;
    var WA = window.WaveCraftArtists;
    var grid = document.getElementById("allArtistsGrid");
    if (!grid) return;
    var dirView = document.getElementById("artistDirectoryView");
    var detailView = document.getElementById("artistDetailView");
    var detailContent = document.getElementById("artistDetailContent");
    var searchInput = document.getElementById("artistSearchInput");
    var filtersBox = document.getElementById("artistFilters");
    var countEl = document.getElementById("allArtistsCount");
    var emptyEl = document.getElementById("allArtistsEmpty");
    var backBtn = document.getElementById("artistBackBtn");
    var state = { q: "", genre: "All" };
    var savedScroll = 0;
    var FOLLOW_KEY = "wavecraftFollowedArtists";
    function esc(s) {
        return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }
    function getFollowed() {
        try { var v = JSON.parse(localStorage.getItem(FOLLOW_KEY) || "[]"); return Array.isArray(v) ? v : []; }
        catch (e) { return []; }
    }
    function isFollowing(id) { return getFollowed().indexOf(id) !== -1; }
    function toggleFollow(id) {
        var list = getFollowed();
        var i = list.indexOf(id);
        if (i === -1) list.push(id); else list.splice(i, 1);
        try { localStorage.setItem(FOLLOW_KEY, JSON.stringify(list)); } catch (e) { }
        return i === -1;
    }
    function likeId(s) { return String((s && s.id) || ((s && s.title) + "__" + (s && s.artist))); }
    function paintLike(btn, s, force) {
        var liked = typeof force === "boolean" ? force : (window.WaveCraftStore ? window.WaveCraftStore.isLiked(likeId(s)) : false);
        btn.classList.toggle("liked", liked);
        btn.setAttribute("aria-pressed", liked ? "true" : "false");
        var icon = btn.querySelector("i");
        if (icon) icon.className = liked ? "ri-heart-fill" : "ri-heart-line";
    }
    function playSongs(songs, idx) {
        if (!songs || !songs.length || !window.WaveCraftPlayer) return;
        var queue = songs.map(function (s) {
            return { file: s.file, title: s.title, artist: s.artist, image: s.image, album: s.album || "" };
        });
        window.WaveCraftPlayer.play(queue[idx || 0], queue, idx || 0, true);
    }
    function cardHTML(a) {
        var badge = a.verified ? '<span class="wc-verified" title="Verified artist"><i class="ri-verified-badge-fill"></i></span>' : "";
        return '<article class="wc-artist-card" data-artist-id="' + esc(a.id) + '" tabindex="0" role="link" aria-label="Open ' + esc(a.name) + '">' +
            '<div class="wc-artist-img"><img src="' + esc(a.image) + '" alt="' + esc(a.name) + '" loading="lazy">' +
            '<button type="button" class="wc-artist-play" data-play-artist="' + esc(a.id) + '" aria-label="Play ' + esc(a.name) + '"><i class="ri-play-fill"></i></button></div>' +
            '<h3>' + esc(a.name) + ' ' + badge + '</h3><p>' + esc(a.genre || "Artist") + '</p></article>';
    }
    function filtered() {
        var q = state.q.toLowerCase();
        return WA.list.filter(function (a) {
            var okG = state.genre === "All" || (a.genre || "") === state.genre;
            var okQ = !q || a.name.toLowerCase().indexOf(q) !== -1 || (a.genre || "").toLowerCase().indexOf(q) !== -1;
            return okG && okQ;
        });
    }
    function paintFilters() {
        if (!filtersBox) return;
        var genres = ["All"];
        WA.list.forEach(function (a) { if (a.genre && genres.indexOf(a.genre) === -1) genres.push(a.genre); });
        filtersBox.innerHTML = genres.map(function (g) {
            return '<button type="button" data-genre="' + esc(g) + '" class="' + (state.genre === g ? "on" : "") + '">' + esc(g) + '</button>';
        }).join("");
        filtersBox.querySelectorAll("button").forEach(function (b) {
            b.addEventListener("click", function () { state.genre = b.dataset.genre; paintFilters(); paintGrid(); });
        });
    }
    function paintGrid() {
        var list = filtered();
        if (!list.length && WA.list.length) {
            grid.innerHTML = "";
            if (countEl) countEl.textContent = "0 artists";
            if (emptyEl) {
                emptyEl.hidden = false;
                emptyEl.textContent = state.q || state.genre !== "All"
                    ? "No artists match your search yet. Try another name or genre."
                    : "No artists available yet.";
            }
        } else {
            grid.innerHTML = list.map(cardHTML).join("");
            if (countEl) countEl.textContent = list.length + " artist" + (list.length === 1 ? "" : "s");
            if (emptyEl) emptyEl.hidden = true;
        }
        bindCards(grid);
    }
    function paintCarousel(id, list) {
        var el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = list.length ? list.map(cardHTML).join("") : '<p class="wc-empty">No artists available yet.</p>';
        bindCards(el);
    }
    function bindCards(root) {
        root.querySelectorAll(".wc-artist-card").forEach(function (card) {
            if (card.dataset.bound) return;
            card.dataset.bound = "true";
            function go() { showDetail(card.dataset.artistId, true); }
            card.addEventListener("click", function (e) {
                var play = e.target.closest ? e.target.closest("[data-play-artist]") : null;
                if (play) {
                    e.stopPropagation();
                    var songs = WA.songsFor(play.dataset.playArtist);
                    playSongs(songs, 0);
                    return;
                }
                go();
            });
            card.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
            });
        });
    }
    function detailHTML(a) {
        var songs = WA.songsFor(a.id);
        var albums = WA.albumsFor(a.id);
        var following = isFollowing(a.id);
        var peers = WA.list.filter(function (x) { return x.id !== a.id && (x.genre || "") === (a.genre || ""); }).slice(0, 6);
        if (!peers.length) peers = WA.list.filter(function (x) { return x.id !== a.id; }).slice(0, 6);
        var badge = a.verified ? '<span class="wc-verified big"><i class="ri-verified-badge-fill"></i> Verified Artist</span>' : '<span class="wc-verified big plain">Artist</span>';
        var rows = songs.length ? songs.map(function (s, i) {
            return '<div class="wc-song-row" data-song-idx="' + i + '" tabindex="0" role="button" aria-label="Play ' + esc(s.title) + '">' +
                '<span class="wc-song-num">' + (i + 1) + '</span>' +
                '<img src="' + esc(s.image) + '" alt="' + esc(s.title) + ' artwork" loading="lazy">' +
                '<div class="wc-song-meta"><strong>' + esc(s.title) + '</strong><small>' + esc(s.album || a.name) + '</small></div>' +
                '<span class="wc-song-dur">' + esc(s.duration || "") + '</span>' +
                '<button type="button" class="wc-song-like" data-like-idx="' + i + '" aria-label="Like ' + esc(s.title) + '"><i class="ri-heart-line"></i></button>' +
                '<button type="button" class="wc-song-play" aria-label="Play ' + esc(s.title) + '"><i class="ri-play-fill"></i></button></div>';
        }).join("") : '<p class="wc-empty">Songs for this artist are coming soon.</p>';
        var albumCards = albums.length ? albums.map(function (al) {
            return '<div class="wc-album-card"><img src="' + esc(al.image) + '" alt="' + esc(al.title) + ' artwork" loading="lazy"><strong>' + esc(al.title) + '</strong><small>' + esc(a.name) + '</small></div>';
        }).join("") : '<p class="wc-empty">Albums for this artist are coming soon.</p>';
        return '<section class="wc-hero" style="--hero-img:url(&quot;' + esc(a.image) + '&quot;)">' +
            '<img class="wc-hero-img" src="' + esc(a.image) + '" alt="' + esc(a.name) + '">' +
            '<div class="wc-hero-info">' + badge + '<h2>' + esc(a.name) + '</h2>' +
            '<p class="wc-hero-genre">' + esc(a.genre || "Artist") + ' · ' + songs.length + ' song' + (songs.length === 1 ? "" : "s") + '</p>' +
            '<div class="wc-hero-btns"><button type="button" class="wc-play-btn" id="detailPlayBtn"><i class="ri-play-fill"></i> Play</button>' +
            '<button type="button" class="wc-follow-btn' + (following ? " on" : "") + '" id="detailFollowBtn">' + (following ? "Following" : "Follow") + '</button></div></div></section>' +
            '<section class="wc-detail-sec"><h3>Popular Songs</h3><div class="wc-song-list">' + rows + '</div></section>' +
            '<section class="wc-detail-sec"><h3>Albums</h3><div class="wc-album-grid">' + albumCards + '</div></section>' +
            '<section class="wc-detail-sec"><h3>About ' + esc(a.name) + '</h3><p class="wc-bio">' + esc(a.bio || "More about this WaveCraft artist is coming soon.") + '</p></section>' +
            '<section class="wc-detail-sec"><h3>More Like ' + esc(a.name) + '</h3><div class="wc-artist-grid wc-more-grid">' + peers.map(cardHTML).join("") + '</div></section>';
    }
    function showDetail(id, push) {
        var a = WA.getById(id);
        if (!a) {
            detailContent.innerHTML = '<div class="wc-notfound"><h2>Artist not found.</h2><p>The artist you are looking for is unavailable.</p></div>';
        } else {
            document.title = a.name + " · WaveCraft";
            detailContent.innerHTML = detailHTML(a);
            var songs = WA.songsFor(a.id);
            var playBtn = document.getElementById("detailPlayBtn");
            if (playBtn) playBtn.addEventListener("click", function () { playSongs(songs, 0); });
            var followBtn = document.getElementById("detailFollowBtn");
            if (followBtn) followBtn.addEventListener("click", function () {
                var now = toggleFollow(a.id);
                followBtn.textContent = now ? "Following" : "Follow";
                followBtn.classList.toggle("on", now);
            });
            bindCards(detailContent);
            detailContent.querySelectorAll(".wc-song-row").forEach(function (row) {
                function go() { playSongs(songs, Number(row.dataset.songIdx || 0)); }
                row.addEventListener("click", function (e) {
                    if (e.target.closest && e.target.closest(".wc-song-like")) return;
                    go();
                });
                row.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
            });
            detailContent.querySelectorAll(".wc-song-like").forEach(function (btn) {
                var s = songs[Number(btn.dataset.likeIdx || 0)];
                paintLike(btn, s);
                btn.addEventListener("click", function (e) {
                    e.stopPropagation();
                    if (!window.WaveCraftStore || !s) return;
                    var res = window.WaveCraftStore.toggleLike({ id: s.id, title: s.title, artist: s.artist, image: s.image, file: s.file, album: s.album });
                    paintLike(btn, s, res.liked);
                });
            });
        }
        savedScroll = window.scrollY || savedScroll;
        dirView.hidden = true;
        detailView.hidden = false;
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (push) {
            try {
                var url = "artist.html?artist=" + encodeURIComponent(id);
                history.pushState({ artist: id }, "", url);
            } catch (e) { }
        }
    }
    function showDirectory(pop) {
        detailView.hidden = true;
        dirView.hidden = false;
        document.title = "Artists · WaveCraft";
        if (!pop) { try { history.pushState({}, "", "artist.html"); } catch (e) { } }
        window.scrollTo({ top: savedScroll || 0, behavior: "smooth" });
    }
    if (backBtn) backBtn.addEventListener("click", function () { showDirectory(false); });
    if (searchInput) searchInput.addEventListener("input", function () { state.q = searchInput.value.trim(); paintGrid(); });
    document.querySelectorAll("[data-carousel-prev]").forEach(function (b) {
        b.addEventListener("click", function () {
            var el = document.getElementById(b.dataset.carouselPrev);
            if (el) el.scrollBy({ left: -Math.round(el.clientWidth * 0.85), behavior: "smooth" });
        });
    });
    document.querySelectorAll("[data-carousel-next]").forEach(function (b) {
        b.addEventListener("click", function () {
            var el = document.getElementById(b.dataset.carouselNext);
            if (el) el.scrollBy({ left: Math.round(el.clientWidth * 0.85), behavior: "smooth" });
        });
    });
    window.addEventListener("popstate", function (e) {
        var id = (e.state && e.state.artist) || new URLSearchParams(location.search).get("artist");
        if (id && WA.getById(id)) showDetail(id, false);
        else showDirectory(true);
    });
    paintFilters();
    paintGrid();
    paintCarousel("popularCarousel", WA.byTag("popular").length ? WA.byTag("popular") : WA.list.slice(0, 10));
    paintCarousel("trendingCarousel", WA.byTag("trending").length ? WA.byTag("trending") : WA.list.slice(0, 10));
    paintCarousel("upcomingCarousel", WA.byTag("upcoming").length ? WA.byTag("upcoming") : WA.list.slice(-10));
    var startId = new URLSearchParams(location.search).get("artist");
    if (startId && WA.getById(startId)) showDetail(startId, false);
})();


/* WaveCraft shared artist catalogue - single source of truth.
   Used by artist.html directory + dedicated view, and every page
   to resolve an artist name -> artist.html?artist=<id>. */
(function () {
    "use strict";
    function slug(name) {
        return String(name || "").toLowerCase().trim()
            .replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || "unknown-artist";
    }
    var ARTISTS = [

        { id: "burna-boy", 
          name: "Burna Boy", 
          image: "img/Burna-boy.jpg", 
          genre: "Afrobeats", 
          verified: true, 
          tags: ["popular", "trending"], 
          bio: "Grammy-winning Afrofusion star whose commanding voice carried Afrobeats to the world stage." },

        { id: "Bad Bunny",
          name: "Bad Bunny",
          genre: "Latin",
          title: "DtMF",
          image: "img/dtmf.jpg",
          verified: true,
          tag: ["Popular"],
          bio: "3:57" },

        { id: "wizkid", name: "Wizkid", image: "img/wizkid.jpeg", genre: "Afrobeats", verified: true, tags: ["popular", "trending"], bio: "Lagos-born hitmaker blending Afrobeats, R&B and global pop with effortless ease." },
        { id: "tems", name: "Tems", image: "img/tems.jpg", genre: "R&B", verified: true, tags: ["popular", "trending"], bio: "Soulful singer-songwriter with a rich tone and honest writing." },
        { id: "asake", name: "Asake", image: "img/asake.jpg", genre: "Afrobeats", verified: true, tags: ["popular", "trending"], bio: "Fuji-meets-amapiano hit machine delivering street anthems back to back." },
        { id: "davido", name: "Davido", image: "img/davido.jpg", genre: "Afrobeats", verified: true, tags: ["popular", "trending"], bio: "Afrobeats ambassador with an unmatched run of party anthems." },
        { id: "seyi-vibez", name: "Seyi Vibez", image: "img/seyi-vibes.jpg", genre: "Afrobeats", verified: true, tags: ["popular", "trending"], bio: "Prolific street-pop voice pairing heartfelt melodies with raw storytelling." },
        { id: "shallipopi", name: "Shallipopi", image: "img/shallipopi.jpg", genre: "Afrobeats", verified: true, tags: ["popular", "trending", "upcoming"], bio: "Benin City breakout whose playful slang dominates streets and charts." },
        { id: "ayra-starr", name: "Ayra Starr", image: "img/Ayra=star.jpg", genre: "Afrobeats", verified: true, tags: ["popular", "trending"], bio: "Gen-Z Afropop star with bold vocals and global crossover hits." },
        { id: "qing-madi", name: "Qing Madi", image: "img/qing-madi.jpg", genre: "Afrobeats", verified: false, tags: ["popular", "upcoming"], bio: "Teenage singer-songwriter crafting tender Afropop gems." },
        { id: "odumodublvck", name: "ODUMODUBLVCK", image: "img/Odumodublvck.webp", genre: "Hip-Hop", verified: true, tags: ["popular", "trending", "upcoming"], bio: "Abuja rap powerhouse fusing drill, grime and Afrobeats." },
        { id: "fola", name: "FOLA", image: "img/you.jpg", genre: "Afrobeats", verified: false, tags: ["trending", "upcoming"], bio: "Rising melodist behind smooth street-soul records." },
        { id: "victony", name: "Victony", image: "img/slick.jpg", genre: "Afrobeats", verified: true, tags: ["trending", "upcoming"], bio: "Versatile hitmaker moving between Afropop and R&B." },
        { id: "kizz-daniel", name: "Kizz Daniel", image: "img/kizz-daniel.jpg", genre: "Afrobeats", verified: true, tags: ["trending"], bio: "Consistent hitmaker with timeless Afropop anthems." },
        { id: "bnxn", name: "BNXN", image: "img/eja-meja.webp", genre: "Afrobeats", verified: true, tags: ["trending", "upcoming"], bio: "Emotive singer with a golden pen for melodies." },
        { id: "mayorkun", name: "Mayorkun", image: "img/in-my-head.jpg", genre: "Afrobeats", verified: true, tags: ["upcoming"], bio: "Afropop favourite known for catchy hooks." },
        { id: "blaqbonez", name: "Blaqbonez", image: "img/chanel.jpg", genre: "Hip-Hop", verified: true, tags: ["trending"], bio: "Witty rapper blending bars with Afropop appeal." },
        { id: "black-sherif", name: "Black Sherif", image: "img/sacrifice.jpg", genre: "Afrobeats", verified: true, tags: ["trending", "upcoming"], bio: "Ghanaian storyteller whose confessionals won the continent." },
        { id: "king-promise", name: "King Promise", image: "img/chop-life.jpg", genre: "Afrobeats", verified: true, tags: ["upcoming"], bio: "Ghanaian crooner serving silky highlife love songs." },
        { id: "gyakie", name: "Gyakie", image: "img/december.jpg", genre: "Afrobeats", verified: false, tags: ["upcoming"], bio: "Songbird behind soft, romantic Afrofusion records." },
        { id: "faceless", name: "Faceless", image: "img/faceless.jpg", genre: "Afrobeats", verified: false, tags: ["upcoming"], bio: "Mysterious emerging act crafting catchy street-pop." },
        { id: "moonchild-sanelly", name: "Moonchild Sanelly", image: "img/moonchild-sanelly.jpg", genre: "Afrobeats", verified: false, tags: ["upcoming"], bio: "Bold performer with electric gqom-infused pop." },
        { id: "young-johnn", name: "Young Jonn", image: "img/barely-lyrics.jpg", genre: "Afrobeats", verified: true, tags: ["trending"], bio: "Producer-turned-hitmaker delivering seductive grooves." },
        { id: "d-rhock", name: "D Rhock", image: "img/drhock.jpg", genre: "Afrobeats", verified: false, tags: ["upcoming"], bio: "Rising street-pop voice behind the anthem CHOKE ME." },
        { id: "ef-moon", name: "EF Moon", image: "img/ef-moon.jpg", genre: "Afrobeats", verified: false, tags: ["upcoming"], bio: "Emerging melodist delivering smooth Afropop confessions." },
        { id: "alex-warren", name: "Alex Warren", image: "img/alex-warren.jpg", genre: "Pop", verified: false, tags: ["upcoming"], bio: "Breakout pop storyteller behind the viral ballad Ordinary." },
        { id: "zaylevelten", name: "Zaylevelten", image: "img/tease-me.jpg", genre: "Afrobeats", verified: false, tags: ["upcoming"], bio: "Viral newcomer turning playful streets records into hits." },
        { id: "champz", name: "Champz", image: "img/champz.webp", genre: "Afrobeats", verified: false, tags: ["upcoming"], bio: "Hungry young hitmaker with the street anthem Champion." },
        { id: "adela", name: "Adela", image: "img/machine-girl.jpg", genre: "Pop", verified: false, tags: ["upcoming"], bio: "Alt-pop riser pushing bold electronic sounds." }
    ];
    var SONGS = {

        "burna-boy": [
            {
                title: "For Everybody",
                album: "No Sign of Weakness",
                image: "img/Burna-boy.jpg", 
                file: "audio/Burna-Boy-For-Everybody.mp3",
                duration: "3:21"
            }
        ],

        "Bad Bunny": [
               { title: "DtMF",
                 album: "DeBI TiRAR MaS FoToS",
                 image: "img/dtmf.jpg",
                 file: "audio/latin/Bad_Bunny_-_DtMF_(mp3.pm).mp3",
                 duration: "3:57"
            }],

        "wizkid": [
            {
                title: "Essence",
                album: "Made in Lagos",
                image: "img/wizkid.jpeg",
                file: "audio/Wizkid_Ft._Tems_-_Essence.mp3",
                duration: "4:08"
            }
        ],
        "tems": [
            {
                title: "What You Need",
                album: "Born in the Wild",
                image: "img/tems.jpg",
                file: "audio/Tems-What-You-Need-Vistanaij.com_.mp3",
                duration: "3:29"
            }
        ],
        "davido": [
            {
                title: "I Know Who I Be",
                album: "Davido",
                image: "img/davido.jpg",
                file: "audio/Davido-I-Know-Who-I-Be-feat-JAZZWRLD-GL_Ceejay.mp3",
                duration: "3:15"
            },
            {
                title: "B4 B4",
                album: "B4 B4",
                image: "img/b4-b4.jpg",
                file: "audio/Davido-B4-B4-ft-Mayorkun-Fola-(JustNaija.com).mp3",
                duration: "3:20"
            }
        ],
        "seyi-vibez": [{ title: "Pressure", album: "Thy Kingdom Come", image: "img/seyi-vibes.jpg", file: "audio/Seyi-Vibez-Pressure-Official-Video-(CeeNaija.com).mp3", duration: "3:14" }],
        "shallipopi": [{ title: "Hightension", album: "Shallipopi", image: "img/shallipopi.jpg", file: "audio/Shallipopi-Hightension-(JustNaija.com).mp3", duration: "2:56" }],
        "ayra-starr": [{ title: "Tornado", album: "Ayra Starr", image: "img/Ayra=star.jpg", file: "audio/Ayra-Starr-Tornado.mp3", duration: "3:04" }],
        "qing-madi": [{ title: "Vision", album: "Qing Madi", image: "img/qing-madi.jpg", file: "audio/Qing-Madi-Vision-(JustNaija.com).mp3", duration: "3:11" }],
        "odumodublvck": [{ title: "Motion Sickness", album: "The Machine Is Coming", image: "img/Odumodublvck.webp", file: "audio/ODUMODUBLVCK-MOTION-SICKNESS-feat-Zlatan.mp3", duration: "3:07" }],
        "asake": [
            { title: "Forgiveness", album: "Lungu Boy", image: "img/asake.jpg", file: "audio/Asake-Forgiveness-(JustNaija.com).mp3", duration: "3:18" },
            { title: "EJA MEJA", album: "EJA MEJA", image: "img/eja-meja.webp", file: "audio/BNXN-Eja-Meja-Ft-Asake-(JustNaija.com).mp3", duration: "3:14" }],
        "fola": [
            { title: "YOU", album: "YOU", image: "img/you.jpg", file: "audio/FOLA_YOU.mp3", duration: "3:02" },
            { title: "B4 B4", album: "B4 B4", image: "img/b4-b4.jpg", file: "audio/Davido-B4-B4-ft-Mayorkun-Fola-(JustNaija.com).mp3", duration: "3:20" }],
        "victony": [{ title: "SLICK", album: "The Villain I Never Was", image: "img/slick.jpg", file: "audio/Victony-SLICK.mp3", duration: "3:21" }],
        "kizz-daniel": [{ title: "Marhaba", album: "Maverick", image: "img/marhaba.jpg", file: "audio/Kizz-Daniel-Marhaba-(JustNaija.com)", duration: "2:47" }],
        "bnxn": [{ title: "EJA MEJA", album: "EJA MEJA", image: "img/eja-meja.webp", file: "audio/BNXN-Eja-Meja-Ft-Asake-(JustNaija.com).mp3", duration: "3:14" }],
        "blaqbonez": [{ title: "CHANEL", album: "No Excuses", image: "img/chanel.jpg", file: "audio/Blaqbonez-Chanel-ft-Asake-(JustNaija.com).mp3", duration: "3:09" }],
        "black-sherif": [{ title: "Sacrifice", album: "Sacrifice", image: "img/sacrifice.jpg", file: "audio/Black-Sherif-Sacrifice-Video-(JustNaija.com).mp3", duration: "3:18" }],
        "king-promise": [{ title: "Chop Life", album: "True To Self", image: "img/chop-life.jpg", file: "audio/King-Promise-Chop-Life-(TrendyBeatz.com).mp3", duration: "2:58" }],
        "gyakie": [{ title: "December", album: "December", image: "img/december.jpg", file: "audio/Gyakie-December-(TrendyBeatz.com).mp3", duration: "3:12" }],
        "faceless": [{ title: "Charmer", album: "Charmer", image: "img/faceless.jpg", file: "audio/FACELESS-Charmer-ft.-LYTA-(JustNaija.com).mp3", duration: "2:51" }],
        "mayorkun": [
            { title: "In My Head", album: "Still The Mayor", image: "img/in-my-head.jpg", file: "audio/Mayorkun-In-My-Head.mp3", duration: "2:45" },
            { title: "B4 B4", album: "B4 B4", image: "img/b4-b4.jpg", file: "audio/Davido-B4-B4-ft-Mayorkun-Fola-(JustNaija.com).mp3", duration: "3:20" }],
        "moonchild-sanelly": [{ title: "Thunda Thighs", album: "Full Moon", image: "img/moonchild-sanelly.jpg", file: "audio/Moonchild-Sanelly-Thunda-Thighs-ft.-Dladla-Mshunqisi-DJ-Tira-(JustNaija.com).mp3", duration: "3:26" }],
        "young-johnn": [{ title: "Che Che", album: "Che Che", image: "img/barely-lyrics.jpg", file: "audio/Young-Jonn-Che-Che-ft.-Asake-(JustNaija.com).mp3", duration: "2:56" }],
        "d-rhock": [{ title: "CHOKE ME", album: "CHOKE ME", image: "img/drhock.jpg", file: "audio/D-RHOCK-Choke-Me-(JustNaija.com).mp3", duration: "2:58" }],
        "ef-moon": [{ title: "I KNOW", album: "I KNOW", image: "img/ef-moon.jpg", file: "audio/EF-Moon-I-Knoww-ft.-Star-Jay.mp3", duration: "3:05" }],
        "alex-warren": [{ title: "Ordinary", album: "Ordinary", image: "img/alex-warren.jpg", file: "audio/Alex warren - Ordinary.mp3", duration: "3:06" }],
        "zaylevelten": [{ title: "Tease Me", album: "Tease Me", image: "img/tease-me.jpg", file: "audio/Zaylevelten_-_-_Tease_MeHipopsongs.com.ng.mp3", duration: "2:49" }],
        "champz": [{ title: "Champion", album: "Champion", image: "img/champz.webp", file: "audio/Champz-Champion-Sound-(JustNaija.com).mp3", duration: "2:52" }],
        "adela": [{ title: "Machine Girl", album: "Machine Girl", image: "img/machine-girl.jpg", file: "audio/MachineGirl.mp3", duration: "3:12" }]
    };
    function getById(id) {
        id = String(id || "").toLowerCase();
        for (var i = 0; i < ARTISTS.length; i++) if (ARTISTS[i].id === id) return ARTISTS[i];
        return null;
    }
    function findByName(name) {
        var n = String(name || "").toLowerCase().trim();
        if (!n) return null;
        var i, a;
        for (i = 0; i < ARTISTS.length; i++) if (ARTISTS[i].name.toLowerCase() === n) return ARTISTS[i];
        for (i = 0; i < ARTISTS.length; i++) { a = ARTISTS[i].name.toLowerCase(); if (n.indexOf(a) !== -1 || a.indexOf(n) !== -1) return ARTISTS[i]; }
        return getById(slug(n));
    }
    function songsFor(artistId) {
        var a = getById(artistId);
        if (!a) return [];
        return (SONGS[artistId] || []).map(function (s, i) {
            return { id: artistId + "-song-" + i, title: s.title, artist: a.name, album: s.album || "", image: s.image || a.image, file: s.file || "", duration: s.duration || "" };
        });
    }
    function albumsFor(artistId) {
        var songs = songsFor(artistId), seen = {}, albums = [];
        songs.forEach(function (s) {
            var key = String(s.album || s.title).toLowerCase();
            if (seen[key]) return; seen[key] = true;
            albums.push({ title: s.album || s.title, image: s.image, artist: s.artist });
        });
        return albums;
    }
    function byTag(tag) { return ARTISTS.filter(function (a) { return (a.tags || []).indexOf(tag) !== -1; }); }
    function openArtist(idOrName) {
        var a = getById(idOrName) || findByName(idOrName);
        if (!a) return;
        try { if (window.WaveCraftPlayer && window.WaveCraftPlayer.saveForNavigation) window.WaveCraftPlayer.saveForNavigation(); } catch (e) { }
        window.location.href = "artist.html?artist=" + encodeURIComponent(a.id);
    }
    function bindMusicCardArtists() {
        try {
            if (/artist\.html(\?|$)/.test(location.pathname + location.search)) return;
            document.querySelectorAll(".music-card").forEach(function (card) {
                if (card.dataset.wcArtistNav) return;
                card.dataset.wcArtistNav = "true";
                var nameEl = card.querySelector(".music-card-body p, .music-card-body a p");
                if (!nameEl) return;
                nameEl.style.cursor = "pointer";
                nameEl.setAttribute("tabindex", "0");
                nameEl.setAttribute("role", "link");
                function go(e) {
                    if (e) e.stopPropagation();
                    var t = findByName(nameEl.textContent.trim());
                    if (t) openArtist(t.id);
                }
                nameEl.addEventListener("click", go);
                nameEl.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(e); } });
            });
        } catch (e) { }
    }
    function bindCrossPageCards() {
        bindMusicCardArtists();
        try {
            if (/artist\.html(\?|$)/.test(location.pathname + location.search)) return;
            document.querySelectorAll(".wc-artist-card").forEach(function (card) {
                if (card.dataset.wcArtistBound) return;
                card.dataset.wcArtistBound = "true";
                card.style.cursor = "pointer";
                card.setAttribute("tabindex", "0");
                card.setAttribute("role", "link");
                var nameEl = card.querySelector("h3");
                var nm = nameEl ? nameEl.textContent.trim() : "";
                var found = findByName(nm);
                if (found) card.setAttribute("aria-label", "Open " + found.name);
                function go() { var t = findByName(nm); if (t) openArtist(t.id); }
                card.addEventListener("click", function () { go(); });
                card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
            });
        } catch (e) { }
    }
    window.WaveCraftArtists = { list: ARTISTS, slug: slug, getById: getById, findByName: findByName, songsFor: songsFor, albumsFor: albumsFor, byTag: byTag, openArtist: openArtist };
    if (document.readyState !== "loading") bindCrossPageCards();
    else document.addEventListener("DOMContentLoaded", bindCrossPageCards);
    try { new MutationObserver(bindCrossPageCards).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) { }
})();
