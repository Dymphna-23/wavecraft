/* WaveCraft shared artist catalogue - single source of truth + auto-harvest.
   Merges curated data with EVERYTHING already in your JS/HTML:
   - window.wavecraftGenreCatalog (genre.js)
   - window.WaveCraftStore.SEED_SONGS (wc-seed.js)
   - DOM .music-card / .upcoming-card / [data-artist] (index.html etc.)
   No fake paths: only real titles/artists/images/audio from your project. */
(function () {
   "use strict";
   function slug(n) { return String(n || "").toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "unknown-artist"; }
   var ARTISTS = [
      { id: "burna-boy", 
        name: "Burna Boy", 
        image: "img/Burna-boy.jpg", 
        genre: "Afrobeats", 
        verified: true, 
        tags: ["popular", "trending"], 
        bio: "Grammy-winning Afrofusion star." },


      { id: "wizkid", name: "Wizkid", image: "img/wizkid.jpeg", genre: "Afrobeats", verified: true, tags: ["popular", "trending"], bio: "Lagos hitmaker, Made In Lagos / Morayo." },
      { id: "tems", name: "Tems", image: "img/tems.jpg", genre: "R&B", verified: true, tags: ["popular", "trending"], bio: "Soulful singer-songwriter." },
      { id: "asake", name: "Asake", image: "img/asake.jpg", genre: "Afrobeats", verified: true, tags: ["popular", "trending"], bio: "Fuji-amapiano hit machine." },
      { id: "davido", name: "Davido", image: "img/davido.jpg", genre: "Afrobeats", verified: true, tags: ["popular", "trending"], bio: "Afrobeats ambassador." },
      { id: "seyi-vibez", name: "Seyi Vibez", image: "img/seyi-vibes.jpg", genre: "Afrobeats", verified: true, tags: ["popular", "trending"], bio: "Street-pop voice." },
      { id: "shallipopi", name: "Shallipopi", image: "img/shallipopi.jpg", genre: "Afrobeats", verified: true, tags: ["popular", "trending", "upcoming"], bio: "Benin City breakout." },
      { id: "ayra-starr", name: "Ayra Starr", image: "img/Ayra=star.jpg", genre: "Afrobeats", verified: true, tags: ["popular", "trending"], bio: "Gen-Z Afropop star." },
      { id: "qing-madi", name: "Qing Madi", image: "img/qing-madi.jpg", genre: "Afrobeats", verified: false, tags: ["popular", "upcoming"], bio: "Teenage Afropop gem." },
      { id: "odumodublvck", name: "ODUMODUBLVCK", image: "img/Odumodublvck.webp", genre: "Hip-Hop", verified: true, tags: ["popular", "trending", "upcoming"], bio: "Abuja rap powerhouse." },
      { id: "fola", name: "FOLA", image: "img/you.jpg", genre: "Afrobeats", verified: false, tags: ["trending", "upcoming"], bio: "Smooth street-soul melodist." },
      { id: "victony", name: "Victony", image: "img/slick.jpg", genre: "Afrobeats", verified: true, tags: ["trending", "upcoming"], bio: "Versatile hitmaker." },
      { id: "kizz-daniel", name: "Kizz Daniel", image: "img/kizz-daniel.jpg", genre: "Afrobeats", verified: true, tags: ["trending"], bio: "Afropop hitmaker." },
      { id: "bnxn", name: "BNXN", image: "img/eja-meja.webp", genre: "Afrobeats", verified: true, tags: ["trending", "upcoming"], bio: "Melody pen." },
      { id: "mayorkun", name: "Mayorkun", image: "img/in-my-head.jpg", genre: "Afrobeats", verified: true, tags: ["upcoming"], bio: "Mayor of Lagos sound." },
      { id: "blaqbonez", name: "Blaqbonez", image: "img/chanel.jpg", genre: "Hip-Hop", verified: true, tags: ["trending"], bio: "Rap contender." },
      { id: "black-sherif", name: "Black Sherif", image: "img/sacrifice.jpg", genre: "Afrobeats", verified: true, tags: ["trending", "upcoming"], bio: "Ghanaian storyteller." },
      { id: "king-promise", name: "King Promise", image: "img/chop-life.jpg", genre: "Afrobeats", verified: true, tags: ["upcoming"], bio: "Silky highlife." },
      { id: "gyakie", name: "Gyakie", image: "img/december.jpg", genre: "Afrobeats", verified: false, tags: ["upcoming"], bio: "Songbird." },
      { id: "faceless", name: "Faceless", image: "img/faceless.jpg", genre: "Afrobeats", verified: false, tags: ["upcoming"], bio: "Emerging act." },
      { id: "moonchild-sanelly", name: "Moonchild Sanelly", image: "img/moonchild-sanelly.jpg", genre: "Afrobeats", verified: false, tags: ["upcoming"], bio: "Gqom pop." },
      { id: "young-johnn", name: "Young Jonn", image: "img/barely-lyrics.jpg", genre: "Afrobeats", verified: true, tags: ["trending"], bio: "Producer hitmaker." },
      { id: "d-rhock", name: "D Rhock", image: "img/drhock.jpg", genre: "Afrobeats", verified: false, tags: ["upcoming"], bio: "CHOKE ME." },
      { id: "ef-moon", name: "EF Moon", image: "img/ef-moon.jpg", genre: "Afrobeats", verified: false, tags: ["upcoming"], bio: "Afropop confessions." },
      { id: "alex-warren", name: "Alex Warren", image: "img/alex-warren.jpg", genre: "Pop", verified: false, tags: ["upcoming"], bio: "Ordinary ballad." },
      { id: "zaylevelten", name: "Zaylevelten", image: "img/tease-me.jpg", genre: "Afrobeats", verified: false, tags: ["upcoming"], bio: "Viral newcomer." },
      { id: "champz", name: "Champz", image: "img/champz.webp", genre: "Afrobeats", verified: false, tags: ["upcoming"], bio: "Champion anthem." },
      { id: "adela", name: "Adela", image: "img/machine-girl.jpg", genre: "Pop", verified: false, tags: ["upcoming"], bio: "Alt-pop riser." }
   ];

   var SONGS = {

             "Bad Bunny": [
               { title: "DtMF",
                 album: "DeBI TiRAR MaS FoToS",
                 image: "img/dtmf.jpg",
                 file: "audio/latin/Bad_Bunny_-_DtMF_(mp3.pm).mp3",
                 duration: "3:57"
            }],

            "Beele":[{
                title: "Frente Al Mar",
                album: "Frente al mar",
                image: "img/beele.jpg",
                file: "audio/latin/Beele_-_Frente_al_Mar_(mp3.pm).mp3",
                duration: "2:45"
            }],

           "ELENA ROSE":[{
                title: "AMEN BEBE",
                album: "Bendito Verano",
                image: "img/amen-bebe.jpg",
                file: "audio/latin/ELENA_ROSE_-_AM_N_BEB_(mp3.pm).mp3",
                duration: "2:31"
            }],

           "Kapo":[{
                title: "Ohnana",
                album: "OHNANA",
                image: "img/kapo.jpg",
                file: "audio/latin/Kapo_-_Ohnana_(mp3.pm).mp3",
                duration: "2:36"
            }],

          "KAROL G": [{
                title: "Ivonny Bonita",
                album: "Tropicoqueta",
                image: "img/karol-g.jpg",
                file: "audio/latin/KAROL_G_-_Ivonny_Bonita_(mp3.pm).mp3",
                duration: "3:42"
            }],

          "Rels B":[  {
                title: "TU VAS SIN",
                album: "AfroLOVA25'",
                image: "img/rels-b.jpg",
                file: "audio/latin/Rels_B_-_TU_VAS_SIN_(mp3.pm).mp3",
                duration: "1:50"
          }],

           "Rusowsky": [{
                title: "Malibu",
                album: "DAISY",
                image: "img/malibu.jpg",
                file: "audio/latin/rusowsky_-_malibU_(mp3.pm).mp3",
                duration: "3:35"
            }],

          "Young MIKO": [{
                title: "WASSUP",
                album: "WASSUP",
                image: "img/young-miko.jpg",
                file: "audio/latin/Young_Miko_-_WASSUP_(mp3.pm).mp3",
                duration: "2:42"
            }],

         "Feid":[
            {  title: "La Ultima Vez",
               album: "La Ultima Vez",
               image: "img/feid.jpg",
               song: "audio/latin/Feid_-_La_Ultima_Vez_(mp3.pm).mp3",
               duration: "3:38"
            }
         ],

            "Rauw Alejandro": [{
                title: "Donde",
                album: "Donde",
                image: "img/donde.jpg",
                file: "audio/latin/Rauw_Alejandro_-_Donde_(mp3.pm).mp3",
                duration: "3:56"
            }
         ],
      "burna-boy": [
         { title: "For Everybody", 
           album: "No Sign of Weakness", 
           image: "img/Burna-boy.jpg", 
           file: "audio/Burna-Boy-For-Everybody.mp3", 
           duration: "3:21" }
         ],
      "wizkid": [
         { title: "Essence", 
           album: "Made in Lagos", 
           image: "img/wizkid.jpeg", 
           file: "audio/Wizkid_Ft._Tems_-_Essence.mp3", 
           duration: "4:08" }
         ],

      "tems": [
         { title: "What You Need", 
            album: "Born in the Wild", 
            image: "img/tems.jpg", 
            file: "audio/Tems-What-You-Need-Vistanaij.com_.mp3", 
            duration: "3:29" }
         ],

      "davido": [
         { title: "I Know Who I Be", 
           album: "Davido", 
           image: "img/davido.jpg", 
           file: "audio/Davido-I-Know-Who-I-Be-feat-JAZZWRLD-GL_Ceejay.mp3", 
           duration: "3:15" }, 
           
           { title: "B4 B4", 
            album: "B4 B4", 
            image: "img/b4-b4.jpg", 
            file: "audio/Davido-B4-B4-ft-Mayorkun-Fola-(JustNaija.com).mp3", 
            duration: "3:20" }
         ],

      "seyi-vibez": [
         { title: "Pressure", 
           album: "Thy Kingdom Come", 
           image: "img/seyi-vibes.jpg", 
           file: "audio/Seyi-Vibez-Pressure-Official-Video-(CeeNaija.com).mp3", 
           duration: "3:14" }
         ],

      "shallipopi": [
         { title: "Hightension", 
           album: "Shallipopi", 
           image: "img/shallipopi.jpg", 
           file: "audio/Shallipopi-Hightension-(JustNaija.com).mp3", 
           duration: "2:56" }
         ],

      "ayra-starr": [
         { title: "Tornado", 
           album: "Ayra Starr", 
           image: "img/Ayra=star.jpg", 
           file: "audio/Ayra-Starr-Tornado.mp3", 
           duration: "3:04" }
         ],

      "qing-madi": [
         { title: "Vision", 
           album: "Qing Madi", 
           image: "img/qing-madi.jpg", 
           file: "audio/Qing-Madi-Vision-(JustNaija.com).mp3", 
           duration: "3:11" }
         ],

      "odumodublvck": [
         { title: "Motion Sickness", 
           album: "The Machine Is Coming", 
           image: "img/Odumodublvck.webp", 
           file: "audio/ODUMODUBLVCK-MOTION-SICKNESS-feat-Zlatan.mp3", 
           duration: "3:07" }
         ],

      "asake": [
         { title: "Forgiveness", 
            album: "Lungu Boy", 
            image: "img/asake.jpg", 
            file: "audio/Asake-Forgiveness-(JustNaija.com).mp3", 
            duration: "3:18" }
         ],

      "fola": [
         { title: "YOU", 
           album: "YOU", 
           image: "img/you.jpg", 
           file: "audio/FOLA_YOU.mp3", 
           duration: "3:02" }
         ],

      "victony": [
         { title: "SLICK", 
           album: "The Villain I Never Was", 
           image: "img/slick.jpg", file: "audio/Victony-SLICK.mp3", 
           duration: "3:21" }
         ],

      "kizz-daniel": [
         { title: "Marhaba", 
           album: "Maverick", 
           image: "img/marhaba.jpg", 
           file: "audio/Kizz-Daniel-Marhaba-(JustNaija.com).mp3", 
           duration: "2:47" }
         ],

      "bnxn": [
         { title: "EJA MEJA", 
           album: "EJA MEJA", 
           image: "img/eja-meja.webp", 
           file: "audio/BNXN-Eja-Meja-Ft-Asake-(JustNaija.com).mp3", 
           duration: "3:14" }
         ],

      "mayorkun": [
         { title: "In My Head", 
           album: "Still The Mayor", 
           image: "img/in-my-head.jpg", 
           file: "audio/Mayorkun-In-My-Head.mp3", 
           duration: "2:45" }
         ],

      "blaqbonez": [
         { title: "CHANEL", 
           album: "No Excuses", 
           image: "img/chanel.jpg", 
           file: "audio/Blaqbonez-Chanel-ft-Asake-(JustNaija.com).mp3", 
           duration: "3:09" }
         ],

      "black-sherif": [
         { title: "Sacrifice", 
           album: "Sacrifice", 
           image: "img/sacrifice.jpg", 
           file: "audio/Black-Sherif-Sacrifice-Video-(JustNaija.com).mp3", 
           duration: "3:18" }
         ],

      "king-promise": [
         { title: "Chop Life", 
           album: "True To Self", 
           image: "img/chop-life.jpg", 
           file: "audio/King-Promise-Chop-Life-(TrendyBeatz.com).mp3", 
           duration: "2:58" }
         ],

      "gyakie": [
         { title: "December", 
           album: "December", 
           image: "img/december.jpg", 
           file: "audio/Gyakie-December-(TrendyBeatz.com).mp3", 
           duration: "3:12" }
         ],

      "faceless": [
         { title: "Charmer", 
           album: "Charmer", 
           image: "img/faceless.jpg", 
           file: "audio/FACELESS-Charmer-ft.-LYTA-(JustNaija.com).mp3", 
           duration: "2:51" }
         ],

      "moonchild-sanelly": [
         { title: "Thunda Thighs", 
           album: "Full Moon", 
           image: "img/moonchild-sanelly.jpg", 
           file: "audio/Moonchild-Sanelly-Thunda-Thighs-ft.-Dladla-Mshunqisi-DJ-Tira-(JustNaija.com).mp3", 
           duration: "3:26" }
         ],

      "young-johnn": [
         { title: "Che Che", 
            album: "Che Che", 
            image: "img/barely-lyrics.jpg", 
            file: "audio/Young-Jonn-Che-Che-ft.-Asake-(JustNaija.com).mp3", 
            duration: "2:56" }
         ],

      "d-rhock": [
         { title: "CHOKE ME", 
           album: "CHOKE ME", 
           image: "img/drhock.jpg", 
           file: "audio/D-RHOCK-Choke-Me-(JustNaija.com).mp3", 
           duration: "2:58" }
         ],

      "ef-moon": [
         { title: "I KNOW", 
           album: "I KNOW", 
           image: "img/ef-moon.jpg", 
           file: "audio/EF-Moon-I-Knoww-ft.-Star-Jay.mp3", 
           duration: "3:05" }
         ],

      "alex-warren": [
         { title: "Ordinary", 
           album: "Ordinary", 
           image: "img/alex-warren.jpg", 
           file: "audio/Alex warren - Ordinary.mp3", 
           duration: "3:06" }
         ],

      "zaylevelten": [
         { title: "Tease Me", 
           album: "Tease Me", 
           image: "img/tease-me.jpg", 
           file: "audio/Zaylevelten_-_-_Tease_MeHipopsongs.com.ng.mp3", 
           duration: "2:49" }
         ],

      "champz": [
         { title: "Champion", 
           album: "Champion", 
           image: "img/champz.webp", 
           file: "audio/Champz-Champion-Sound-(JustNaija.com).mp3", 
           duration: "2:52" }
         ],

      "adela": [
         { title: "Machine Girl", 
           album: "Machine Girl", 
           image: "img/machine-girl.jpg", 
           file: "audio/MachineGirl.mp3", 
           duration: "3:12" }
         ]
   };

   function getById(id) { id = String(id || "").toLowerCase(); for (var i = 0; i < ARTISTS.length; i++)if (ARTISTS[i].id === id) return ARTISTS[i]; return null; }
   function findByName(n) { n = String(n || "").toLowerCase().trim(); if (!n) return null; var i, a; for (i = 0; i < ARTISTS.length; i++)if (ARTISTS[i].name.toLowerCase() === n) return ARTISTS[i]; for (i = 0; i < ARTISTS.length; i++) { a = ARTISTS[i].name.toLowerCase(); if (n.indexOf(a) !== -1 || a.indexOf(n) !== -1) return ARTISTS[i]; } return getById(slug(n)); }
   function splitArtists(raw) { if (!raw) return []; if (Array.isArray(raw)) return raw.slice(); var s = String(raw); s = s.replace(/\s+x\s+/gi, ","); var parts = s.split(/[,/&]+| feat\.? | ft\.? | featuring | with /i); return parts.map(function (p) { return p.trim(); }).filter(Boolean); }
   function cleanTitle(t) { return String(t || "").replace(/\s*\(?(feat|ft)\.?[^)]*\)?/gi, "").replace(/\s*-\s*(feat|ft)\.?.*$/gi, "").trim(); }
   function normSong(a, s, i) { return { id: (a ? a.id + "-song-" : "x-") + i + "-" + slug(s.title), title: s.title, artist: a ? a.name : (s.artist || "Unknown"), album: s.album || "", image: s.image || (a ? a.image : ""), file: s.file || "", duration: s.duration || "" }; }
   function songsFor(id) { var a = getById(id); if (!a) return []; return (SONGS[id] || []).map(function (s, i) { return normSong(a, s, i); }); }
   function albumsFor(id) { var seen = {}, out = []; songsFor(id).forEach(function (s) { var k = String(s.album || s.title).toLowerCase(); if (seen[k]) return; seen[k] = 1; out.push({ title: s.album || s.title, image: s.image, artist: s.artist }); }); return out; }
   function byTag(t) { return ARTISTS.filter(function (a) { return (a.tags || []).indexOf(t) !== -1; }); }
   function ensureArtist(name, image, genre) { var f = findByName(name); if (f) { if (image && (!f.image || f.image.indexOf("nav-logo") !== -1)) f.image = image; return f; } var a = { id: slug(name), name: String(name).trim(), image: image || "img/nav-logo-removebg-preview (1).png", genre: genre || "Afrobeats", verified: false, tags: [], bio: "WaveCraft artist." }; ARTISTS.push(a); return a; }
   function addSong(names, rec) { var seen = {}; names.forEach(function (nm) { var a = ensureArtist(nm, rec.image, rec.genre); var arr = SONGS[a.id] = SONGS[a.id] || []; var key = (cleanTitle(rec.title) + "||" + (rec.file || "")).toLowerCase(); if (seen[a.id + key]) return; seen[a.id + key] = 1; var dup = arr.some(function (s) { return (cleanTitle(s.title) + "||" + (s.file || "")).toLowerCase() === key; }); if (!dup) arr.push({ title: cleanTitle(rec.title) || rec.title, album: rec.album || "", image: rec.image || a.image, file: rec.file || "", duration: rec.duration || "" }); }); }

   function harvest() {
      try {
         var pool = [];
         if (window.wavecraftGenreCatalog && window.wavecraftGenreCatalog.length) pool = pool.concat(window.wavecraftGenreCatalog);
         if (window.WaveCraftStore && window.WaveCraftStore.SEED_SONGS) pool = pool.concat(window.WaveCraftStore.SEED_SONGS);
         if (typeof upcomingArtists !== "undefined" && upcomingArtists && upcomingArtists.length) pool = pool.concat(upcomingArtists.map(function (u) { return { title: u.title, artist: u.artist, album: u.album || u.title, image: u.image || u.playerImage, song: u.song, file: u.song }; }));
         document.querySelectorAll(".music-card").forEach(function (c) { var p = c.querySelector(".play-btn"), l = c.querySelector(".like-btn"); var s = p || l; var h = c.querySelector("h5,h4,h3"); pool.push({ title: (s && s.dataset.title) || c.dataset.title || (h ? h.textContent.trim() : ""), artist: (s && s.dataset.artist) || c.dataset.artist || "", album: "", image: (s && s.dataset.image) || ((c.querySelector("img") || {}).src || ""), song: (p && (p.dataset.song || p.dataset.file)) || "", file: (p && (p.dataset.song || p.dataset.file)) || "" }); });
         document.querySelectorAll("[data-artist]").forEach(function (el) { if (el.closest && el.closest(".music-card")) return; pool.push({ title: el.dataset.title || el.textContent.trim(), artist: el.dataset.artist || "", album: el.dataset.album || "", image: el.dataset.image || "", song: el.dataset.song || el.dataset.audio || "", file: el.dataset.song || el.dataset.audio || "" }); });
         pool.forEach(function (r) { var an = String(r.artist || r.artists || r.artistName || "").trim(); if (!an || !r.title) return; var img = String(r.image || r.cover || r.playerImage || ""); if (img.indexOf("nav-logo") !== -1) img = ""; var rec = { title: String(r.title).trim(), album: r.album || "", image: img, file: String(r.song || r.file || r.audio || r.src || ""), duration: r.duration || "", genre: r.genre || "" }; addSong(splitArtists(an), rec); });
         var extra = [["kizz-daniel", "Kizz Daniel", "img/kizz-daniel.jpg", "Afrobeats"], ["bnxn", "BNXN", "img/eja-meja.webp", "Afrobeats"], ["mayorkun", "Mayorkun", "img/in-my-head.jpg", "Afrobeats"], ["blaqbonez", "Blaqbonez", "img/chanel.jpg", "Hip-Hop"], ["black-sherif", "Black Sherif", "img/sacrifice.jpg", "Afrobeats"], ["king-promise", "King Promise", "img/chop-life.jpg", "Afrobeats"], ["gyakie", "Gyakie", "img/december.jpg", "Afrobeats"], ["faceless", "Faceless", "img/faceless.jpg", "Afrobeats"]];
         extra.forEach(function (e) { if (!getById(e[0])) ARTISTS.push({ id: e[0], name: e[1], image: e[2], genre: e[3], verified: false, tags: ["upcoming"], bio: "WaveCraft artist." }); });
      } catch (e) { }
   }
   function openArtist(id) { var a = getById(id) || findByName(id); if (!a) return; try { if (window.WaveCraftPlayer && window.WaveCraftPlayer.saveForNavigation) window.WaveCraftPlayer.saveForNavigation(); } catch (e) { } window.location.href = "artist.html?artist=" + encodeURIComponent(a.id); }
   window.WaveCraftArtists = { list: ARTISTS, slug: slug, getById: getById, findByName: findByName, songsFor: songsFor, albumsFor: albumsFor, byTag: byTag, openArtist: openArtist, harvest: harvest };
   harvest();
   if (document.readyState !== "loading") harvest(); else document.addEventListener("DOMContentLoaded", harvest);
   setTimeout(harvest, 800);
})();
