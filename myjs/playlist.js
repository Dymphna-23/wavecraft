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

/* reusable playlist page: reads ?id=, renders hero + song rows */
(function () {
    function r(f) { if (document.readyState !== "loading") f(); else document.addEventListener("DOMContentLoaded", f); }
    r(function () {
        var S = window.WaveCraftStore, P = window.WaveCraftPlayer;
        var id = null; try { id = new URLSearchParams(window.location.search).get("id"); } catch (e) { }
        var host = document.getElementById("wcPlaylistDetailHost") || document.getElementById("mainArea") || document.body;
        var sec = document.createElement("section"); sec.id = "wcPlaylistDetail"; sec.className = "wc-library-section";
        host.insertBefore(sec, host.firstChild);
        function cardSong(card) {
            if (!card) return null; var play = card.querySelector(".play-btn"), like = card.querySelector(".like-btn");
            var src = play || like || card; var t = (src.dataset.title || card.dataset.title || "").trim(), a = (src.dataset.artist || card.dataset.artist || "").trim();
            if (!t) { var hh = card.querySelector("h5,h4,h3"); if (hh) t = hh.textContent.trim(); }
            if (!a) { var pp = card.querySelector("p"); if (pp) a = pp.textContent.trim(); }
            var im = src.dataset.image || ""; if (!im) { var im2 = card.querySelector("img"); if (im2) im = im2.getAttribute("src") || ""; }
            var fl = play ? (play.dataset.song || play.dataset.file || "") : "";
            if (S) return S.normalizeSong({ id: (t || "s") + "__" + (a || "u"), title: t || "Song", artist: a || "Unknown", image: im, file: fl }, 0);
            return { id: t + "__" + a, title: t, artist: a, image: im, file: fl };
        }
        function render() {
            var pl = S ? S.getPlaylistById(id || "") : (id === "liked" ? { id: "liked", name: "Liked Music", description: "Songs you've liked on WaveCraft", songs: [], isLikedPlaylist: true } : null);
            sec.textContent = "";
            var back = document.createElement("a"); back.href = "library.html"; back.className = "wc-view-all"; back.textContent = "← Back to Library"; sec.appendChild(back);
            if (!pl) {
                var h = document.createElement("h2"); h.textContent = "Playlist not found"; sec.appendChild(h);
                var p = document.createElement("p"); p.textContent = "It may have been deleted. Create a new one from the Library."; sec.appendChild(p); return;
            }
            document.title = (pl.name || "Playlist") + " | WaveCraft";
            var songs = pl.songs || [];
            var dur = S ? S.totalDuration(songs).label : "";
            var hero = document.createElement("div"); hero.className = "wc-pl-hero" + (pl.isLikedPlaylist ? " liked" : "");
            var cover = document.createElement("div"); cover.className = "wc-pl-cover" + (pl.isLikedPlaylist ? " liked-cover" : "");
            if (pl.isLikedPlaylist) { var hi = document.createElement("i"); hi.className = "ri-heart-fill wc-pl-cover-fallback"; cover.appendChild(hi); }
            else {
                var cv = S ? S.playlistCover(pl) : ""; if (cv) { var im = document.createElement("img"); im.src = cv; im.alt = pl.name + " cover"; cover.appendChild(im); }
                else { var fb = document.createElement("span"); fb.className = "wc-pl-cover-fallback"; fb.textContent = (pl.name || "W").charAt(0).toUpperCase(); cover.appendChild(fb); }
            }
            hero.appendChild(cover);
            var info = document.createElement("div"); info.className = "wc-pl-info";
            var ey = document.createElement("span"); ey.className = "wc-pl-eyebrow"; ey.textContent = pl.isLikedPlaylist ? "LIKED COLLECTION" : "PLAYLIST"; info.appendChild(ey);
            var tt = document.createElement("h1"); tt.className = "wc-pl-title"; tt.textContent = pl.name; info.appendChild(tt);
            var dd = document.createElement("p"); dd.className = "wc-pl-desc"; dd.textContent = pl.description || "No description."; info.appendChild(dd);
            var mt = document.createElement("div"); mt.className = "wc-pl-meta";
            mt.innerHTML = "<strong></strong><span></span><span></span>";
            mt.querySelector("strong").textContent = "WaveCraft";
            var spans = mt.querySelectorAll("span");
            spans[0].textContent = "• " + songs.length + " song" + (songs.length === 1 ? "" : "s");
            spans[1].textContent = dur ? ("• " + dur) : "";
            info.appendChild(mt); hero.appendChild(info); sec.appendChild(hero);
            var acts = document.createElement("div"); acts.className = "wc-pl-actions";
            var play = document.createElement("button"); play.type = "button"; play.className = "wc-btn-play";
            play.setAttribute("aria-label", "Play " + pl.name); play.innerHTML = '<i class="ri-play-fill"></i> Play';
            play.addEventListener("click", function () { window.wcPlayList(songs, 0); });
            var sh = document.createElement("button"); sh.type = "button"; sh.className = "wc-btn-ghost";
            sh.setAttribute("aria-label", "Shuffle " + pl.name); sh.innerHTML = '<i class="ri-shuffle-line"></i> Shuffle';
            sh.addEventListener("click", function () { var q = songs.slice().sort(function () { return Math.random() - 0.5; }); window.wcPlayList(q, 0); });
            acts.appendChild(play); acts.appendChild(sh);
            if (!pl.isLikedPlaylist) {
                var more = document.createElement("button"); more.type = "button"; more.className = "wc-icon-btn";
                more.setAttribute("aria-label", "More options for " + pl.name); more.innerHTML = '<i class="ri-more-2-fill"></i>';
                more.addEventListener("click", function (e) {
                    if (!S) return;
                    window.wcShowMenu(e.clientX || 80, e.clientY || 120, [
                        { head: pl.name },
                        { icon: "ri-play-line", label: "Play", onClick: function () { window.wcPlayList(songs, 0); } },
                        {
                            icon: "ri-edit-line", label: "Rename", onClick: function () {
                                var n = prompt("Playlist name:", pl.name); if (n === null) return;
                                var d = prompt("Description:", pl.description || ""); if (d === null) d = pl.description; S.renamePlaylist(pl.id, n, d); render();
                            }
                        },
                        {
                            icon: "ri-delete-bin-line", label: "Delete playlist", danger: true, onClick: function () {
                                if (confirm("Delete '" + pl.name + "'?")) { S.deletePlaylist(pl.id); window.location.href = "library.html"; }
                            }
                        }]);
                });
                acts.appendChild(more);
            }
            sec.appendChild(acts);
            var head = document.createElement("div"); head.className = "wc-song-head"; head.setAttribute("aria-hidden", "true");
            ["#", "Title", "Album", "Time", "", ""].forEach(function (t) { var s = document.createElement("span"); s.textContent = t; head.appendChild(s); });
            sec.appendChild(head);
            var wrap = document.createElement("div"); wrap.setAttribute("role", "list"); wrap.style.display = "flex"; wrap.style.flexDirection = "column"; wrap.style.gap = "4px";
            if (!songs.length) {
                var em = document.createElement("div"); em.className = "wc-empty";
                em.textContent = pl.isLikedPlaylist ? "Songs you like will appear here. Tap the heart on any song." : "No songs in this playlist yet. Use Add to Playlist from any song."; wrap.appendChild(em);
            }
            songs.forEach(function (song, idx) {
                var row = document.createElement("div"); row.className = "wc-song-row"; row.setAttribute("role", "listitem"); row.tabIndex = 0;
                row.setAttribute("aria-label", "Play " + song.title + " by " + song.artist);
                var num = document.createElement("span"); num.className = "wc-song-num"; num.textContent = idx + 1; row.appendChild(num);
                var art = document.createElement("img"); art.className = "wc-song-art"; art.src = song.image || song.cover || "img/nav-logo-removebg-preview (1).png"; art.alt = ""; art.loading = "lazy"; row.appendChild(art);
                var main = document.createElement("div"); main.style.minWidth = "0";
                var t = document.createElement("p"); t.className = "wc-song-title"; t.textContent = song.title;
                var a = document.createElement("p"); a.className = "wc-song-artist"; a.textContent = song.artist;
                main.appendChild(t); main.appendChild(a); row.appendChild(main);
                var alb = document.createElement("span"); alb.className = "wc-song-album"; alb.textContent = song.album || "—"; row.appendChild(alb);
                var like = document.createElement("button"); like.type = "button"; like.className = "wc-like-btn" + (S && S.isLiked(song.id) ? " liked" : "");
                like.setAttribute("aria-label", "Like " + song.title); like.innerHTML = '<i class="' + (S && S.isLiked(song.id) ? "ri-heart-fill" : "ri-heart-line") + '"></i>';
                like.addEventListener("click", function (e) {
                    e.stopPropagation(); if (!S) return;
                    var res = S.toggleLike(song); like.classList.toggle("liked", res.liked); like.classList.add("pop");
                    setTimeout(function () { like.classList.remove("pop"); }, 380);
                    var ic = like.querySelector("i"); if (ic) ic.className = res.liked ? "ri-heart-fill" : "ri-heart-line";
                    window.wcToast(res.liked ? "Added to Liked Music" : "Removed from Liked Music");
                    if (pl.isLikedPlaylist) render();
                });
                row.appendChild(like);
                var more = document.createElement("button"); more.type = "button"; more.className = "wc-more-btn";
                more.setAttribute("aria-label", "More options for " + song.title); more.innerHTML = '<i class="ri-more-2-fill"></i>';
                more.addEventListener("click", function (e) { e.stopPropagation(); window.wcSongMenu(song, e, { playlistId: pl.id, isLiked: !!pl.isLikedPlaylist, after: render }); });
                row.appendChild(more);
                function go() {
                    window.wcPlayList(songs, idx);
                    try { wrap.querySelectorAll(".wc-song-row").forEach(function (x) { x.classList.remove("playing"); }); } catch (x) { } row.classList.add("playing");
                }
                row.addEventListener("click", function (e) { if (e.target.closest("button")) return; go(); });
                row.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
                wrap.appendChild(row);
            });
            sec.appendChild(wrap);
        }
        render();
        window.addEventListener("storage", function (e) { if (!e.key || e.key.indexOf("wavecraft") === 0) setTimeout(render, 60); });
    });
})();

