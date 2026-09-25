/* sidebar + theme + create + mobile nav for the playlist page */
(function () {
    function r(f) { if (document.readyState !== "loading") f(); else document.addEventListener("DOMContentLoaded", f); }
    r(function () {
        var S = window.WaveCraftStore;
        function esc(v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]; }); }
        try {
            var th = localStorage.getItem("wavecraftTheme") || "dark";
            document.body.classList.toggle("light", th === "light");
            var ti = document.querySelector("#themeBtn i"); if (ti) ti.className = th === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
        } catch (e) { }
        var tb = document.getElementById("themeBtn");
        if (tb && !tb.dataset.wcB) {
            tb.dataset.wcB = "1"; tb.addEventListener("click", function () {
                document.body.classList.toggle("light"); var l = document.body.classList.contains("light");
                try { localStorage.setItem("wavecraftTheme", l ? "light" : "dark"); } catch (e) { }
                var ic = tb.querySelector("i"); if (ic) ic.className = l ? "fa-solid fa-sun" : "fa-solid fa-moon";
            });
        }
        var sb = document.getElementById("sidebar"), mb = document.getElementById("menuBtn"), nv = document.querySelector("nav");
        function sync() {
            if (!sb || !nv) return; var closed = sb.classList.contains("close");
            if (window.innerWidth <= 767) { nv.classList.remove("nav-with-logo"); return; }
            nv.classList.toggle("nav-with-logo", closed);
        }
        if (mb && sb && !mb.dataset.wcB) { mb.dataset.wcB = "1"; mb.addEventListener("click", function () { sb.classList.toggle("close"); sync(); }); }
        window.addEventListener("resize", sync); sync();
        function sidebar() {
            var box = document.getElementById("sidebarPlaylistList"); if (!box || !S) return; box.textContent = "";
            S.getPlaylists().forEach(function (p) {
                var a = document.createElement("a"); a.href = "playlist.html?id=" + encodeURIComponent(p.id);
                var im = document.createElement("img"); im.src = S.playlistCover(p); im.alt = ""; a.appendChild(im);
                var h = document.createElement("h4"); h.textContent = p.name; a.appendChild(h); box.appendChild(a);
            });
        }
        sidebar(); window.addEventListener("storage", function () { setTimeout(sidebar, 60); });
        var cb = document.getElementById("sidebarCreateBtn");
        if (cb && !cb.dataset.wcB) {
            cb.dataset.wcB = "1"; cb.addEventListener("click", function () {
                if (window.wcOpenCreate) window.wcOpenCreate(null, function () { sidebar(); });
            });
        }
    });
})();


/* plus shell safety */
(function () {
    function show() { var m = document.getElementById("main-content"); if (m) 
        { try { if (getComputedStyle(m).display === "none") m.style.display = "block"; } 
        catch (e) { m.style.display = "block"; } } }
    if (document.readyState !== "loading") setTimeout(show, 2500);
    else document.addEventListener("DOMContentLoaded", function () { setTimeout(show, 2500); });
})();