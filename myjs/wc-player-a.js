/* player plus part 1: extra buttons + queue panel styles */
(function () {
    function r(f) { if (document.readyState !== "loading") f(); else document.addEventListener("DOMContentLoaded", f); }
    r(function () {
        var P = window.WaveCraftPlayer, S = window.WaveCraftStore, pl = document.getElementById("musicPlayer");
        if (!P || !pl) return;
        var st0 = document.createElement("style");
        st0.textContent = ".extra-btn{font-size:17px;opacity:.75}.extra-btn:hover{opacity:1;color:#ff4545}.extra-btn.active{color:#ff1f1f;opacity:1}#playerLikeBtn.liked{color:#ff1f1f;opacity:1}.wc-queue-panel{position:fixed;right:16px;bottom:110px;z-index:12500;width:320px;max-height:50vh;overflow:auto;background:#141414;border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:10px;display:none}.wc-queue-panel.show{display:block}body.light .wc-queue-panel{background:#fff;color:#111}.wc-queue-panel button.qrow{display:flex;gap:10px;align-items:center;width:100%;background:transparent;border:none;color:inherit;padding:8px;border-radius:8px;cursor:pointer;text-align:left}.wc-queue-panel button.qrow:hover{background:rgba(128,128,128,.18)}.wc-queue-panel img{width:40px;height:40px;border-radius:8px;object-fit:cover}@media(max-width:767px){.wc-queue-panel{left:12px;right:12px;width:auto;bottom:150px}}";
        document.head.appendChild(st0);
        window.__wcExtra = { shuffle: false, repeat: "off" };
        try { var s = P.getState() || {}; window.__wcExtra.shuffle = !!s.shuffle; window.__wcExtra.repeat = s.repeat || "off"; } catch (e) { }
        function btn(id, label, icon) {
            if (document.getElementById(id)) return document.getElementById(id);
            var b = document.createElement("button"); b.type = "button"; b.id = id; b.className = "extra-btn";
            b.setAttribute("aria-label", label); b.title = label; b.innerHTML = '<i class="' + icon + '"></i>'; return b;
        }
        var c = pl.querySelector(".player-controls");
        if (c) {
            var sh = btn("shuffleBtn", "Shuffle", "ri-shuffle-line"), lk = btn("playerLikeBtn", "Like this song", "ri-heart-line"), rp = btn("repeatBtn", "Repeat", "ri-repeat-2-fill"), qb = btn("queueBtn", "Queue", "ri-list-check-2");
            c.insertBefore(sh, c.firstChild); c.appendChild(lk); c.appendChild(rp); c.appendChild(qb);
            window.__wcPB = { sh: sh, lk: lk, rp: rp, qb: qb };
        }
    });
})();