/* cover upload field for create modal + song options menu */
(function () {
    function r(f) { if (document.readyState !== "loading") f(); else document.addEventListener("DOMContentLoaded", f); }
    r(function () {
        var S = window.WaveCraftStore, P = window.WaveCraftPlayer;
        window.wcSongMenu = function (song, e, opts) {
            opts = opts || {};
            var items = [{ head: (song.title || "Song") + " • " + (song.artist || "") }];
            var liked = S && S.isLiked(song.id);
            items.push({
                icon: liked ? "ri-heart-fill" : "ri-heart-line", label: liked ? "Remove from Liked Music" : "Add to Liked Music", onClick: function () {
                    if (!S) return; var res = S.toggleLike(song);
                    window.wcToast(res.liked ? "Added to Liked Music" : "Removed from Liked Music"); if (opts.after) opts.after();
                }
            });
            items.push({ icon: "ri-play-list-add-line", label: "Add to Playlist", onClick: function () { window.wcOpenAdd(song, opts.after); } });
            items.push({ icon: "ri-add-line", label: "Create Playlist", onClick: function () { window.wcOpenCreate(song, opts.after); } });
            items.push({ sep: true });
            items.push({
                icon: "ri-skip-forward-line", label: "Play Next", onClick: function () {
                    if (P && P.playNext) { P.playNext(window.wcToPlayer(song).q); window.wcToast("Will play next"); }
                }
            });
            items.push({
                icon: "ri-list-check-2", label: "Add to Queue", onClick: function () {
                    if (P && P.addToQueue) { P.addToQueue(window.wcToPlayer(song).q); window.wcToast("Added to queue"); }
                }
            });
            if (opts.playlistId && !opts.isLiked) {
                items.push({ sep: true });
                items.push({
                    icon: "ri-delete-bin-line", label: "Remove from this playlist", danger: true, onClick: function () {
                        if (S) { S.removeSongFromPlaylist(opts.playlistId, song.id); window.wcToast("Removed from playlist"); if (opts.after) opts.after(); }
                    }
                });
            }
            window.wcShowMenu(e.clientX || 80, e.clientY || 120, items);
        };
    });
})();


