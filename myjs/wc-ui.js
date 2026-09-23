/* shared toast + play helpers */
(function () {
    function r(f) { if (document.readyState !== "loading") f(); else document.addEventListener("DOMContentLoaded", f); }
    r(function () {
        var S = window.WaveCraftStore, P = window.WaveCraftPlayer, tEl = null;
        function toast(m) {
            if (!tEl) {
                tEl = document.createElement("div"); tEl.className = "wc-toast"; tEl.id = "wcToast";
                tEl.innerHTML = '<i class="ri-check-line"></i><span></span>'; document.body.appendChild(tEl);
            }
            tEl.querySelector("span").textContent = m; tEl.classList.add("show");
            clearTimeout(window.__wcToastT); window.__wcToastT = setTimeout(function () { tEl.classList.remove("show"); }, 2400);
        }
        window.wcToast = toast;
        window.wcToPlayer = function (s) {
            if (!s) return { q: null, norm: null }; var f = s.file || s.song || s.audio || "";
            if (!f) return { q: null, norm: null }; var n = S ? S.normalizeSong(s, 0) : s;
            return { q: { file: f, title: s.title || "Unknown", artist: s.artist || "Unknown", image: s.image || s.cover || "", album: s.album || "" }, norm: n };
        };
        window.wcPlayList = function (songs, idx) {
            if (!P) { toast("Player unavailable"); return; }
            var q = (songs || []).map(function (s) { return window.wcToPlayer(s).q; }).filter(Boolean);
            if (!q.length) { toast("No playable songs"); return; }
            P.play(q[Math.max(0, idx || 0)], q, Math.max(0, idx || 0), true);
        };
        window.wcCtxMenu = function () {
            var m = document.getElementById("wcSongMenu"); if (m) return m;
            m = document.createElement("div"); m.id = "wcSongMenu"; m.className = "wc-ctx"; m.setAttribute("role", "menu");
            document.body.appendChild(m);
            document.addEventListener("click", function (e) { if (m.classList.contains("show") && !m.contains(e.target)) m.classList.remove("show"); });
            document.addEventListener("keydown", function (e) { if (e.key === "Escape") m.classList.remove("show"); }); return m;
        };
        window.wcShowMenu = function (x, y, items) {
            var m = window.wcCtxMenu(); m.textContent = "";
            items.forEach(function (it) {
                if (it.sep) { var d = document.createElement("div"); d.className = "wc-ctx-sep"; m.appendChild(d); return; }
                if (it.head) { var h = document.createElement("div"); h.className = "wc-ctx-head"; h.textContent = it.head; m.appendChild(h); return; }
                var b = document.createElement("button"); b.type = "button"; if (it.danger) b.className = "danger";
                b.setAttribute("role", "menuitem"); var ic = document.createElement("i"); ic.className = it.icon; var sp = document.createElement("span"); sp.textContent = it.label;
                b.appendChild(ic); b.appendChild(sp);
                b.addEventListener("click", function () { m.classList.remove("show"); it.onClick(); }); m.appendChild(b);
            });
            m.classList.add("show"); var w = m.offsetWidth || 240, h = m.offsetHeight || 300;
            m.style.left = Math.max(8, Math.min(x, window.innerWidth - w - 8)) + "px";
            m.style.top = Math.max(8, Math.min(y, window.innerHeight - h - 8)) + "px";
        };
        window.wcOverlay = function (id) {
            var o = document.getElementById(id); if (o) return o;
            o = document.createElement("div"); o.id = id; o.className = "wc-overlay"; document.body.appendChild(o); return o;
        };
    });
})();