/* player plus part 2: behavior for shuffle/repeat/like/queue/playNext */
(function () {
    function r(f) { if (document.readyState !== "loading") f(); else document.addEventListener("DOMContentLoaded", f); }
    r(function () {
        var P = window.WaveCraftPlayer, S = window.WaveCraftStore;
        var pl = document.getElementById("musicPlayer"); if (!P || !pl) return;
        function toSong(s) {
            if (!s) return null; var f = s.file || s.song || s.audio || ""; if (!f) return null;
            return { file: f, title: s.title || "Unknown Song", artist: s.artist || "Unknown Artist", image: s.image || s.cover || "", album: s.album || "" };
        }
        function ex() { return window.__wcExtra || (window.__wcExtra = { shuffle: false, repeat: "off" }); }
        function pb() { return window.__wcPB || {}; }
        function paintSh() { var b = pb().sh; if (!b) return; b.classList.toggle("active", ex().shuffle); b.setAttribute("aria-pressed", ex().shuffle ? "true" : "false"); }
        function paintRp() {
            var b = pb().rp; if (!b) return; b.classList.toggle("active", ex().repeat !== "off");
            var ic = b.querySelector("i"); if (ic) ic.className = ex().repeat === "one" ? "ri-repeat-one-fill" : "ri-repeat-2-fill"; b.title = "Repeat: " + ex().repeat;
        }
        function paintLike() {
            var b = pb().lk; if (!b || !S) return; var cur = null; try { cur = (P.getState() || {}).currentSong; } catch (e) { }
            var on = cur && S.getLikedSongs().some(function (s) { return s.file === cur.file || String(s.id) === String(cur.title + "__" + cur.artist); });
            b.classList.toggle("liked", !!on); var ic = b.querySelector("i"); if (ic) ic.className = on ? "ri-heart-fill" : "ri-heart-line";
        }
        var B = pb();
        if (B.sh) B.sh.addEventListener("click", function (e) { e.stopPropagation(); ex().shuffle = !ex().shuffle; paintSh(); });
        if (B.rp) B.rp.addEventListener("click", function (e) { e.stopPropagation(); var v = ex().repeat; ex().repeat = v === "off" ? "all" : v === "all" ? "one" : "off"; paintRp(); });
        if (B.lk) B.lk.addEventListener("click", function (e) {
            e.stopPropagation(); if (!S) return;
            var cur = null; try { cur = (P.getState() || {}).currentSong; } catch (x) { } if (!cur) return;
            var nm = S.normalizeSong({ id: cur.title + "__" + cur.artist, title: cur.title, artist: cur.artist, image: cur.image, file: cur.file }, 0);
            var res = S.toggleLike(nm); paintLike(); if (window.wcToast) window.wcToast(res.liked ? "Added to Liked Music" : "Removed from Liked Music");
        });
        var panel = document.createElement("div"); panel.className = "wc-queue-panel"; panel.id = "wcQueuePanel";
        panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "Play queue"); document.body.appendChild(panel);
        if (B.qb) B.qb.addEventListener("click", function (e) {
            e.stopPropagation();
            var stt = P.getState() || {}, q = stt.queue || []; panel.textContent = "";
            var h = document.createElement("div"); h.style.cssText = "font-size:11px;letter-spacing:1px;opacity:.6;padding:6px 8px";
            h.textContent = "UP NEXT (" + q.length + ")"; panel.appendChild(h);
            if (!q.length) { var em = document.createElement("div"); em.style.padding = "10px"; em.textContent = "Queue is empty."; panel.appendChild(em); }
            q.forEach(function (sg, i) {
                var b = document.createElement("button"); b.type = "button"; b.className = "qrow";
                var im = document.createElement("img"); im.src = sg.image || "img/nav-logo-removebg-preview (1).png"; im.alt = "";
                var tx = document.createElement("span"); var st2 = document.createElement("strong"); st2.textContent = (i === stt.currentIndex ? "▶ " : "") + sg.title;
                var sm = document.createElement("small"); sm.textContent = sg.artist; tx.appendChild(st2); tx.appendChild(document.createElement("br")); tx.appendChild(sm);
                b.appendChild(im); b.appendChild(tx);
                b.addEventListener("click", function () { P.play(sg, q, i, true); panel.classList.remove("show"); }); panel.appendChild(b);
            });
            panel.classList.toggle("show");
        });
        document.addEventListener("click", function (e) { var q = pb().qb; if (panel.classList.contains("show") && !panel.contains(e.target) && (!q || !q.contains(e.target))) panel.classList.remove("show"); });
        P.isShuffled = function () { return ex().shuffle; }; P.getRepeat = function () { return ex().repeat; };
        P.playNext = function (song) {
            var q = toSong(song); if (!q) return; var stt = P.getState() || {}, qu = (stt.queue || []).slice();
            var idx = Number.isInteger(stt.currentIndex) ? stt.currentIndex : 0; qu.splice(idx + 1, 0, q);
            try { P.play(qu[idx + 1], qu, idx + 1, true); } catch (e) { }
        };
        P.addToQueue = function (song) {
            var q = toSong(song); if (!q) return 0; var stt = P.getState() || {}, qu = (stt.queue || []).slice(); qu.push(q);
            if (!stt.currentSong) P.play(q, qu, 0, true); else P.play(stt.currentSong, qu, stt.currentIndex, false); return qu.length;
        };
        if (P.subscribe) P.subscribe(function () { paintLike(); });
        paintSh(); paintRp(); paintLike();
        window.addEventListener("storage", function () { setTimeout(paintLike, 60); });
    });
})();