/* add-to-playlist + create-playlist modals */
(function () {
    function r(f) { if (document.readyState !== "loading") f(); else document.addEventListener("DOMContentLoaded", f); }
    r(function () {
        var S = window.WaveCraftStore;
        window.wcOpenAdd = function (song, after) {
            if (!S) return; var o = window.wcOverlay("wcAddOverlay"); o.textContent = "";
            var md = document.createElement("div"); md.className = "wc-modal"; md.setAttribute("role", "dialog"); md.setAttribute("aria-modal", "true");
            md.setAttribute("aria-label", "Add to playlist");
            var x = document.createElement("button"); x.className = "wc-modal-close"; x.setAttribute("aria-label", "Close");
            x.innerHTML = '<i class="ri-close-line"></i>';
            x.addEventListener("click", function () { o.classList.remove("show"); }); md.appendChild(x);
            var h = document.createElement("h2"); h.textContent = "Add to playlist"; md.appendChild(h);
            var sub = document.createElement("p"); sub.className = "wc-modal-sub";
            sub.textContent = (song.title || "Song") + " • " + (song.artist || ""); md.appendChild(sub);
            var list = document.createElement("div"); list.className = "wc-add-list";
            var liked = document.createElement("button"); liked.type = "button"; liked.className = "wc-add-item";
            liked.innerHTML = '<img alt="Liked Music"><div><p class="t">Liked Music</p><p class="s"></p></div>';
            liked.querySelector("img").src = "img/liked.jpeg";
            liked.querySelector(".s").textContent = S.getLikedSongs().length + " songs";
            liked.addEventListener("click", function () {
                var res = S.toggleLike(song);
                window.wcToast(res.liked ? "Added to Liked Music" : "Removed from Liked Music");
                o.classList.remove("show"); if (after) after();
            });
            list.appendChild(liked);
            S.getPlaylists().forEach(function (pl) {
                var b = document.createElement("button"); b.type = "button"; b.className = "wc-add-item";
                var im = document.createElement("img"); im.src = S.playlistCover(pl); im.alt = ""; b.appendChild(im);
                var tx = document.createElement("div"); var t1 = document.createElement("p"); t1.className = "t"; t1.textContent = pl.name;
                var t2 = document.createElement("p"); t2.className = "s"; t2.textContent = (pl.songs || []).length + " songs";
                tx.appendChild(t1); tx.appendChild(t2); b.appendChild(tx);
                b.addEventListener("click", function () {
                    var res = S.addSongToPlaylist(pl.id, song);
                    window.wcToast(res.status === "added" ? ("Added to " + pl.name) : ("Already in " + pl.name));
                    o.classList.remove("show"); if (after) after();
                }); list.appendChild(b);
            });
            md.appendChild(list);
            var acts = document.createElement("div"); acts.className = "wc-modal-actions";
            var nb = document.createElement("button"); nb.type = "button"; nb.className = "wc-btn-create"; nb.textContent = "+ New playlist";
            nb.addEventListener("click", function () { o.classList.remove("show"); window.wcOpenCreate(song, after); });
            acts.appendChild(nb); md.appendChild(acts); o.appendChild(md); o.classList.add("show");
            o.addEventListener("click", function (e) { if (e.target === o) o.classList.remove("show"); });
        };

        window.wcOpenCreate = function (preset, after) {
            if (!S) return; var o = window.wcOverlay("wcCreateOverlay"); o.textContent = "";
            var md = document.createElement("div"); md.className = "wc-modal"; md.setAttribute("role", "dialog"); md.setAttribute("aria-modal", "true");
            md.setAttribute("aria-label", "Create playlist");
            var x = document.createElement("button"); x.className = "wc-modal-close"; x.setAttribute("aria-label", "Close");
            x.innerHTML = '<i class="ri-close-line"></i>';
            x.addEventListener("click", function () { o.classList.remove("show"); }); md.appendChild(x);
            var lb = document.createElement("span"); lb.className = "wc-pl-eyebrow"; lb.textContent = "WAVECRAFT COLLECTION"; md.appendChild(lb);
            var h = document.createElement("h2"); h.textContent = "Create Playlist"; md.appendChild(h);
            var sub = document.createElement("p"); sub.className = "wc-modal-sub";
            sub.textContent = "Create a collection for your favorite sounds."; md.appendChild(sub);
            var f = document.createElement("form");
            function fld(l, t) {
                var w = document.createElement("div"); w.className = "wc-field"; var lab = document.createElement("label"); lab.textContent = l; w.appendChild(lab);
                var i = t === "area" ? document.createElement("textarea") : document.createElement("input"); if (t !== "area") i.type = t; w.appendChild(i); f.appendChild(w); return i;
            }
            var nm = fld("Playlist Name", "text"); nm.placeholder = "My Playlist"; nm.maxLength = 50; nm.required = true;
            var ds = fld("Description", "area"); ds.placeholder = "What's this playlist about?"; ds.maxLength = 150;
            var acts = document.createElement("div"); acts.className = "wc-modal-actions";
            var c = document.createElement("button"); c.type = "button"; c.className = "wc-btn-cancel"; c.textContent = "Cancel";
            c.addEventListener("click", function () { o.classList.remove("show"); });
            var s = document.createElement("button"); s.type = "submit"; s.className = "wc-btn-create"; s.textContent = "Create Playlist";
            acts.appendChild(c); acts.appendChild(s); f.appendChild(acts); md.appendChild(f); o.appendChild(md); o.classList.add("show");
            setTimeout(function () { nm.focus(); }, 60);
            o.addEventListener("click", function (e) { if (e.target === o) o.classList.remove("show"); });
            f.addEventListener("submit", function (e) {
                e.preventDefault(); var v = nm.value.trim(); if (!v) { nm.focus(); return; }
                var pl = S.createPlaylist(v, ds.value.trim(), preset || null);
                var fi = document.createElement("input"); void fi;
                o.classList.remove("show");
                window.wcToast(preset ? ("Created " + pl.name + " - song added") : ("Created " + pl.name));
                if (after) after();
            });
        };
    });
})();


