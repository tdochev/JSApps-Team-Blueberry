'use strict'

function validateListOfArtist(listOfArtists) {

    listOfArtists.forEach(function(artst) {
        if (typeof artst !== 'Artist') {
            throw `This list contains not only artists`;
        }
    });
    return this;
}
class Artist {
    constructor(name, bandHeIsPartOf, albums, listOfArtists) {
        this._name = name;
        this._bandHeIsPartOf = bandHeIsPartOf;
        this._albums = albums;

    }
    get name() {
        return this._name;
    }
    get bandHeIsPartOf() {
        return this._bandHeIsPartOf;
    }
    set bandHeIsPartOf(bandHeIsPartOf) {
        this._bandHeIsPartOf = bandHeIsPartOf;
    }
    get albums() {
        return this._albums;
    }
};

var output = [];
var listOfArtistAsObject = {};
class ArtistController {
    constructor(listOfArtists) {
        this._listOfArtists = listOfArtists;
    }
    get listOfArtists() {

        return JSON.stringify(this._listOfArtists);
    }
    set listOfArtists(listOfArtists) {
        listOfArtistAsObject = JSON.parse(listOfArtists);

        validateListOfArtist(listOfArtists);
        this._listOfArtists = listOfArtists;
    };
};