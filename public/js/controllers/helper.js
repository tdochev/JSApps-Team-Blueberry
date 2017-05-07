var controllerHelpers = function() {
    function FilterSongsByArtst(artist, SongList) {
        SongList = JSON.stringify(SongList);
        let songsByHis = [];
        for (let i = 0; i < SongList.length; i += 1) {
            if (songList[i].artist.name === artist.name) {
                songsByHis.push(songList[i]);
            }
            return JSON.parse(songsByHis);
        }
    }

    function FilterSongByAlbum(album, SongList) {
        SongList = JSON.stringify(SongList);
        let songsInAlbum = [];
        for (let i = 0; i < SongList.length; i += 1) {
            if (songList[i].album === album) {
                songsInAlbum.push(songList[i]);
            }
        }
        return JSON.parse(songsInAlbum);
    }

    function FilterByRating(SongList) {
        SongList.sort(function(a, b) {
            return a.rating - b.rating;
        });

    }

    return {
        FilterSongsByArtst,
        FilterSongByAlbum,
        FilterByRating
    };
}();