'use strict'

var listsOfSongs = [];
class Song {
    constructor(artist, album, likes, isThisASingle) {
        this._artist = artist;
        this._album = album;
        this._isThisASingle = isThisASingle;
        this.likes = 0;
        listsOfSongs.push(this);
    }
    get artist() {
        return this._artist;
    }
    get album() {
        return this._album;
    }
    get likes() {
        return this._likes;
    }
    get isThisASingle() {
        return this._isThisASingle;
    }

    Like() {
        this._likes += 1;
    }
    Dislike() {
        this._likes -= 1;
    }
}

export default class SongList {
    constructor() {
        this.list = listsOfSongs;
    }
    get list() {
        return JSON.stringify(this.list);
    }
}