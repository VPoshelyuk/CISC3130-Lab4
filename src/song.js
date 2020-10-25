/*
    Song class
    @param {string} artistName
    @param {string} songName
    @param {Song} next
 */
class Song {
    //class constructor
    constructor(artistName, songName, next = null) {
        this.artistName = artistName;
        this.songName = songName;
        this.next = next;
    }
}

//export Song class
module.exports = Song;