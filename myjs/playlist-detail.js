/* WaveCraft playlist detail renderer. */
(function () {
var params = new URLSearchParams(window.location.search);
var playlistId = params.get("id");
var mainArea = document.getElementById("mainArea");
if (document.getElementById("wcPlaylistDetail")) return;
var store = window.WaveCraftStore || null;
function getPlaylist() {
if (!store) return null;
var list = store.getPlaylists();
for (var i = 0; i < list.length; i++) {
if (String(list[i].id) === String(playlistId)) return list[i];
}
return null;
}
function playerSong(s) {
if (!s) return null;
var file = s.file || s.song || "";
if (!file) return null;
return { file: file, title: s.title || "Unknown", artist: s.artist || "Unknown", image: s.image || "" };
}
function playSongs(songs, index) {
var p = window.WaveCraftPlayer;
if (!p) return;
var queue = [];
for (var i = 0; i < songs.length; i++) {
var q = playerSong(songs[i]);
if (q) queue.push(q);
}
if (!queue.length) return;
p.play(queue[index || 0], queue, index || 0, true);
}
var host = document.getElementById("wcPlaylistDetailHost") || mainArea || document.body;
var section = document.createElement("section");
section.id = "wcPlaylistDetail";
section.className = "wc-library-section";
host.insertBefore(section, host.firstChild);
function render() {
var pl = playlistId ? getPlaylist() : null;
section.textContent = "";
var back = document.createElement("a");
back.href = "library.html";
back.className = "wc-view-all";
back.textContent = "Back to Library";
section.appendChild(back);
if (!pl) {
var h = document.createElement("h2"); h.textContent = "Playlist not found"; section.appendChild(h);
var p = document.createElement("p"); p.textContent = "This playlist may have been deleted."; section.appendChild(p);
return;
}
var head = document.createElement("div");
head.className = "wc-playlist-detail-head";
var art = document.createElement("div");
art.className = "wc-playlist-detail-art";
var songs = pl.songs || [];
if (songs.length && songs[0].image) {
var img = document.createElement("img"); img.src = songs[0].image; img.alt = pl.name; art.appendChild(img);
} else {
art.textContent = (pl.name || "W").charAt(0).toUpperCase();
}
head.appendChild(art);
var info = document.createElement("div");
var label = document.createElement("span"); label.className = "wc-section-label"; label.textContent = "PLAYLIST"; info.appendChild(label);
var title = document.createElement("h2"); title.textContent = pl.name; info.appendChild(title);
var desc = document.createElement("p"); desc.textContent = pl.description || "No description."; info.appendChild(desc);
var meta = document.createElement("p"); meta.textContent = songs.length + " songs"; info.appendChild(meta);
var row = document.createElement("div"); row.style.display = "flex"; row.style.gap = "10px";
var playBtn = document.createElement("button"); playBtn.className = "wc-create-btn"; playBtn.textContent = "Play"; row.appendChild(playBtn);
var shufBtn = document.createElement("button"); shufBtn.className = "wc-cancel-btn"; shufBtn.textContent = "Shuffle"; row.appendChild(shufBtn);
info.appendChild(row);
head.appendChild(info);
section.appendChild(head);
playBtn.addEventListener("click", function () { playSongs(songs, 0); });
shufBtn.addEventListener("click", function () {
var shuffled = songs.slice().sort(function () { return Math.random() - 0.5; });
playSongs(shuffled, 0);
});
var list = document.createElement("div");
list.style.display = "flex"; list.style.flexDirection = "column"; list.style.gap = "8px"; list.style.marginTop = "18px";
if (!songs.length) {
var empty = document.createElement("p"); empty.textContent = "No songs in this playlist yet."; list.appendChild(empty);
}
songs.forEach(function (song, idx) {
var item = document.createElement("div");
item.style.display = "flex"; item.style.alignItems = "center"; item.style.gap = "12px";
item.style.background = "rgba(255,255,255,.04)"; item.style.border = "1px solid rgba(255,255,255,.08)";
item.style.borderRadius = "12px"; item.style.padding = "8px 12px";
var thumb = document.createElement("img");
thumb.src = song.image || "img/nav-logo-removebg-preview (1).png";
thumb.alt = ""; thumb.style.width = "48px"; thumb.style.height = "48px"; thumb.style.borderRadius = "8px";
item.appendChild(thumb);
var mid = document.createElement("div"); mid.style.flex = "1"; mid.style.minWidth = "0";
var t = document.createElement("strong"); t.textContent = song.title; mid.appendChild(t);
var a = document.createElement("div"); a.textContent = song.artist; a.style.opacity = ".65"; mid.appendChild(a);
item.appendChild(mid);
var play = document.createElement("button"); play.className = "wc-icon-btn"; play.textContent = "Play"; play.setAttribute("aria-label", "Play song");
play.addEventListener("click", function () { playSongs(songs, idx); });
item.appendChild(play);
var like = document.createElement("button"); like.className = "wc-icon-btn"; like.textContent = "Like"; like.setAttribute("aria-label", "Like song");
like.addEventListener("click", function () {
if (window.WaveCraftStore) window.WaveCraftStore.toggleLike(song);
});
item.appendChild(like);
var add = document.createElement("button"); add.className = "wc-icon-btn"; add.textContent = "Add"; add.setAttribute("aria-label", "Add to playlist");
add.addEventListener("click", function () { if (window.openAddToPlaylist) window.openAddToPlaylist(song); });
item.appendChild(add);
list.appendChild(item);
});
section.appendChild(list);
}
render();
window.addEventListener("storage", function (e) { if (!e.key || e.key.indexOf("wavecraft") === 0) setTimeout(render, 30); });
})();
