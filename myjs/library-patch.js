/* WaveCraft Library patch part 1: shared helpers + theme fix + sort control. */
(function () {
if (window.__wcLibraryPatchApplied) return;
window.__wcLibraryPatchApplied = true;
var store = window.WaveCraftStore || null;
function esc(v) {
return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c];
});
}
function toast(msg) {
var t = document.getElementById("libraryToast");
var m = document.getElementById("toastMessage");
if (!t) {
t = document.createElement("div"); t.className = "wc-toast"; t.id = "libraryToast";
t.textContent = "";
var ti = document.createElement("i"); ti.className = "ri-check-line"; t.appendChild(ti);
var ts = document.createElement("span"); ts.id = "toastMessage"; t.appendChild(ts);
document.body.appendChild(t); m = t.querySelector("#toastMessage");
}
if (m) m.textContent = msg;
t.classList.add("show");
clearTimeout(window.__wcToastT);
window.__wcToastT = setTimeout(function () { t.classList.remove("show"); }, 2400);
}
function toPlayerSong(s) {
if (!s) return null;
var file = s.file || s.song || "";
if (!file) return null;
return { file: file, title: s.title || "Unknown song", artist: s.artist || "Unknown artist", image: s.image || "", album: s.album || "" };
}
function playList(songs, index) {
var p = window.WaveCraftPlayer || null;
var queue = (songs || []).map(toPlayerSong).filter(Boolean);
if (!queue.length || !p) { toast("No playable songs"); return; }
p.play(queue[Math.max(0, index || 0)], queue, Math.max(0, index || 0), true);
}
window.__wcLib = { store: store, esc: esc, toast: toast, toPlayerSong: toPlayerSong, playList: playList };
var btn = document.getElementById("themeBtn");
if (btn && !btn.dataset.wcPatched) {
var clone = btn.cloneNode(true);
clone.dataset.wcPatched = "true";
btn.replaceWith(clone);
var applyIcon = function () {
var icon = clone.querySelector("i");
if (!icon) return;
icon.className = document.body.classList.contains("light") ? "fa-solid fa-sun" : "fa-solid fa-moon";
};
try {
var savedTheme = localStorage.getItem("wavecraftTheme") || "dark";
document.body.classList.toggle("light", savedTheme === "light");
} catch (e) {}
applyIcon();
clone.addEventListener("click", function () {
document.body.classList.toggle("light");
var light = document.body.classList.contains("light");
try { localStorage.setItem("wavecraftTheme", light ? "light" : "dark"); } catch (e) {}
applyIcon();
toast(light ? "Light mode on" : "Dark mode on");
});
btn = clone;
}
if (!document.getElementById("librarySort")) {
var toolbar = document.querySelector(".wc-library-toolbar");
var search = document.querySelector(".wc-library-search");
if (toolbar) {
var sel = document.createElement("select");
sel.id = "librarySort"; sel.className = "wc-sort-select"; sel.setAttribute("aria-label", "Sort playlists");
sel.textContent = "";
var o1 = document.createElement("option"); o1.value = "recent"; o1.textContent = "Recently added"; sel.appendChild(o1);
var o2 = document.createElement("option"); o2.value = "name"; o2.textContent = "Name A-Z"; sel.appendChild(o2);
var o3 = document.createElement("option"); o3.value = "songs"; o3.textContent = "Most songs"; sel.appendChild(o3);
sel.style.cssText = "background:rgba(255,255,255,.06);color:inherit;border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:10px 12px;font-size:13px;outline:none;cursor:pointer;max-width:170px;";
if (search && search.parentElement === toolbar) {
var wrap = document.createElement("div");
wrap.style.cssText = "display:flex;gap:10px;align-items:center;flex-wrap:wrap;";
toolbar.replaceChild(wrap, search); wrap.appendChild(search); wrap.appendChild(sel);
} else { toolbar.appendChild(sel); }
try { var sv = localStorage.getItem("wavecraftLibrarySort"); if (sv) sel.value = sv; } catch (e) {}
sel.addEventListener("change", function () {
try { localStorage.setItem("wavecraftLibrarySort", sel.value); } catch (e) {}
document.dispatchEvent(new CustomEvent("wc:resort"));
});
}
}
})();

