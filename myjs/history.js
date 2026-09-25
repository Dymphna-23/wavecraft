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
/* ===== LISTENING HISTORY (page content only; reuses player + store) ===== */
(function () {
    var KEY = "wavecraftListeningHistory";
    var FALLBACK_IMG = "img/nav-logo-removebg-preview (1).png";
    var root = document.getElementById("historyContent");
    if (!root) return;
    var groupsEl = document.getElementById("historyGroups");
    var emptyEl = document.getElementById("historyEmpty");
    var noMatchEl = document.getElementById("historyNoMatch");
    var countEl = document.getElementById("historyCount");
    var searchEl = document.getElementById("historySearch");
    var continueSection = document.getElementById("continueSection");
    var continueRow = document.getElementById("continueRow");
    var modal = document.getElementById("clearHistoryModal");
    var state = { q: "", filter: "all" };
    function store() { return window.WaveCraftStore || null; }
    function readHistory() {
        try { var raw = localStorage.getItem(KEY); var arr = raw ? JSON.parse(raw) : []; return Array.isArray(arr) ? arr.filter(Boolean) : []; }
        catch (e) { return []; }
    }
    function writeHistory(items) { try { localStorage.setItem(KEY, JSON.stringify(items.slice(0, 200))); } catch (e) {} }
    function normalizeEntry(e) {
        if (!e) return null;
        return { id: String(e.id || ((e.title || "") + "__" + (e.artist || "") + "__" + (e.playedAt || 0))),
            title: e.title || "Unknown song", artist: e.artist || "Unknown artist", album: e.album || "",
            image: e.image || FALLBACK_IMG, file: e.file || e.song || "", kind: e.kind || "song", playedAt: Number(e.playedAt) || Date.now() };
    }
    function recordPlay(song) {
        if (!song || (!song.file && !song.title)) return;
        var entry = normalizeEntry({ title: song.title, artist: song.artist, album: song.album, image: song.image, file: song.file || song.song, playedAt: Date.now() });
        var items = readHistory().map(normalizeEntry).filter(Boolean);
        var last = items[0];
        if (last && last.file && entry.file && last.file === entry.file && (Date.now() - last.playedAt) < 30000) return;
        items.unshift(entry); writeHistory(items); render();
    }
    window.WaveCraftHistory = { record: recordPlay, key: KEY };
    function whenLabel(ts) { var g = groupFor(ts); if (g.order <= 1) return g.label + " \u2022 " + fmtTime(ts); return g.label; }
    function filtered(items) {
        var q = state.q.trim().toLowerCase();
        return items.filter(function (e) {
            if (state.filter !== "all" && (e.kind || "song") !== state.filter) return false;
            if (!q) return true;
            return ((e.title || "") + " " + (e.artist || "") + " " + (e.album || "")).toLowerCase().indexOf(q) >= 0;
        });
    }
    function playEntry(e) {
        if (window.WaveCraftPlayer && e.file) {
            var list = readHistory().map(normalizeEntry).filter(Boolean);
            var queue = list.filter(function (x) { return x.file; }).map(function (x) { return { file: x.file, title: x.title, artist: x.artist, image: x.image, album: x.album }; });
            var idx = Math.max(0, queue.findIndex(function (x) { return x.file === e.file; }));
            window.WaveCraftPlayer.play({ file: e.file, title: e.title, artist: e.artist, image: e.image, album: e.album }, queue.length ? queue : undefined, queue.length ? idx : undefined, true);
        }
    }
    function closeMenu() { var m = document.getElementById("wcHistoryMenu"); if (m) m.remove(); }
    function shareEntry(entry) {
        var text = entry.title + " \u2014 " + entry.artist;
        if (navigator.share) { navigator.share({ title: entry.title, text: text }).catch(function () {}); }
        else if (navigator.clipboard) { navigator.clipboard.writeText(text).then(function () { alert("Copied: " + text); }, function () { alert(text); }); }
        else { alert(text); }
    }
    function removeEntry(id) { writeHistory(readHistory().map(normalizeEntry).filter(function (e) { return e && String(e.id) !== String(id); })); render(); }
    function addToPlaylistFlow(entry) {
        var st = store(); if (!st) return;
        var pls = st.getPlaylists();
        if (!pls.length) {
            var name = prompt("Create a playlist to add this song:");
            if (name && name.trim()) { var pl = st.createPlaylist(name.trim(), ""); st.addSongToPlaylist(pl.id, entry); alert("Added to " + pl.name); }
            return;
        }
        var label = pls.map(function (p, i) { return (i + 1) + ". " + p.name; }).join("\n");
        var choice = prompt("Add to playlist:\n" + label + "\n\nEnter a number, or a new playlist name:");
        if (!choice || !choice.trim()) return;
        var n = parseInt(choice.trim(), 10);
        if (!isNaN(n) && pls[n - 1]) { var res = st.addSongToPlaylist(pls[n - 1].id, entry); alert(res.status === "added" ? "Added to " + pls[n - 1].name : "Already in " + pls[n - 1].name); }
        else { var created = st.createPlaylist(choice.trim(), ""); st.addSongToPlaylist(created.id, entry); alert("Added to " + created.name); }
    }
    function openMenu(entry, x, y) {
        closeMenu();
        var menu = document.createElement("div");
        menu.className = "wc-history-menu"; menu.id = "wcHistoryMenu"; menu.setAttribute("role", "menu");
        var st = store(); var liked = st ? st.isLiked(entry.id) : false;
        var defs = [
            { t: "Play", i: "ri-play-fill", fn: function () { playEntry(entry); } },
            { t: liked ? "Remove from Liked Music" : "Add to Liked Music", i: liked ? "ri-heart-fill" : "ri-heart-line", fn: function () { if (st) st.toggleLike(entry); render(); } },
            { t: "Add to Playlist", i: "ri-add-line", fn: function () { addToPlaylistFlow(entry); } },
            { t: "Share", i: "ri-share-line", fn: function () { shareEntry(entry); } },
            { t: "Remove from Listening History", i: "ri-delete-bin-6-line", fn: function () { removeEntry(entry.id); } }
        ];
        if (entry.artist && entry.artist !== "Unknown artist") defs.splice(3, 0, { t: "Go to Artist", i: "ri-mic-line", fn: function () { window.location.href = "index.html#artists"; } });
        if (entry.album) defs.splice(4, 0, { t: "Go to Album", i: "ri-album-line", fn: function () { window.location.href = "index.html#albums"; } });
        defs.forEach(function (d) {
            var b = document.createElement("button"); b.type = "button"; b.setAttribute("role", "menuitem");
            var ic = document.createElement("i"); ic.className = d.i;
            var sp = document.createElement("span"); sp.textContent = d.t;
            b.appendChild(ic); b.appendChild(sp);
            b.addEventListener("click", function (ev) { ev.stopPropagation(); closeMenu(); d.fn(); });
            menu.appendChild(b);
        });
        document.body.appendChild(menu);
        menu.style.left = Math.max(12, Math.min(x, window.innerWidth - 250)) + "px";
        menu.style.top = Math.max(12, Math.min(y, window.innerHeight - 330)) + "px";
    }
    function renderContinue(items) {
        if (!continueSection || !continueRow) return;
        var picks = items.slice(0, 4);
        if (!picks.length) { continueSection.hidden = true; continueRow.innerHTML = ""; return; }
        continueSection.hidden = false; continueRow.innerHTML = "";
        picks.forEach(function (e) {
            var b = document.createElement("button"); b.type = "button"; b.className = "wc-history-pick";
            b.setAttribute("aria-label", "Play " + e.title + " by " + e.artist);
            var imgWrap = document.createElement("div"); imgWrap.className = "wc-history-pick-img";
            var img = document.createElement("img"); img.src = e.image || FALLBACK_IMG; img.alt = e.title;
            img.onerror = function () { img.src = FALLBACK_IMG; };
            var badge = document.createElement("span"); badge.className = "wc-history-pick-play"; badge.innerHTML = '<i class="ri-play-fill"></i>';
            imgWrap.appendChild(img); imgWrap.appendChild(badge);
            var body = document.createElement("div"); body.className = "wc-history-pick-body";
            var t = document.createElement("strong"); t.textContent = e.title;
            var a = document.createElement("small"); a.textContent = e.artist;
            body.appendChild(t); body.appendChild(a); b.appendChild(imgWrap); b.appendChild(body);
            b.addEventListener("click", function () { playEntry(e); });
            continueRow.appendChild(b);
        });
    }
    function render() {
        var items = readHistory().map(normalizeEntry).filter(Boolean);
        renderContinue(items);
        var list = filtered(items);
        groupsEl.innerHTML = "";
        var searching = state.q.trim().length > 0;
        emptyEl.hidden = items.length !== 0;
        noMatchEl.hidden = !(items.length !== 0 && list.length === 0);
        countEl.textContent = items.length ? (searching ? list.length + " match" + (list.length === 1 ? "" : "es") : items.length + " song" + (items.length === 1 ? "" : "s")) : "";
        if (!list.length) return;
        var buckets = {};
        list.forEach(function (e) { var g = groupFor(e.playedAt); (buckets[g.name] = buckets[g.name] || { order: g.order, items: [] }).items.push(e); });
        Object.keys(buckets).sort(function (a, b) { return buckets[a].order - buckets[b].order; }).forEach(function (name) {
            var section = document.createElement("section"); section.className = "wc-history-group";
            var h = document.createElement("h2"); h.className = "wc-history-group-title"; h.textContent = name.toUpperCase(); section.appendChild(h);
            buckets[name].items.sort(function (a, b) { return b.playedAt - a.playedAt; }).forEach(function (e) { section.appendChild(historyRow(e)); });
            groupsEl.appendChild(section);
        });
    }
    function historyRow(e) {
        var row = document.createElement("div"); row.className = "wc-history-item"; row.tabIndex = 0; row.setAttribute("role", "button");
        row.setAttribute("aria-label", "Play " + e.title + " by " + e.artist);
        var cover = document.createElement("div"); cover.className = "wc-history-cover";
        var img = document.createElement("img"); img.src = e.image || FALLBACK_IMG; img.alt = e.title;
        img.onerror = function () { img.src = FALLBACK_IMG; };
        var overlay = document.createElement("button"); overlay.type = "button"; overlay.className = "wc-history-cover-btn";
        overlay.setAttribute("aria-label", "Play " + e.title); overlay.innerHTML = '<i class="ri-play-fill"></i>';
        overlay.addEventListener("click", function (ev) { ev.stopPropagation(); playEntry(e); });
        cover.appendChild(img); cover.appendChild(overlay);
        var meta = document.createElement("div"); meta.className = "wc-history-meta";
        var t = document.createElement("strong"); t.textContent = e.title;
        var sub = document.createElement("span"); sub.textContent = e.artist + (e.album ? "  \u2022  " + e.album : "");
        var when = document.createElement("small"); when.textContent = whenLabel(e.playedAt);
        meta.appendChild(t); meta.appendChild(sub); meta.appendChild(when);
        var more = document.createElement("button"); more.type = "button"; more.className = "wc-history-more";
        more.setAttribute("aria-label", "More options for " + e.title); more.setAttribute("aria-haspopup", "menu");
        more.innerHTML = '<i class="ri-more-2-fill"></i>';
        more.addEventListener("click", function (ev) { ev.stopPropagation(); openMenu(e, ev.clientX || 80, ev.clientY || 140); });
        row.appendChild(cover); row.appendChild(meta); row.appendChild(more);
        row.addEventListener("click", function () { playEntry(e); });
        row.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); playEntry(e); } });
        return row;
    }
    if (searchEl) searchEl.addEventListener("input", function () { state.q = searchEl.value; render(); });
    document.querySelectorAll(".wc-history-filter").forEach(function (btn) {
        btn.addEventListener("click", function () {
            state.filter = btn.dataset.filter;
            document.querySelectorAll(".wc-history-filter").forEach(function (b) {
                var on = b === btn; b.classList.toggle("active", on); b.setAttribute("aria-pressed", on ? "true" : "false");
            });
            render();
        });
    });
    var clearBtn = document.getElementById("clearHistoryBtn");
    var cancelBtn = document.getElementById("cancelClearHistory");
    var confirmBtn = document.getElementById("confirmClearHistory");
    function openModal() { if (modal) { modal.hidden = false; if (cancelBtn) cancelBtn.focus(); } }
    function hideModal() { if (modal) modal.hidden = true; }
    if (clearBtn) clearBtn.addEventListener("click", openModal);
    if (cancelBtn) cancelBtn.addEventListener("click", hideModal);
    if (modal) modal.addEventListener("click", function (e) { if (e.target === modal) hideModal(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { hideModal(); closeMenu(); } });
    if (confirmBtn) confirmBtn.addEventListener("click", function () { writeHistory([]); hideModal(); render(); });
    document.addEventListener("click", function (e) { var m = document.getElementById("wcHistoryMenu"); if (m && !m.contains(e.target)) closeMenu(); });
    if (window.WaveCraftPlayer && window.WaveCraftPlayer.subscribe) {
        (function () {
            var lastFile = null, lastAt = 0;
            window.WaveCraftPlayer.subscribe(function (s) {
                if (s && s.currentSong && s.currentSong.file) {
                    var now = Date.now();
                    if (s.currentSong.file !== lastFile || (now - lastAt) > 30000) { lastFile = s.currentSong.file; lastAt = now; recordPlay(s.currentSong); }
                }
            });
        })();
    }
    window.addEventListener("storage", function (e) { if (!e.key || e.key === KEY) render(); });
    render();
})();

