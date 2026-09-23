/* part 1: seed catalog + playlists */
(function () {
    var S = window.WaveCraftStore; if (!S || S.__aug1) return; S.__aug1 = true;
    var PK = S.PLAYLIST_KEY, SK = "wavecraftSeedVersion", SV = 2;
    var SEEDS = [
        { id: "song-001",
         title: "Last Last", 
         artist: "Burna Boy", 
         album: "Love, Damini", 
         cover: "img/burna last last.webp", 
         audio: "audio/Burna Boy - Last Last.mp3", 
         duration: "2:52" },

        { id: "song-002", 
          title: "Essence", 
          artist: "Wizkid", 
          album: "Made In Lagos", 
          cover: "img/wizkid essence.jpeg", 
          audio: "audio/Wizkid_Ft._Tems_-_Essence.mp3", 
          duration: "4:09" },

        { id: "song-003", 
          title: "Free Mind", 
          artist: "Tems", 
          album: "For Broken Ears", 
          cover: "img/tems free mind.jpg", 
          audio: "audio/Tems - Free Mind.mp3", 
          duration: "4:07" },

        { id: "song-004", 
          title: "Tornado", 
          artist: "Ayra Starr", 
          album: "The Year I Turned 21", 
          cover: "img/tornado.jpg", 
          audio: "audio/Ayra-Starr-Tornado.mp3", 
          duration: "2:51" },


        { id: "song-005", 
          title: "SLICK", 
          artist: "Victony", 
          album: "Stubborn", 
          cover: "img/slick.jpg", 
          audio: "audio/Victony-SLICK.mp3", 
          duration: "2:44" },

        { id: "song-006", 
          title: "YOU", 
          artist: "FOLA", 
          album: "Singles", 
          cover: "img/you.jpg", 
          audio: "audio/Victony-SLICK.mp3", 
          duration: "3:12" },

        { id: "song-007", 
          title: "Forgiveness", 
          artist: "Asake", 
          album: "Work Of Art", 
          cover: "img/asake.jpg", 
          audio: "audio/Asake-Forgiveness-(JustNaija.com).mp3", 
          duration: "3:05" },

        { id: "song-008", 
          title: "Pressure", 
          artist: "Seyi Vibez", 
          album: "Pressure", 
          cover: "img/seyi-vibes.jpg", 
          audio: "audio/Seyi-Vibez-Pressure-Official-Video-(CeeNaija.com).mp3", 
          duration: "3:21" },

        { id: "song-009", 
          title: "For Everybody", 
          artist: "Burna Boy", 
          album: "Afrobeats Hits", 
          cover: "img/Burna-boy.jpg", 
          audio: "audio/Burna-Boy-For-Everybody.mp3", 
          duration: "3:33" },

        { id: "song-010", 
          title: "Motion Sickness", 
          artist: "ODUMODUBLVCK", 
          album: "EZIOKWU", 
          cover: "img/odumodublvck.webp", 
          audio: "audio/ODUMODUBLVCK-MOTION-SICKNESS-feat-Zlatan.mp3", 
          duration: "3:02" }

        ];


    var SEEDPL = [
        { id: "afrobeats", 
          name: "Afrobeats", 
          description: "The best Afrobeats sounds, from Burna Boy to Asake.", 
          songs: ["song-001", "song-002", "song-007", "song-008", "song-009"] 
        },


        { id: "chill-vibes", 
          name: "Chill Vibes", 
          description: "Mellow records for slow evenings and long drives.", 
          songs: ["song-003", "song-004", "song-006", "song-005"] 
        },

        { id: "workout", 
          name: "Workout", 
          description: "High-energy bangers to keep you moving.", 
          songs: ["song-010", "song-005", "song-001", "song-009"] 
        },

        { id: "my-favorites", 
          name: "My Favorites", 
          description: "A starter stash of WaveCraft essentials.", 
          songs: ["song-002", "song-003", "song-009", "song-004"] }
        ];
    S.__seedById = function (id) { for (var i = 0; i < SEEDS.length; i++)
         { if (String(SEEDS[i].id) === String(id)) return S.normalizeSong(SEEDS[i], i); }
          return null;
         };

    S.SEED_SONGS = SEEDS;
    try {
        var ver = null, ex = null; try { ver = localStorage.getItem(SK); } catch (e) { }
        try { var r = localStorage.getItem(PK); ex = r ? JSON.parse(r) : null; } catch (e2) { }
        if (ver !== String(SV) && (!ex || !ex.length)) { var sd = SEEDPL.map(function (p, i)
          { return { id: p.id, name: p.name, description: p.description, songs: p.songs.map(S.__seedById).filter(Boolean), createdAt: Date.now() - (i * 1000), artwork: "" }; });
           S.savePlaylists(sd); try { localStorage.setItem(SK, String(SV)); } catch (e) { }
         }
        
         else if (ver !== String(SV)) { try { localStorage.setItem(SK, String(SV)); } catch (e) { } }
    } catch (e) { }
    
})();
