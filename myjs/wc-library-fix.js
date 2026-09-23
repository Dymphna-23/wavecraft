/* Library <-> reusable playlist template bridge. Fixes cards + likedsync. */
(function(){function r(f){if(document.readyState!=="loading")f();else document.addEventListener("DOMContentLoaded",f);}
r(function(){var S=window.WaveCraftStore;
if(!S)return;
function go(id){window.location.href="playlist.html?id="+encodeURIComponent(id);}
var likedCard=document.getElementById("likedMusicCard");
if(likedCard&&!likedCard.dataset.wcFixed){
likedCard.dataset.wcFixed="true";
likedCard.addEventListener("click",function(e){if(e.target.closest("button"))return;go("liked");});
likedCard.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();go("liked");}});}
document.querySelectorAll("#songsContainer .music-card").forEach(function(card){
if(card.dataset.wcLib==="1")return;card.dataset.wcLib="1";
card.style.cursor="pointer";
card.addEventListener("click",function(e){
if(e.target.closest("button"))return;
var t=(card.dataset.title||"").toLowerCase();
var map={afrobeats:"afrobeats","chill vibes":"chill-vibes",workout:"workout","my favorites":"my-favorites",liked:"liked"};
var id=null;
var pls=S.getPlaylists();
for(var i=0;i<pls.length;i++){if(pls[i].name.toLowerCase()===t){id=pls[i].id;break;}}
if(!id)id=map[t]||null;
if(id)go(id);});});
function paintLiked(){var el=document.getElementById("likedSongCount");
if(el)el.textContent=S.getLikedSongs().length+" songs";
var lk=document.querySelector("#likedMusicCard .wc-like-overlay img");
if(lk)lk.src="img/liked.jpeg";}
paintLiked();
window.addEventListener("storage",function(){setTimeout(paintLiked,50);});
setInterval(paintLiked,3000);
});})();
