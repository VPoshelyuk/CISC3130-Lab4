// file system node module to be able to write to file
const fs = require('fs');

/*
    SongHistoryList class
    Available methods:
    -> push
    -> pop
    -> isEmpty
    -> print
    -> log
 */
class SongHistoryList {
    constructor() {
        this.head = null
    }

    /*
        * @param {Song} song
    */
    push (song) {
        if(this.head){//if stack is not empty, make new node point to a head
            song.next = this.head;
        } else {//make sure the node that we are passing is not pointing to anything
            song.next = null;
        }
        //replace head with the new node
        this.head = song;
    }

    /*
        * @return {Song}
    */
    pop () {
        if(!this.head){//if stack is empty, don't do anything
            return;
        }
        const song = this.head;//grab the song
        this.head = this.head.next;//replace nead node with the next one
        song.next = null;//make sure the node is not pointing to anything
        return song;//return it
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
        console.log('Current history list:');
        if (!this.head){//if history list is empty
            console.log('Your history list is empty!');
            console.log('----------');
            return;
        }
        let song = this.head;
        while (song) {//iterate over all the nodes while printing
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
        const fileName = `../output/song-history-list.txt`;
        // open stream
        const writeStream = fs.createWriteStream(fileName);
        writeStream.write('----------\n');
        writeStream.write('History list:\n');
        if (!this.head){//if history list is empty
            writeStream.write('Your history list is empty!\n');
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
            console.log("\x1b[32m", `Song history list was succesfully written to ${fileName}`, "\x1b[0m");
        });
        // close the stream
        writeStream.end();
    }
}

//export class
module.exports = SongHistoryList;