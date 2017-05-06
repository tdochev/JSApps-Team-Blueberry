class ArtistsController {
    constructor(name, listOfSongs, bandHeIsPartOf, albums) {
        this.name = name;
        this.bandHeIsPartOf = bandHeIsPartOf;
        this.albums = albums;
    }
    get name() {
        return this.name;
    }
    set name(name) {
        this._name = name;
    }
    get bandHeIsPartOf() {
        return this.Name;
    }
    set bandHeIsPartOf(bandHeIsPartOf) {
        this._bandHeIsPartOf = bandHeIsPartOf;
    }

}