/* Part 2a: shared add-to-playlist modal. */
(function () {
var H = window.__wcLib || {};
var store = H.store || window.WaveCraftStore || null;
var toast = H.toast, esc = H.esc;
var pendingSong = null;
function ensureAddModal() {
var ov = document.getElementById("wcAddToPlaylistModal");
if (ov) return ov;
ov = document.createElement("div");
ov.id = "wcAddToPlaylistModal"; ov.className = "wc-modal-overlay";
ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
ov.textContent = "";
var box = document.createElement("div"); box.className = "wc-playlist-modal"; ov.appendChild(box);
var x = document.createElement("button"); x.className = "wc-modal-close"; x.textContent = "X"; x.setAttribute("aria-label", "Close"); box.appendChild(x);
var h = document.createElement("h2"); h.textContent = "Add to playlist"; box.appendChild(h);
var sub0 = document.createElement("p"); sub0.id = "wcAddSub"; sub0.textContent = "Choose a playlist."; box.appendChild(sub0);
var nc = document.createElement("button"); nc.id = "wcAddCreate"; nc.className = "wc-create-playlist-card"; nc.textContent = "+ Create new playlist"; box.appendChild(nc);
var list0 = document.createElement("div"); list0.id = "wcAddList"; box.appendChild(list0);
document.body.appendChild(ov);
ov.addEventListener("click", function (e) { if (e.target === ov || (e.target.closest && e.target.closest(".wc-modal-close"))) ov.classList.remove("show"); });
ov.querySelector("#wcAddCreate").addEventListener("click", function () {
ov.classList.remove("show");
var m = document.getElementById("playlistModal");
if (m) { m.classList.add("show"); }
});
return ov;
}
function openAdd(song) {
pendingSong = song;
var ov = ensureAddModal();
var list = ov.querySelector("#wcAddList");
var sub = ov.querySelector("#wcAddSub");
var playlists = store ? store.getPlaylists() : [];
if (sub) sub.textContent = song ? ("Add '" + song.title + "' to a playlist.") : "Choose a playlist.";
list.textContent = "";
if (!playlists.length) { var none2 = document.createElement("p"); none2.textContent = "No playlists yet."; list.appendChild(none2); }
playlists.forEach(function (pl) {
var b = document.createElement("button"); b.type = "button";
b.style.cssText = "display:flex;align-items:center;gap:12px;text-align:left;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:10px;color:inherit;cursor:pointer;";
var count = (pl.songs || []).length;
b.textContent = pl.name + " (" + count + " songs)";
b.addEventListener("click", function () {
if (!pendingSong || !store) return;
var res = store.addSongToPlaylist(pl.id, pendingSong);
toast(res.status === "added" ? ("Added to " + pl.name) : res.status === "exists" ? ("Already in " + pl.name) : "Could not add song");
ov.classList.remove("show");
});
list.appendChild(b);
});
ov.classList.add("show");
}
window.openAddToPlaylist = openAdd;
window.__wcOpenAdd = openAdd;
})();

/* Part 2b: menu routing + globals. */
(function () {
var H = window.__wcLib || {};
var store = H.store || window.WaveCraftStore || null;
var toast = H.toast, playList = H.playList;
document.addEventListener("click", function (e) {
var t = e.target.closest ? e.target.closest("#playlistContextMenu button[data-action]") : null;
if (t && store) {
var menu = document.getElementById("playlistContextMenu");
var card = document.querySelector(".wc-playlist-card.menu-open");
var id = (menu && menu.dataset.playlistId) || (card && card.dataset.id);
if (!id) return;
var pl = store.getPlaylists().find(function (x) { return String(x.id) === String(id); });
if (!pl) return;
if (t.dataset.action === "open") window.location.href = "playlist.html?id=" + encodeURIComponent(id);
if (t.dataset.action === "play") playList(pl.songs, 0);
if (t.dataset.action === "shuffle") playList((pl.songs || []).slice().sort(function () { return Math.random() - 0.5; }), 0);
if (t.dataset.action === "delete" && confirm("Delete playlist?")) { store.deletePlaylist(id); toast("Playlist deleted"); }
return;
}
var pb = e.target.closest ? e.target.closest("[data-play]") : null;
if (pb && store && pb.id !== "likedPlayBtn") {
var f = store.getPlaylists().find(function (x) { return String(x.id) === String(pb.dataset.play); });
if (f) { e.stopPropagation(); playList(f.songs, 0); }
}
}, true);
var likedBtn = document.getElementById("likedPlayBtn");
if (likedBtn && !likedBtn.dataset.wcBound) {
likedBtn.dataset.wcBound = "true";
likedBtn.addEventListener("click", function (e) {
e.stopPropagation();
var songs = store ? store.getLikedSongs() : [];
if (!songs.length) { toast("You don't have any liked songs yet"); return; }
playList(songs, 0); toast("Playing Liked Music");
}, true);
}
var likedCard = document.getElementById("likedMusicCard");
if (likedCard && !likedCard.dataset.wcBound) {
likedCard.dataset.wcBound = "true";
likedCard.addEventListener("click", function (e) { if (e.target.closest("button")) return; window.location.href = "liked.html"; });
likedCard.setAttribute("tabindex", "0");
likedCard.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); window.location.href = "liked.html"; } });
}
function refreshCounts() {
var el = document.getElementById("likedSongCount");
if (el && store) { var n = store.getLikedSongs().length; el.textContent = n + " songs"; }
}
window.addEventListener("storage", function (e) { if (!e.key || e.key.indexOf("wavecraft") === 0) setTimeout(refreshCounts, 30); });
window.playSong = window.playSong || function (song, queue, index) {
if (Array.isArray(queue) && queue.length) playList(queue, index || 0);
else if (song) playList([song], 0);
};
window.toggleLike = window.toggleLike || function (song) { if (!store) return { liked: false }; var r = store.toggleLike(song); refreshCounts(); return r; };
window.addToPlaylist = window.addToPlaylist || function (pid, song) {
if (!store) return;
var r = store.addSongToPlaylist(pid, song);
toast(r.status === "added" ? "Added to playlist" : "Already in playlist");
return r;
};
refreshCounts();
})();
