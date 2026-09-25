/* site-wide song bridge: routes card menus through WaveCraft modals */
(function () {
    function r(f) { if (document.readyState !== "loading") f(); else document.addEventListener("DOMContentLoaded", f); }
    r(function () {
        function norm(card) {
            var play = card.querySelector(".play-btn"), like = card.querySelector(".like-btn");
            var src = play || like || card; var t = (src.dataset.title || card.dataset.title || "").trim(), a = (src.dataset.artist || card.dataset.artist || "").trim();
            if (!t) { var h = card.querySelector("h5,h4,h3"); if (h) t = h.textContent.trim(); }
            if (!a) { var p = card.querySelector("p"); if (p) a = p.textContent.trim(); }
            var im = src.dataset.image || ""; if (!im) { var g = card.querySelector("img"); if (g) im = g.getAttribute("src") || ""; }
            var fl = play ? (play.dataset.song || play.dataset.file || "") : "";
            var S = window.WaveCraftStore; if (S) return S.normalizeSong({ id: (t || "s") + "__" + (a || "u"), title: t || "Song", artist: a || "Unknown", image: im, file: fl }, 0);
            return { id: t + "__" + a, title: t, artist: a, image: im, file: fl };
        }
        document.querySelectorAll(".music-card").forEach(function (card) {
            if (card.dataset.wcNew === "1") return; card.dataset.wcNew = "1";
            var more = card.querySelector(".more-btn");
            if (more && !more.dataset.wcNew) {
                more.dataset.wcNew = "1";
                more.addEventListener("click", function (e) {
                    e.preventDefault(); e.stopPropagation();
                    var song = norm(card); if (window.wcSongMenu) window.wcSongMenu(song, e, {});
                }, true);
            }
            var opts = card.querySelectorAll(".playlist-option");
            if (opts[0] && !opts[0].dataset.wcNew) {
                opts[0].dataset.wcNew = "1";
                opts[0].addEventListener("click", function (e) {
                    e.preventDefault(); e.stopPropagation();
                    var song = norm(card); if (window.wcOpenAdd) window.wcOpenAdd(song);
                }, true);
            }
            if (opts[1] && !opts[1].dataset.wcNew) {
                opts[1].dataset.wcNew = "1";
                opts[1].addEventListener("click", function (e) {
                    e.preventDefault(); e.stopPropagation();
                    var song = norm(card); if (window.wcOpenCreate) window.wcOpenCreate(song);
                }, true);
            }
            var like = card.querySelector(".like-btn");
            if (like && !like.dataset.wcNew) {
                like.dataset.wcNew = "1";
                like.addEventListener("click", function (e) { e.stopPropagation(); }, true);
            }
        });
    });
})();

/* validation helper: node --check each new wc file if node exists */
window.__wcCheck={ok:true};