// cover upload injection into create modal whenever it opens
var obs = new MutationObserver(function () {
    var o = document.getElementById("wcCreateOverlay"); if (!o || !o.classList.contains("show")) return;
    var form = o.querySelector("form"); if (!form || form.dataset.wcCover) return; form.dataset.wcCover = "1";
    var w = document.createElement("div"); w.className = "wc-field";
    var lab = document.createElement("label"); lab.textContent = "Playlist Cover"; w.appendChild(lab);
    var pick = document.createElement("div"); pick.className = "wc-cover-pick";
    var prev = document.createElement("img"); prev.className = "wc-cover-preview";
    prev.src = "img/nav-logo-removebg-preview (1).png"; prev.alt = "Playlist cover preview";
    var file = document.createElement("input"); file.type = "file"; file.accept = "image/*";
    file.setAttribute("aria-label", "Upload playlist cover");
    file.style.cssText = "font-size:12px;max-width:220px";
    var url = ""; file.addEventListener("change", function () {
        var fl = file.files && file.files[0]; if (!fl) return;
        if (fl.size > 1500000) { if (window.wcToast) window.wcToast("Image too large (max 1.5MB)"); file.value = ""; return; }
        var rd = new FileReader(); rd.onload = function () { url = String(rd.result || ""); prev.src = url; }; rd.readAsDataURL(fl);
    });
    pick.appendChild(prev); pick.appendChild(file); w.appendChild(pick);
    var acts = form.querySelector(".wc-modal-actions"); form.insertBefore(w, acts);
    form.addEventListener("submit", function () {
        if (!url) return; try {
            var raw = localStorage.getItem("wavecraftPlaylists"); var pls = raw ? JSON.parse(raw) : [];
            if (pls.length) { pls[0].artwork = url; localStorage.setItem("wavecraftPlaylists", JSON.stringify(pls)); }
        } catch (e) { }
    }, true);
});
obs.observe(document.body, {
    childList: true, subtree: true, attributes: true, attributeFilter:
        ["class"]
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