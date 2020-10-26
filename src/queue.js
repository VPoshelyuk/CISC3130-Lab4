// file system node module to be able to read files
const fs = require('fs');

/*
    Queue class
    Available methods:
    -> add
    -> poll
    -> peek
    -> isEmpty
    -> sort
    -> createSortedTrackList
    -> merge
 */
class Queue {
    constructor(filepath=null) {
        this.tracks = []
        this.filepath = filepath
    }

    /*
        * @param {Song} track
    */
    add (track) {
        //add new track into the queue
        this.tracks.push(track);
    };

    /*
        * @return {string[]}
    */
    poll () {
        //remove first track of the queue and return it
        return this.tracks.shift();
    };

    /*
        * @return {string[]}
    */
    peek () {
        //return first track of the queue
        return this.tracks[0]
    }

    /*
        * @return {bool}
    */
    isEmpty () {
        //chech if there are any tracks in the queue
        return this.tracks.length === 0;
    };

    /*
        * @return {string[][]}
    */
    sort () {
        //sort an array of artist name/song name pairs into an
        //ascending order of song names
        return this.tracks.sort((a, b) => a[1].localeCompare(b[1]));
    }

    /*
        adds tracks into the queue and then sorts it
    */
    createSortedTrackList () {
        //if filepath not provided on the Queue creation, this method is unavailable
        if(!this.filepath) return;
        //get the data from the file found at the filepath
        const fileData = fs.readFileSync(this.filepath, 'utf8').split('\n')
        fileData.forEach((line) => { // read every line of input file
            // we only need to process lines that start with a number,
            // since these are the ones that holding the data we need
            if("123456789".includes(line[0])){ 
                // split the line by a "special CSV regex" from where we need
                // only the 2nd & 3rd arguments, which are song and artist names
                let song = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1];
                let artist = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[2];
                // remove quotation marks from the names consisting of 2 or more words
                if(artist.startsWith("\"")) {
                    artist = artist.substring(1, artist.length - 1);
                }
                //enque every new track into our Queue
                this.add([artist, song.split("\"").join("")]);
            }
        });
        //sort obtained queue
        this.sort();
    }

    /*
        * @param {Queue} q1
        * @param {Queue} q2
        * @return {Queue}
    */
    merge(q1, q2) {
        //create new empty queue
        const merged = new Queue();
        //iterate over both queues until one of them is empty
        while (!q1.isEmpty() && !q2.isEmpty()) {
            const q1Track = q1.peek();//get current q1 track info
            const q2Track = q2.peek();//get current q2 track info
            //compare names of the tracks and add into new empty Queue
            if (q1Track[1].localeCompare(q2Track[1]) > 0) {
                merged.add(q1.poll());
            } else if (q1Track[1].localeCompare(q2Track[1]) < 0) {
                merged.add(q2.poll());
            } else {
                merged.add(q1.poll());
                q2.poll();
            }
        }

        //if there are leftover elements in one of the queues
        //add all of them at the end of the new queue
        while (!q1.isEmpty()) {
            merged.add(q1.poll());
        }
        while (!q2.isEmpty()) {
            merged.add(q2.poll());
        }

        //return new queue with all the tracks merged in the correct order
        return merged;
    }
}

//export classes
module.exports = Queue;