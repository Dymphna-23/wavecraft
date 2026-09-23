var head=document.createElement("div");head.className="wc-song-head";head.setAttribute("aria-hidden","true");
["#","Title","Album","Time","",""].forEach(function(t,i){var s=document.createElement("span");s.textContent=t;head.appendChild(s);});
sec.appendChild(head);
var wrap=document.createElement("div");wrap.setAttribute("role","list");wrap.style.display="flex";wrap.style.flexDirection="column";wrap.style.gap="4px";
if(!songs.length){var em=document.createElement("div");em.className="wc-empty";
em.textContent=pl.isLikedPlaylist?"Songs you like will appear here. Tap the heart on any song.":"No songs in this playlist yet. Use Add to Playlist from any song.";wrap.appendChild(em);}
songs.forEach(function(song,idx){
var row=document.createElement("div");row.className="wc-song-row";row.setAttribute("role","listitem");row.tabIndex=0;
row.setAttribute("aria-label","Play "+song.title+" by "+song.artist);
var num=document.createElement("span");num.className="wc-song-num";num.textContent=idx+1;row.appendChild(num);
var art=document.createElement("img");art.className="wc-song-art";art.src=song.image||song.cover||"img/nav-logo-removebg-preview (1).png";art.alt="";art.loading="lazy";row.appendChild(art);
var main=document.createElement("div");main.className="wc-song-main";main.style.minWidth="0";
var t=document.createElement("p");t.className="wc-song-title";t.textContent=song.title;
var a=document.createElement("p");a.className="wc-song-artist";a.textContent=song.artist;
main.appendChild(t);main.appendChild(a);
var isPhone=window.matchMedia&&window.matchMedia("(max-width: 767px)").matches;
if(isPhone){var mArt=document.createElement("img");mArt.src=art.src;mArt.alt="";var mm=document.createElement("div");mm.className="wc-song-main";mm.appendChild(mArt);var tx=document.createElement("div");tx.style.minWidth="0";tx.appendChild(t);tx.appendChild(a);mm.appendChild(tx);row.appendChild(mm);}
else row.appendChild(main);
var alb=document.createElement("span");alb.className="wc-song-album";alb.textContent=song.album||"—";row.appendChild(alb);
var du=document.createElement("span");du.className="wc-song-dur";du.textContent=song.duration||"--:--";row.appendChild(du);
var like=document.createElement("button");like.type="button";like.className="wc-like-btn"+(S&&S.isLiked(song.id)?" liked":"");
like.setAttribute("aria-label",(S&&S.isLiked(song.id)?"Unlike ":"Like ")+song.title);
like.setAttribute("aria-pressed",S&&S.isLiked(song.id)?"true":"false");
like.innerHTML='<i class="'+(S&&S.isLiked(song.id)?"ri-heart-fill":"ri-heart-line")+'"></i>';
like.addEventListener("click",function(e){e.stopPropagation();if(!S)return;
var res=S.toggleLike(song);like.classList.toggle("liked",res.liked);like.classList.add("pop");
setTimeout(function(){like.classList.remove("pop");},380);
var ic=like.querySelector("i");if(ic)ic.className=res.liked?"ri-heart-fill":"ri-heart-line";
like.setAttribute("aria-pressed",res.liked?"true":"false");
window.wcToast(res.liked?"Added to Liked Music":"Removed from Liked Music");
if(pl.isLikedPlaylist)render();});
row.appendChild(like);
var more=document.createElement("button");more.type="button";more.className="wc-more-btn";
more.setAttribute("aria-label","More options for "+song.title);more.innerHTML='<i class="ri-more-2-fill"></i>';
more.addEventListener("click",function(e){e.stopPropagation();window.wcSongMenu(song,e,{playlistId:pl.id,isLiked:!!pl.isLikedPlaylist,after:render});});
row.appendChild(more);
function go(){window.wcPlayList(songs,idx);
wrap.querySelectorAll(".wc-song-row").forEach(function(x){x.classList.remove("playing");});row.classList.add("playing");}
row.addEventListener("click",function(e){if(e.target.closest("button"))return;go();});
row.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();go();}});
wrap.appendChild(row);});
sec.appendChild(wrap);
try{var cur=P?(P.getState()||{}).currentSong:null;
if(cur){var rows=wrap.querySelectorAll(".wc-song-row");
songs.forEach(function(s,i){if(s.file&&cur.file&&s.file===cur.file&&rows[i])rows[i].classList.add("playing");});}}catch(e){}
if(P&&P.subscribe&&!window.__wcPlSub){window.__wcPlSub=true;
P.subscribe(function(st){try{var rows=wrap.querySelectorAll(".wc-song-row");
rows.forEach(function(x){x.classList.remove("playing");});
(songs||[]).forEach(function(s,i){if(st.currentSong&&s.file===st.currentSong.file&&rows[i])rows[i].classList.add("playing");});}catch(x){}});}
}
render();
window.addEventListener("storage",function(e){if(!e.key||e.key.indexOf("wavecraft")===0)setTimeout(render,60);});
window.addEventListener("resize",function(){clearTimeout(window.__wcPlR);window.__wcPlR=setTimeout(render,220);});
});})();
