/* part 2: store helpers — liked playlist, remove, artwork, durations */
(function () {
    var S = window.WaveCraftStore; if (!S || S.__aug2) return; S.__aug2 = true;
    function slug(t) { return String(t || "playlist").toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "playlist"; }
    function toSec(v) { if (typeof v === "number" && isFinite(v)) return Math.round(v); var p = String(v || "").split(":").map(function (x) { return parseInt(x, 10); }); if (!p.length || p.some(function (n) { return isNaN(n); })) return 0; if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2]; return p[0] * 60 + (p[1] || 0); }
    function toLabel(t) { t = Math.max(0, Math.round(Number(t) || 0)); var h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60; function pd(n) { return String(n).padStart(2, "0"); } return h > 0 ? h + ":" + pd(m) + ":" + pd(s) : m + ":" + pd(s); }
    S.getPlaylistById = function (id) {
        if (String(id) === "liked" || String(id) === "liked-music") return { id: "liked", name: "Liked Music", description: "Songs you've liked on WaveCraft", songs: S.getLikedSongs(), createdAt: 0, artwork: "", isLikedPlaylist: true };
        var list = S.getPlaylists(), out = null;
        list.forEach(function (p) { (p.songs || []).forEach(function (s, i) { if (typeof s === "string" && S.__seedById) { var f = S.__seedById(s); if (f) p.songs[i] = f; } }); if (String(p.id) === String(id)) out = p; });
        return out;
    };
    S.createPlaylist = function (name, desc, firstSong) {
        var pls = S.getPlaylists(), base = slug(name), id = base, n = 2;
        while (pls.some(function (p) { return String(p.id) === String(id); }) || id === "liked") id = base + "-" + (n++);
        var pl = { id: id, name: String(name || "My Playlist").trim() || "My Playlist", description: String(desc || "").trim(), songs: [], createdAt: Date.now(), artwork: "" };
        if (firstSong) { var nm = S.normalizeSong(firstSong, 0); if (nm) pl.songs.unshift(nm); }
        pls.unshift(pl); S.savePlaylists(pls); return pl;
    };
    S.removeSongFromPlaylist = function (pid, sid) {
        if (String(pid) === "liked") { S.saveLikedSongs(S.getLikedSongs().filter(function (s) { return String(s.id) !== String(sid); })); return { status: "removed" }; }
        S.savePlaylists(S.getPlaylists().map(function (p) {
            if (String(p.id) !== String(pid)) return p;
            return { id: p.id, name: p.name, description: p.description, songs: (p.songs || []).filter(function (s) { return String(s.id || s) !== String(sid); }), createdAt: p.createdAt, artwork: p.artwork };
        }));
        return { status: "removed" };
    };
    S.setPlaylistArtwork = function (id, url) { S.savePlaylists(S.getPlaylists().map(function (p) { if (String(p.id) !== String(id)) return p; return { id: p.id, name: p.name, description: p.description, songs: p.songs, createdAt: p.createdAt, artwork: String(url || "") }; })); };
    S.totalDuration = function (songs) { var s = (songs || []).reduce(function (a, x) { return a + (Number(x.durationSec) || toSec(x.duration)); }, 0); return { seconds: s, label: toLabel(s) }; };
    S.playlistCover = function (pl) { if (!pl) return "img/nav-logo-removebg-preview (1).png"; if (pl.artwork) return pl.artwork; if (pl.isLikedPlaylist) return ""; if (pl.songs && pl.songs.length && (pl.songs[0].image || pl.songs[0].cover)) return pl.songs[0].image || pl.songs[0].cover; return "img/nav-logo-removebg-preview (1).png"; };
    S.getAllSongs = function () {
        var seen = {}, out = []; function push(s) { if (s && !seen[String(s.id)]) { seen[String(s.id)] = true; out.push(s); } }
        (S.SEED_SONGS || []).forEach(function (s, i) { push(S.normalizeSong(s, i)); }); S.getLikedSongs().forEach(push);
        S.getPlaylists().forEach(function (p) { (p.songs || []).forEach(function (s) { push(typeof s === "string" ? (S.__seedById ? S.__seedById(s) : null) : S.normalizeSong(s, 0)); }); }); return out;
    };
})();
