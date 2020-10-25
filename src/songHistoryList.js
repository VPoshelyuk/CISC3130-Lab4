const _ = require('./song.js');
// file system node module to be able to read files
const fs = require('fs');

class SongHistoryList {
    constructor() {
        this.head = null
    }

    push (song) {
        if(this.head){
            song.next = this.head;
            this.head = song;
        } else {
            song.next = null;
            this.head = song;
        }
    }

    pop () {
        if(!this.head){
            return;
        }
        const song = this.head;
        this.head = this.head.next;
        song.next = null;
        return song;
    }

    peek () {
        if(!this.head){
            return;
        }
        return this.head;
    }   

    isEmpty () {
        return !this.head ? true : false;
    }

    print () {
        console.log('----------');
        console.log('Current history list:');
        if (!this.head){
            console.log('Your history list is empty!');
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
        write artist names and their appearances numbers into a file
        * @param {string} filePostfix
    */
   log () {
    // full file name including file path
    const fileName = `../output/song-history-list.txt`;
    // open stream
    const writeStream = fs.createWriteStream(fileName);
    writeStream.write('----------\n');
    writeStream.write('History list:\n');
    if (!this.head){
        writeStream.write('Your history list is empty!\n');
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
        console.log("\x1b[32m", `Song history list was succesfully written to ${fileName}`, "\x1b[0m");
    });
    // close the stream
    writeStream.end();
}
}

//export class
module.exports = SongHistoryList;