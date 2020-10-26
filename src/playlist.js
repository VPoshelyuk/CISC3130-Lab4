const Song = require('./song.js');
// file system node module to be able to write to file
const fs = require('fs');

/*
    Playlist class
    Available methods:
    -> add
    -> poll
    -> isEmpty
    -> print
    -> log
 */
class Playlist {
    constructor(){
        this.head = null;
        this.tail = null;
    }
     
    /*
        * @param {atring} artistName
        * @param {atring} songName
    */
    add (artistName, songName) {
        //create a new Song with arguments provided
        let newSong = new Song(artistName, songName);
        if (!this.head){//if Playlist is empty, point both head and tail to the new node
            this.head = newSong;
            this.tail = newSong;
        } else {//else push the new node into the end of playlist
            this.tail.next = newSong;
            this.tail = newSong;
        }
    }
//     (depreciated/too good to delete)
//     addSong (song) {
//         if (!this.head){ 
//            this.head = song;
//            this.tail = song;
//         } else {
//            this.tail.next = song;
//            this.tail = song;
//         }
//    }
    /*
        * @return {Song}
    */
    poll () {
        if (!this.head) return;//if playlist is empty, return nothing
        let song = this.head;//grad the first song from the queue
    
        if (this.head === this.tail) {//check if this is the last element in the playlist
            this.tail = null;
        }
        this.head = song.next;//move head to the next node
        //return retrieved Song
        return song;
    }

    /*
        check if the playlist is empty
        * @return {bool}
    */
    isEmpty () {
        return !this.head ? true : false;
    }

    /*
        formatted print of all the nodes that playlist contains
    */
    print () {
        console.clear();
        console.log('----------');
        console.log('Current playlist:');
        if (!this.head){ //if playlist is empty
            console.log('No more tracks left in your playlist!');
            console.log('----------');
            return;
        }
        let song = this.head;
        while (song) { //iterate over all the nodes while printing
            console.log(`${song.artistName} - ${song.songName}`);
            song = song.next;
        }
        console.log('----------');
    }

    /*
        write all the nodes that playlist contains into a file
    */
    log () {
        // full file name including file path
        const fileName = `../output/playlistLeftovers.txt`;
        // open stream
        const writeStream = fs.createWriteStream(fileName);
        writeStream.write('----------\n');
        writeStream.write('Songs left in playlist:\n');
        if (!this.head){//if playlist is empty
            writeStream.write('Wow! You listened to every single song!\n');
            writeStream.write('----------');
            return;
        }
        let song = this.head;
        while (song) {//iterate over all the nodes while printing
            writeStream.write(`${song.artistName} - ${song.songName}\n`);
            song = song.next;
        }
        writeStream.write('----------');
        writeStream.on('finish', () => {
            console.log("\x1b[32m", `Unstreamed playlist data was succesfully written to ${fileName}`, "\x1b[0m");
        });
        // close the stream
        writeStream.end();
    }
}

//export class
module.exports = Playlist;
