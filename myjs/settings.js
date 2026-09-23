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


/* WaveCraft settings logic */
(function () {
    var KEY = "wavecraftSettings";
    var DEFAULTS = { autoplay: true, gapless: true, crossfade: false, crossfadeDuration: 5, normalizeVolume: true, autoSimilar: false, explicit: true, streamingQuality: "high", downloadQuality: "high", wifiQuality: "very-high", mobileQuality: "normal", dataSaver: false, streamMobile: true, downloadMobile: false, autoplayPreviews: true, notifPush: true, notifEmail: true, notifReleases: true, notifArtists: true, notifPlaylists: false, notifRecommended: true, notifFollowers: true, notifActivity: false, notifPromo: false, notifWeekly: true, privateSession: false, listeningActivity: true, showRecentArtists: true, showPlaylists: true, allowFollowers: true, personalRecs: true, personalAds: false, preferredGenres: ["Afrobeats", "Hip-Hop"], contentLanguage: "English", themeMode: "system", language: "English", wifiOnly: true, autoDownloads: false, audioOnly: true, reduceMotion: false, largerText: false, highContrast: false, keyboardNav: true, connectedApps: { google: false, apple: false, facebook: false } };
    function load() { try { var s = JSON.parse(localStorage.getItem(KEY) || "{}"); var o = Object.assign({}, DEFAULTS, s); o.connectedApps = Object.assign({}, DEFAULTS.connectedApps, (s && s.connectedApps) || {}); return o; } catch (e) { return JSON.parse(JSON.stringify(DEFAULTS)); } }
    var S = load();
    function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
    function toast(m) { var w = document.getElementById("wcToastWrap"); if (!w) return; var t = document.createElement("div"); t.className = "wc-toast"; t.textContent = m; w.appendChild(t); setTimeout(function () { t.remove(); }, 2600); }
    function getUser() { try { return JSON.parse(localStorage.getItem("wavecraftUser") || "null"); } catch (e) { return null; } }
    function setUser(u) { try { localStorage.setItem("wavecraftUser", JSON.stringify(u)); } catch (e) { } }
    function applyTheme() { var mode = S.themeMode || "system"; var eff = mode; if (mode === "system" && window.matchMedia) { eff = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"; } if (eff === "light") { document.body.classList.add("light"); try { localStorage.setItem("wavecraftTheme", "light"); } catch (e) { } } else { document.body.classList.remove("light"); try { localStorage.setItem("wavecraftTheme", "dark"); } catch (e) { } } try { savedTheme = eff; } catch (e) { } try { updateThemeIcon(); } catch (e) { } document.querySelectorAll(".wc-theme-option").forEach(function (b) { b.classList.toggle("active", b.dataset.themeValue === mode); }); }
    function applyA11y() { document.body.classList.toggle("wc-reduce-motion", !!S.reduceMotion); document.body.classList.toggle("wc-large-text", !!S.largerText); document.body.classList.toggle("wc-contrast", !!S.highContrast); }
    var GENRES = ["Afrobeats", "R&B", "Hip-Hop", "Jazz", "K-Pop", "Christian & Gospel", "Rock", "Instrumental", "Anime", "Soul", "Country", "Indie", "Metal", "Latin"];
    function paintGenres() { var g = document.getElementById("genreGrid"); if (!g) return; g.innerHTML = ""; GENRES.forEach(function (n) { var b = document.createElement("button"); b.type = "button"; b.className = "wc-genre" + (S.preferredGenres.indexOf(n) >= 0 ? " active" : ""); b.textContent = n; b.addEventListener("click", function () { var i = S.preferredGenres.indexOf(n); if (i >= 0) S.preferredGenres.splice(i, 1); else S.preferredGenres.push(n); save(); paintGenres(); toast("Content preference saved"); }); g.appendChild(b); }); }
    function paintApps() { document.querySelectorAll("[data-app]").forEach(function (b) { b.textContent = S.connectedApps[b.dataset.app] ? "Disconnect" : "Connect"; }); }
    function fmtMB(m) { return m >= 1024 ? (m / 1024).toFixed(1) + " GB" : Math.round(m) + " MB"; }
    function paintStorage() { var liked = 0, pls = 0; try { liked = (JSON.parse(localStorage.getItem("wavecraftLikedSongs") || "[]") || []).length; } catch (e) { } try { pls = (JSON.parse(localStorage.getItem("wavecraftPlaylists") || "[]") || []).length; } catch (e) { } var music = liked * 4 + pls * 8; var cache = 12; try { var r = localStorage.getItem("wavecraftCacheMB"); if (r) cache = parseFloat(r); } catch (e) { } var m1 = document.getElementById("storageMusic"); if (m1) m1.textContent = fmtMB(music); var m2 = document.getElementById("storageCache"); if (m2) m2.textContent = fmtMB(cache); var m3 = document.getElementById("storageTotal"); if (m3) m3.textContent = fmtMB(music + cache); var bar = document.getElementById("storageBar"); if (bar) bar.style.width = Math.min(96, 5 + (music + cache) / 4) + "%"; var di = document.getElementById("downloadsInfo"); if (di) di.textContent = liked + " liked songs, " + pls + " playlists stored."; var td = document.getElementById("thisDeviceInfo"); if (td) td.textContent = "This browser - current session"; }
    function paint() { document.querySelectorAll(".wc-toggle").forEach(function (t) { var on = !!S[t.dataset.setting]; t.classList.toggle("on", on); t.setAttribute("aria-checked", on ? "true" : "false"); }); document.querySelectorAll(".wc-select").forEach(function (s) { if (S[s.dataset.setting] != null) s.value = S[s.dataset.setting]; }); var cd = document.getElementById("crossfadeDuration"); if (cd) { cd.value = S.crossfadeDuration; var vv = document.getElementById("crossfadeValue"); if (vv) vv.textContent = S.crossfadeDuration; } applyTheme(); applyA11y(); paintGenres(); paintApps(); paintAccount(); paintStorage(); if (window.WaveCraftDropdowns && window.WaveCraftDropdowns.syncAll) window.WaveCraftDropdowns.syncAll(); }
    var confirmCb = null;
    function openModal(id) { var m = document.getElementById(id); if (m) { m.classList.add("show"); m.setAttribute("aria-hidden", "false"); } }
    function closeModal(m) { if (typeof m === "string") m = document.getElementById(m); if (m) { m.classList.remove("show"); m.setAttribute("aria-hidden", "true"); } }
    function ask(title, text, cb) { document.getElementById("confirmTitle").textContent = title; document.getElementById("confirmText").textContent = text; confirmCb = cb; openModal("modal-confirm"); }
    document.addEventListener("click", function (e) { var c = e.target.closest("[data-close]"); if (c) { var mm = c.closest(".wc-modal"); if (mm) closeModal(mm); } var nav = e.target.closest(".wc-nav-item"); if (nav) { document.querySelectorAll(".wc-nav-item").forEach(function (x) { x.classList.remove("active"); }); nav.classList.add("active"); var sec = document.getElementById(nav.dataset.target); if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" }); } });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") document.querySelectorAll(".wc-modal.show").forEach(function (m) { closeModal(m); }); });
    document.getElementById("confirmYesBtn").addEventListener("click", function () { closeModal("modal-confirm"); if (confirmCb) { var f = confirmCb; confirmCb = null; f(); } });
    document.querySelectorAll(".wc-toggle").forEach(function (t) { t.addEventListener("click", function () { var k = t.dataset.setting; S[k] = !S[k]; if (k === "dataSaver" && S.dataSaver) { S.autoplayPreviews = false; S.mobileQuality = "low"; } save(); paint(); toast("Setting saved"); }); });
    document.querySelectorAll(".wc-select").forEach(function (s) { s.addEventListener("change", function () { S[s.dataset.setting] = s.value; save(); toast("Setting saved"); if (window.WaveCraftDropdowns && window.WaveCraftDropdowns.syncSelect) window.WaveCraftDropdowns.syncSelect(s); }); });
    document.querySelectorAll(".wc-theme-option").forEach(function (b) { b.addEventListener("click", function () { S.themeMode = b.dataset.themeValue; save(); applyTheme(); toast("Theme updated"); }); });
    var cdEl = document.getElementById("crossfadeDuration"); if (cdEl) cdEl.addEventListener("input", function () { S.crossfadeDuration = Number(cdEl.value); document.getElementById("crossfadeValue").textContent = cdEl.value; save(); });
    document.getElementById("editProfileBtn").addEventListener("click", function () { var u = getUser() || {}; document.getElementById("editDisplayName").value = u.fullName || ""; document.getElementById("editUsername").value = (u.username || "").replace(/^@/, ""); document.getElementById("editEmail").value = u.email || ""; document.getElementById("editProfileError").textContent = ""; openModal("modal-editProfile"); });
    document.getElementById("saveProfileBtn").addEventListener("click", function () { var dn = document.getElementById("editDisplayName").value.trim(); var un = document.getElementById("editUsername").value.trim(); var em = document.getElementById("editEmail").value.trim(); var er = document.getElementById("editProfileError"); if (!dn) { er.textContent = "Display name required."; return; } if (!un) { er.textContent = "Username required."; return; } if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { er.textContent = "Valid email required."; return; } var u = getUser() || {}; var p = dn.split(" "); u.firstName = p[0]; u.lastName = p.slice(1).join(" ") || "Listener"; u.fullName = dn; u.username = "@" + un.replace(/^@/, ""); u.email = em; setUser(u); closeModal("modal-editProfile"); paintAccount(); toast("Profile updated"); });
    document.getElementById("changePasswordBtn").addEventListener("click", function () { document.getElementById("passwordError").textContent = ""; openModal("modal-password"); });
    document.getElementById("savePasswordBtn").addEventListener("click", function () { var cur = document.getElementById("currentPassword").value; var nw = document.getElementById("newPassword").value; var cf = document.getElementById("confirmPassword").value; var er = document.getElementById("passwordError"); var u = getUser(); if (!u) { er.textContent = "No account found. Sign up first."; return; } if (u.password !== cur) { er.textContent = "Current password incorrect."; return; } if (nw.length < 8) { er.textContent = "New password must be 8+ characters."; return; } if (nw !== cf) { er.textContent = "Passwords do not match."; return; } u.password = nw; setUser(u); closeModal("modal-password"); toast("Password updated"); });
    var sInput = document.getElementById("settingsSearch");
    function runSearch() { var q = (sInput.value || "").toLowerCase().trim(); document.getElementById("clearSettingsSearch").hidden = !q; var rows = Array.prototype.slice.call(document.querySelectorAll(".wc-setting-row")); var shown = 0; rows.forEach(function (r) { var hit = !q || ((r.dataset.title + " " + r.dataset.desc + " " + r.dataset.category).toLowerCase().indexOf(q) >= 0); r.style.display = hit ? "" : "none"; if (hit) shown++; }); document.querySelectorAll(".wc-settings-section").forEach(function (s) { var meta = ((s.dataset.category || "") + " " + (s.dataset.keywords || "")).toLowerCase(); var vis = s.querySelectorAll('.wc-setting-row:not([style*="none"])').length; var show = !q || meta.indexOf(q) >= 0 || vis > 0; s.style.display = show ? "" : "none"; }); document.getElementById("settingsNoResults").hidden = !(q && shown === 0); document.getElementById("settingsResultCount").textContent = q ? shown + " match(es)" : ""; }
    sInput.addEventListener("input", runSearch);
    document.getElementById("clearSettingsSearch").addEventListener("click", function () { sInput.value = ""; runSearch(); });
    document.getElementById("resetSettingsSearch").addEventListener("click", function () { sInput.value = ""; runSearch(); });
    function goToSettingsSection(id) { var sec = document.getElementById(id); if (!sec) return; try { sec.scrollIntoView({ behavior: (S && S.reduceMotion) ? "auto" : "smooth", block: "start" }); } catch (e) { sec.scrollIntoView(); } if (window.WaveCraftCategoryDropdown && window.WaveCraftCategoryDropdown.syncToSection) window.WaveCraftCategoryDropdown.syncToSection(id); }
    document.getElementById("settingsMobileNav").addEventListener("change", function () { goToSettingsSection(this.value); });
    function paintAccount() { var u = getUser(); var name = u ? (u.fullName || "WaveCraft Listener") : "WaveCraft Listener"; var email = u ? (u.email || "you@example.com") : "you@example.com"; var dn = document.getElementById("accountDisplayName"); if (dn) dn.textContent = name; var un = document.getElementById("accountUsername"); if (un) un.textContent = u && u.username ? u.username : "@wavecraft-user"; var em = document.getElementById("accountEmail"); if (em) em.textContent = email; var av = document.getElementById("accountAvatar"); if (av) av.textContent = String(name).trim().charAt(0).toUpperCase() || "W"; var jd = document.getElementById("accountJoined"); if (jd) jd.textContent = "Member since " + (u && u.createdAt ? new Date(u.createdAt).getFullYear() : "2026"); }
    function bindClear(id, title, text, fn) { document.getElementById(id).addEventListener("click", function () { ask(title, text, fn); }); }
    bindClear("clearListeningBtn", "Clear listening history?", "Local history will be removed.", function () { try { localStorage.removeItem("wavecraftListeningHistory"); } catch (e) { } toast("Listening history cleared"); });
    bindClear("clearSearchHistoryBtn", "Clear search history?", "Search history removed.", function () { ["wavecraftSearchHistory", "wcSearchHistory"].forEach(function (k) { try { localStorage.removeItem(k); } catch (e) { } }); toast("Search history cleared"); });
    bindClear("clearCacheBtn", "Clear cache?", "Only cached data cleared.", function () { try { localStorage.setItem("wavecraftCacheMB", "2"); } catch (e) { } paintStorage(); toast("Cache cleared"); });
    bindClear("clearDownloadsBtn", "Clear downloads?", "Counters reset.", function () { toast("Downloads cleared"); paintStorage(); });
    bindClear("logoutOthersBtn", "Log out others?", "Demo tracks only this browser.", function () { toast("Other sessions logged out"); });
    document.getElementById("disableAllNotifBtn").addEventListener("click", function () { ask("Turn off all?", "All notifications disabled.", function () { Object.keys(S).forEach(function (k) { if (k.indexOf("notif") === 0) S[k] = false; }); save(); paint(); toast("All notifications off"); }); });
    document.querySelectorAll("[data-app]").forEach(function (b) { b.addEventListener("click", function () { var k = b.dataset.app; if (S.connectedApps[k]) { ask("Disconnect " + k + "?", "Remove future connection.", function () { S.connectedApps[k] = false; save(); paintApps(); toast(k + " disconnected"); }); } else { S.connectedApps[k] = true; save(); paintApps(); toast(k + " connected for future OAuth"); } }); });
    bindClear("logoutBtn", "Are you sure you want to log out?", "You will sign in again.", function () { var u = getUser(); if (u) { u.isLoggedIn = false; setUser(u); } toast("Logged out"); setTimeout(function () { window.location.href = "login.html"; }, 500); });
    document.getElementById("resetSettingsBtn").addEventListener("click", function () { ask("Reset all settings?", "Defaults restored.", function () { S = JSON.parse(JSON.stringify(DEFAULTS)); save(); paint(); toast("Settings reset"); }); });
    bindClear("deleteAccountBtn", "Delete account?", "Local profile removed.", function () { try { localStorage.removeItem("wavecraftUser"); } catch (e) { } toast("Account deleted"); setTimeout(function () { window.location.href = "signup.html"; }, 600); });
    paint(); runSearch();
    // WaveCraft custom dropdown engine: see WaveCraftDropdowns block below.
})();
/* WaveCraft custom dropdown engine: attached themed menus over native selects. */
window.WaveCraftDropdowns = (function () {
    var OPEN = "open"; var UP = "open-up"; var regs = [];
    function isOpen(dd) { return dd.classList.contains(OPEN); }
    function labelFor(sel) { var o = sel.options[sel.selectedIndex]; return o ? o.text : ""; }
    function closeDropdown(dd) {
        if (!dd) return; dd.classList.remove(OPEN);
        var t = dd.querySelector(".wc-dropdown-trigger"); if (t) t.setAttribute("aria-expanded", "false");
        var m = dd.querySelector(".wc-dropdown-menu"); if (m) m.setAttribute("aria-hidden", "true");
    }
    function closeAllDropdowns(ex) { regs.forEach(function (r) { if (r.dropdown !== ex) closeDropdown(r.dropdown); }); }
    function positionDropdown(reg) {
        var dd = reg.dropdown; dd.classList.remove(UP);
        var r = dd.getBoundingClientRect(); var approx = Math.min(240, reg.select.options.length * 48 + 14);
        var needUp = (window.innerHeight - r.bottom) < approx + 16 && r.top > approx + 16;
        if (needUp) dd.classList.add(UP);
        var maxH = needUp ? Math.min(240, Math.max(120, r.top - 90)) : Math.min(240, Math.max(120, window.innerHeight - r.bottom - 90));
        reg.menu.style.maxHeight = maxH + "px";
    }
    function syncReg(reg) {
        var sel = reg.select; reg.valueEl.textContent = labelFor(sel);
        reg.trigger.setAttribute("aria-label", (reg.label || "Setting") + ": " + labelFor(sel));
        Array.prototype.forEach.call(reg.menu.querySelectorAll(".wc-dropdown-option"), function (b) {
            b.setAttribute("aria-selected", b.dataset.value === sel.value ? "true" : "false");
        });
    }
    function openDropdown(reg) {
        closeAllDropdowns(reg.dropdown);
        if (window.WaveCraftCategoryDropdown && window.WaveCraftCategoryDropdown.close) window.WaveCraftCategoryDropdown.close();
        positionDropdown(reg);
        reg.dropdown.classList.add(OPEN); reg.trigger.setAttribute("aria-expanded", "true");
        reg.menu.setAttribute("aria-hidden", "false");
        focusOption(reg, Math.max(0, reg.select.selectedIndex), false);
    }
    function selectDropdownOption(reg, value) {
        var sel = reg.select;
        if (sel.value !== value) {
            sel.value = value; syncReg(reg); var ev;
            try { ev = new Event("change", { bubbles: true }); } catch (e) { ev = document.createEvent("HTMLEvents"); ev.initEvent("change", true, false); }
            sel.dispatchEvent(ev);
        } else { syncReg(reg); } closeDropdown(reg.dropdown); reg.trigger.focus();
    }
    function focusOption(reg, idx, scroll) {
        var btns = reg.menu.querySelectorAll(".wc-dropdown-option");
        if (!btns.length) return; idx = (idx + btns.length) % btns.length;
        Array.prototype.forEach.call(btns, function (b) { b.classList.remove("focus-visible"); b.setAttribute("tabindex", "-1"); });
        var b = btns[idx]; b.classList.add("focus-visible"); b.setAttribute("tabindex", "0"); reg.focusIndex = idx;
        if (scroll !== false && b.scrollIntoView) { try { b.scrollIntoView({ block: "nearest" }); } catch (e) { } }
    }
    function handleDropdownKeyboard(reg, e) {
        var n = reg.menu.querySelectorAll(".wc-dropdown-option").length;
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!isOpen(reg.dropdown)) openDropdown(reg);
            else focusOption(reg, (reg.focusIndex == null ? reg.select.selectedIndex : reg.focusIndex) + (e.key === "ArrowDown" ? 1 : -1), true);
        }
        else if ((e.key === "Enter" || e.key === " ") && document.activeElement === reg.trigger) {
            e.preventDefault();
            if (isOpen(reg.dropdown)) closeDropdown(reg.dropdown); else openDropdown(reg);
        }
        else if (e.key === "Escape" && isOpen(reg.dropdown)) { e.preventDefault(); e.stopPropagation(); closeDropdown(reg.dropdown); reg.trigger.focus(); }
        else if (e.key === "Tab") closeDropdown(reg.dropdown);
        else if (e.key === "Home" && isOpen(reg.dropdown)) { e.preventDefault(); focusOption(reg, 0, true); }
        else if (e.key === "End" && isOpen(reg.dropdown)) { e.preventDefault(); focusOption(reg, n - 1, true); }
    }
    function getReg(sel) { for (var i = 0; i < regs.length; i++)if (regs[i].select === sel) return regs[i]; return null; }
    function buildForSelect(sel) {
        if (!sel || sel.dataset.wcDropdownBuilt === "true") return null;
        var row = sel.closest(".wc-setting-row");
        var label = (row && row.dataset.title) || sel.getAttribute("aria-label") || "Setting";
        sel.classList.add("wc-native-select-hidden"); sel.setAttribute("tabindex", "-1"); sel.setAttribute("aria-hidden", "true");
        var dd = document.createElement("div"); dd.className = "wc-dropdown";
        var trig = document.createElement("button"); trig.type = "button"; trig.className = "wc-dropdown-trigger";
        trig.setAttribute("aria-haspopup", "listbox"); trig.setAttribute("aria-expanded", "false");
        var val = document.createElement("span"); val.className = "wc-dropdown-value";
        var chev = document.createElement("i"); chev.className = "ri-arrow-down-s-line wc-dropdown-chevron"; chev.setAttribute("aria-hidden", "true");
        trig.appendChild(val); trig.appendChild(chev);
        var menu = document.createElement("div"); menu.className = "wc-dropdown-menu";
        menu.setAttribute("role", "listbox"); menu.setAttribute("aria-label", label); menu.setAttribute("aria-hidden", "true");
        Array.prototype.forEach.call(sel.options, function (opt) {
            var b = document.createElement("button"); b.type = "button"; b.className = "wc-dropdown-option";
            b.setAttribute("role", "option"); b.setAttribute("tabindex", "-1"); b.dataset.value = opt.value;
            var lab = document.createElement("span"); lab.className = "wc-opt-label"; lab.textContent = opt.text;
            var chk = document.createElement("i"); chk.className = "ri-check-line wc-opt-check"; chk.setAttribute("aria-hidden", "true");
            b.appendChild(lab); b.appendChild(chk);
            b.addEventListener("click", function () { var r = getReg(sel); if (r) selectDropdownOption(r, b.dataset.value); });
            b.addEventListener("keydown", function (ev) { var r = getReg(sel); if (r) handleDropdownKeyboard(r, ev); });
            b.addEventListener("mouseenter", function () {
                var r = getReg(sel); if (!r) return;
                var all = Array.prototype.slice.call(r.menu.querySelectorAll(".wc-dropdown-option"));
                r.focusIndex = all.indexOf(b);
                Array.prototype.forEach.call(all, function (x) { x.classList.remove("focus-visible"); });
                b.classList.add("focus-visible");
            });
            menu.appendChild(b);
        });
        dd.appendChild(trig); dd.appendChild(menu); sel.parentNode.insertBefore(dd, sel.nextSibling);
        var reg = { select: sel, dropdown: dd, trigger: trig, menu: menu, valueEl: val, label: label, focusIndex: sel.selectedIndex };
        trig.addEventListener("click", function (ev) {
            ev.stopPropagation();
            if (isOpen(dd)) closeDropdown(dd); else openDropdown(reg);
        });
        trig.addEventListener("keydown", function (ev) { handleDropdownKeyboard(reg, ev); });
        sel.addEventListener("change", function () { syncReg(reg); });
        sel.dataset.wcDropdownBuilt = "true"; regs.push(reg); syncReg(reg); return reg;
    }
    function initializeDropdowns() { document.querySelectorAll("select.wc-select").forEach(function (s) { try { buildForSelect(s); } catch (e) { } }); syncAll(); }
    function syncAll() { regs.forEach(function (r) { syncReg(r); }); }
    /* WaveCraft Settings Category dropdown: custom themed menu replacing
       the native phone popup. Reuses .wc-dropdown visuals + goToSettingsSection. */
    window.WaveCraftCategoryDropdown = (function () {
        var OPEN = "open"; var UP = "open-up";
        var sel = null, dd = null, trig = null, val = null, menu = null, built = false, focusIdx = 0, rebuildKey = null;
        function isOpen() { return dd && dd.classList.contains(OPEN); }
        function close() {
            if (!dd) return; dd.classList.remove(OPEN);
            trig.setAttribute("aria-expanded", "false"); menu.setAttribute("aria-hidden", "true");
        }
        function position() {
            dd.classList.remove(UP);
            var r = dd.getBoundingClientRect(); var approx = Math.min(300, menu.children.length * 50 + 14);
            var needUp = (window.innerHeight - r.bottom) < approx + 16 && r.top > approx + 16;
            if (needUp) dd.classList.add(UP);
            var maxH = needUp ? Math.min(320, Math.max(140, r.top - 90)) : Math.min(320, Math.max(140, window.innerHeight - r.bottom - 90));
            menu.style.maxHeight = maxH + "px";
        }
        function open() {
            if (window.WaveCraftDropdowns && window.WaveCraftDropdowns.closeAllDropdowns) window.WaveCraftDropdowns.closeAllDropdowns();
            rebuildIfNeeded(); position(); dd.classList.add(OPEN); trig.setAttribute("aria-expanded", "true");
            menu.setAttribute("aria-hidden", "false"); focusOpt(sel.selectedIndex, false);
        }
        function labelFor() { var o = sel.options[sel.selectedIndex]; return o ? o.text : ""; }
        function rebuildIfNeeded() {
            if (!sel || !menu) return;
            var cur = Array.prototype.map.call(sel.options, function (o) { return o.value + "|" + o.text; }).join(";");
            if (cur === rebuildKey) return; rebuildKey = cur; menu.innerHTML = "";
            Array.prototype.forEach.call(sel.options, function (opt) { menu.appendChild(makeOption(opt)); }); sync();
        }
        function focusOpt(idx, scroll) {
            var btns = menu.querySelectorAll(".wc-dropdown-option");
            if (!btns.length) return; idx = (idx + btns.length) % btns.length;
            Array.prototype.forEach.call(btns, function (b) { b.classList.remove("focus-visible"); b.setAttribute("tabindex", "-1"); });
            var b = btns[idx]; b.classList.add("focus-visible"); b.setAttribute("tabindex", "0"); focusIdx = idx;
            if (scroll !== false && b.scrollIntoView) { try { b.scrollIntoView({ block: "nearest" }); } catch (e) { } }
        }
        function choose(value) {
            rebuildIfNeeded(); if (sel.value !== value) { sel.value = value; } sync(); close();
            try { trig.focus({ preventScroll: true }); } catch (e) { try { trig.focus(); } catch (_) { } }
            var ev; try { ev = new Event("change", { bubbles: true }); } catch (e) { ev = document.createEvent("HTMLEvents"); ev.initEvent("change", true, false); }
            sel.dispatchEvent(ev);
        }
        function onKey(e) {
            var n = menu.querySelectorAll(".wc-dropdown-option").length;
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                if (!isOpen()) open(); else focusOpt(focusIdx + (e.key === "ArrowDown" ? 1 : -1), true);
            }
            else if ((e.key === "Enter" || e.key === " ") && document.activeElement === trig) { e.preventDefault(); if (isOpen()) close(); else open(); }
            else if (e.key === "Escape" && isOpen()) { e.preventDefault(); e.stopPropagation(); close(); trig.focus(); }
            else if (e.key === "Tab") close();
            else if (e.key === "Home" && isOpen()) { e.preventDefault(); focusOpt(0, true); }
            else if (e.key === "End" && isOpen()) { e.preventDefault(); focusOpt(n - 1, true); }
        }
        function sync() {
            val.textContent = labelFor();
            trig.setAttribute("aria-label", "Settings Category: " + labelFor());
            Array.prototype.forEach.call(menu.querySelectorAll(".wc-dropdown-option"), function (b) {
                b.setAttribute("aria-selected", b.dataset.value === sel.value ? "true" : "false");
            });
        }
        function makeOption(opt) {
            var b = document.createElement("button"); b.type = "button"; b.className = "wc-dropdown-option";
            b.setAttribute("role", "option"); b.setAttribute("tabindex", "-1"); b.dataset.value = opt.value;
            var lab = document.createElement("span"); lab.className = "wc-opt-label"; lab.textContent = opt.text;
            var chk = document.createElement("i"); chk.className = "ri-check-line wc-opt-check"; chk.setAttribute("aria-hidden", "true");
            b.appendChild(lab); b.appendChild(chk);
            b.addEventListener("click", function () { choose(b.dataset.value); });
            b.addEventListener("keydown", function (ev) { onKey(ev); });
            b.addEventListener("mouseenter", function () {
                var all = Array.prototype.slice.call(menu.querySelectorAll(".wc-dropdown-option"));
                focusIdx = all.indexOf(b); Array.prototype.forEach.call(all, function (x) { x.classList.remove("focus-visible"); }); b.classList.add("focus-visible");
            });
            return b;
        }
        function build() {
            if (built) return; sel = document.getElementById("settingsMobileNav"); if (!sel) return;
            sel.classList.add("wc-native-select-hidden"); sel.setAttribute("tabindex", "-1"); sel.setAttribute("aria-hidden", "true");
            dd = document.createElement("div"); dd.className = "wc-dropdown"; dd.id = "settingsCategoryDropdown";
            trig = document.createElement("button"); trig.type = "button"; trig.className = "wc-dropdown-trigger";
            trig.setAttribute("aria-haspopup", "listbox"); trig.setAttribute("aria-expanded", "false");
            trig.setAttribute("aria-labelledby", "settingsCategoryLabel");
            val = document.createElement("span"); val.className = "wc-dropdown-value";
            var chev = document.createElement("i"); chev.className = "ri-arrow-down-s-line wc-dropdown-chevron"; chev.setAttribute("aria-hidden", "true");
            trig.appendChild(val); trig.appendChild(chev);
            menu = document.createElement("div"); menu.className = "wc-dropdown-menu"; menu.id = "settingsCategoryMenu";
            menu.setAttribute("role", "listbox"); menu.setAttribute("aria-label", "Settings Category"); menu.setAttribute("aria-hidden", "true");
            rebuildKey = ""; rebuildIfNeeded();
            dd.appendChild(trig); dd.appendChild(menu); sel.parentNode.insertBefore(dd, sel.nextSibling);
            trig.addEventListener("click", function (ev) { ev.stopPropagation(); if (isOpen()) close(); else open(); });
            trig.addEventListener("keydown", function (ev) { onKey(ev); });
            sel.addEventListener("change", function () { sync(); });
            document.addEventListener("click", function (e) { if (dd && !dd.contains(e.target)) close(); });
            document.addEventListener("keydown", function (e) { if (e.key === "Escape" && isOpen()) close(); });
            window.addEventListener("resize", function () { if (isOpen()) position(); });
            window.addEventListener("scroll", function () { if (isOpen()) position(); }, true);
            built = true; sync();
        }
        if (document.readyState !== "loading") build(); else document.addEventListener("DOMContentLoaded", build);
        return { close: function () { close(); }, syncToSection: function (id) { if (!sel) return; rebuildIfNeeded(); if (sel.value !== id) { sel.value = id; } sync(); }, refresh: function () { built = false; rebuildKey = null; if (dd && dd.parentNode) dd.parentNode.removeChild(dd); dd = null; build(); } };
    })();
    function syncSelect(sel) { var r = getReg(sel); if (r) syncReg(r); }
    document.addEventListener("click", function (e) {
        var inside = false;
        regs.forEach(function (r) { if (r.dropdown.contains(e.target)) inside = true; });
        if (!inside) closeAllDropdowns(null);
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            var any = false;
            regs.forEach(function (r) { if (isOpen(r.dropdown)) { closeDropdown(r.dropdown); any = true; } });
        }
    });
    window.addEventListener("resize", function () { regs.forEach(function (r) { if (isOpen(r.dropdown)) positionDropdown(r); }); });
    window.addEventListener("scroll", function () { regs.forEach(function (r) { if (isOpen(r.dropdown)) positionDropdown(r); }); }, true);
    if (document.readyState !== "loading") initializeDropdowns();
    else document.addEventListener("DOMContentLoaded", initializeDropdowns);
    return {
        initializeDropdowns: initializeDropdowns, openDropdown: openDropdown, closeDropdown: closeDropdown,
        closeAllDropdowns: function () { closeAllDropdowns(null); }, selectDropdownOption: selectDropdownOption,
        handleDropdownKeyboard: handleDropdownKeyboard, positionDropdown: positionDropdown, syncSelect: syncSelect, syncAll: syncAll
    };
})
();




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




