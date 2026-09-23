/* WaveCraft site bridge: global like + add-to-playlist on every page. */
(function () {
function store() { return window.WaveCraftStore || null; }
function recordHistory(song) {
try {
if (!song || (!song.file && !song.title)) return;
if (window.WaveCraftHistory && window.WaveCraftHistory.record) { window.WaveCraftHistory.record(song); return; }
var KEY = (window.WaveCraftHistory && window.WaveCraftHistory.key) || "wavecraftListeningHistory";
var raw = null; try { raw = localStorage.getItem(KEY); } catch (e) {}
var items = raw ? JSON.parse(raw) : [];
if (!Array.isArray(items)) items = [];
var entry = { id: String((song.title || "") + "__" + (song.artist || "") + "__" + Date.now()), title: song.title || "Unknown song", artist: song.artist || "Unknown artist", image: song.image || "", album: song.album || "", file: song.file || "", kind: "song", playedAt: Date.now() };
var last = items[0];
if (last && last.file && entry.file && last.file === entry.file && (Date.now() - Number(last.playedAt || 0)) < 30000) return;
items.unshift(entry);
try { localStorage.setItem(KEY, JSON.stringify(items.slice(0, 200))); } catch (e) {}
} catch (e) {}
}
function playerSong(s) {
if (!s) return null;
var file = s.file || s.song || "";
if (!file) return null;
return { file: file, title: s.title || "Unknown", artist: s.artist || "Unknown", image: s.image || "" };
}
function cardSong(card) {
if (!card) return null;
var play = card.querySelector(".play-btn");
var like = card.querySelector(".like-btn");
var src = play || like || card;
var title = src.dataset.title || card.dataset.title || "";
var artist = src.dataset.artist || card.dataset.artist || "";
if (!title) {
var h = card.querySelector("h5,h4,h3");
if (h) title = h.textContent.trim();
}
if (!artist) {
var p = card.querySelector("p");
if (p) artist = p.textContent.trim();
}
var image = src.dataset.image || "";
if (!image) {
var img = card.querySelector("img");
if (img) image = img.getAttribute("src") || "";
}
var file = "";
if (play) file = play.dataset.song || play.dataset.file || "";
var st = store();
if (st) return st.normalizeSong({ id: title + "__" + artist, title: title, artist: artist, image: image, file: file }, 0);
return { id: title + "__" + artist, title: title, artist: artist, image: image, file: file };
}
function paintLikeButtons() {
var st = store();
if (!st) return;
var songs = st.getLikedSongs();
var liked = {};
songs.forEach(function (s) { liked[String(s.id)] = true; liked[String(s.title + "__" + s.artist)] = true; });
document.querySelectorAll(".like-btn").forEach(function (btn) {
var card = btn.closest(".music-card");
var song = cardSong(card);
if (!song) return;
var isLiked = liked[String(song.id)] === true;
var icon = btn.querySelector("i");
btn.classList.toggle("liked", isLiked);
btn.setAttribute("aria-pressed", isLiked ? "true" : "false");
if (icon) icon.className = isLiked ? "ri-heart-fill" : "ri-heart-line";
if (!btn.dataset.wcBound) {
btn.dataset.wcBound = "true";
btn.addEventListener("click", function (e) {
e.stopPropagation();
var current = cardSong(card);
var res = st.toggleLike(current);
var nowLiked = res.liked;
btn.classList.toggle("liked", nowLiked);
if (icon) icon.className = nowLiked ? "ri-heart-fill" : "ri-heart-line";
btn.setAttribute("aria-pressed", nowLiked ? "true" : "false");
}, true);
}
});
}
function ensureBridgeMenu() {
var menu = document.getElementById("wcBridgeAddMenu");
if (menu) return menu;
menu = document.createElement("div");
menu.id = "wcBridgeAddMenu";
menu.className = "wc-context-menu";
menu.style.zIndex = "13000";
document.body.appendChild(menu);
document.addEventListener("click", function (e) {
if (!menu.classList.contains("show")) return;
if (menu.contains(e.target)) return;
menu.classList.remove("show");
});
return menu;
}
function openBridgeMenu(song, x, y) {
var st = store();
if (!st) return;
var menu = ensureBridgeMenu();
menu.textContent = "";
var title = document.createElement("div");
title.textContent = "Add to playlist";
title.style.padding = "8px 12px";
title.style.opacity = ".65";
menu.appendChild(title);
var playlists = st.getPlaylists();
if (!playlists.length) {
var none = document.createElement("div");
none.textContent = "No playlists yet";
none.style.padding = "8px 12px";
menu.appendChild(none);
}
playlists.forEach(function (pl) {
var b = document.createElement("button");
b.type = "button";
b.textContent = pl.name + " (" + (pl.songs || []).length + ")";
b.addEventListener("click", function () {
var res = st.addSongToPlaylist(pl.id, song);
alert(res.status === "added" ? ("Added to " + pl.name) : ("Already in " + pl.name));
menu.classList.remove("show");
});
menu.appendChild(b);
});
var create = document.createElement("button");
create.type = "button";
create.textContent = "+ Create new playlist";
create.addEventListener("click", function () {
var name = prompt("Playlist name:");
if (!name || !name.trim()) return;
st.createPlaylist(name.trim(), "");
menu.classList.remove("show");
});
menu.appendChild(create);
menu.style.left = Math.min(x, window.innerWidth - 260) + "px";
menu.style.top = Math.min(y, window.innerHeight - 260) + "px";
menu.classList.add("show");
}
function bindCards() {
document.querySelectorAll(".music-card").forEach(function (card) {
if (card.dataset.wcBridged) return;
card.dataset.wcBridged = "true";
var play = card.querySelector(".play-btn");
if (play && !play.dataset.wcBound) {
play.dataset.wcBound = "true";
play.addEventListener("click", function (e) {
e.stopPropagation();
var song = cardSong(card);
var q = playerSong(song);
if (q && window.WaveCraftPlayer) { window.WaveCraftPlayer.play(q, [q], 0, true); recordHistory(q); }
}, true);
}
var more = card.querySelector(".more-btn");
if (more) {
more.addEventListener("click", function (e) {
e.stopPropagation();
var song = cardSong(card);
openBridgeMenu(song, e.clientX || 80, e.clientY || 120);
});
}
var opts = card.querySelectorAll(".playlist-option");
if (opts.length) {
if (opts[0] && !opts[0].dataset.wcBound) {
opts[0].dataset.wcBound = "true";
opts[0].addEventListener("click", function (e) {
e.stopPropagation();
var song = cardSong(card);
openBridgeMenu(song, e.clientX || 80, e.clientY || 120);
});
}
if (opts[1] && !opts[1].dataset.wcBound) {
opts[1].dataset.wcBound = "true";
opts[1].addEventListener("click", function (e) {
e.stopPropagation();
var st = store();
if (!st) return;
var name = prompt("Playlist name:");
if (name && name.trim()) st.createPlaylist(name.trim(), "");
});
}
}
});
}
function init() {
if (!store()) return;
paintLikeButtons();
bindCards();
new MutationObserver(function () { paintLikeButtons(); bindCards(); }).observe(document.body, { childList: true, subtree: true });
window.addEventListener("storage", function (e) {
if (!e.key || e.key.indexOf("wavecraft") === 0) setTimeout(paintLikeButtons, 30);
});
}
if (document.readyState !== "loading") init();
else document.addEventListener("DOMContentLoaded", init);
})();
