const Song = require('./song.js');
// file system node module to be able to read files
const fs = require('fs');

/*
    Playlist class
    Available methods:
    -> add
    -> poll
    -> peek
    -> isEmpty
    -> print
    -> log
 */
class Playlist {
    constructor(){
        this.head = null;
        this.tail = null;
    }
     
    add (artistName, songName) {
         let newSong = new Song(artistName, songName);
         if (!this.head){ 
            this.head = newSong;
            this.tail = newSong;
         } else {
            this.tail.next = newSong;
            this.tail = newSong;
         }
    }

//     addSong (song) {
//         if (!this.head){ 
//            this.head = song;
//            this.tail = song;
//         } else {
//            this.tail.next = song;
//            this.tail = song;
//         }
//    }

    poll () {
        if (!this.head) return;
        let song = this.head; 
    
        if (this.head === this.tail) {
            this.tail = null;
        }
        this.head = this.head.next;

        return song;
    }

    peek () {
        return this.head; 
    }

    isEmpty () {
        return !this.head ? true : false;
    }

    print () {
        console.log('----------');
        console.log('Current playlist:');
        if (!this.head){
            console.log('No more tracks left in your playlist!');
            console.log('----------');
            return;
        }
        let song = this.head;
        while (song.next) {
            song = song.next;
            console.log(`${song.artistName} - ${song.songName}`);
        }
        console.log('----------');
    }

    /*
        write into a file
    */
    log () {
        // full file name including file path
        const fileName = `../output/playlistLeftovers.txt`;
        // open stream
        const writeStream = fs.createWriteStream(fileName);
        writeStream.write('----------\n');
        writeStream.write('Songs left in playlist:\n');
        if (!this.head){
            writeStream.write('Wow! You listened to every single song!\n');
            writeStream.write('----------');
            return;
        }
        let song = this.head;
        while (song.next) {
            song = song.next;
            writeStream.write(`${song.artistName} - ${song.songName}\n`);
        }
        writeStream.write('----------');
        writeStream.on('finish', () => {
            console.log("\x1b[32m", `Unstreamed playlist data was succesfully written to ${fileName}`, "\x1b[0m");
        });
        // close the stream
        writeStream.end();
    }
}

//export classes
module.exports = Playlist;
