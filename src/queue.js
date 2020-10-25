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

    add (track) {
        this.tracks.push(track);
    };

    poll () {
        return this.tracks.shift();
    };

    peek () {
        return this.tracks[0]
    }

    isEmpty () {
        return this.tracks.length === 0;
    };

    sort () {
        return this.tracks.sort((a, b) => a[1].localeCompare(b[1]));
    }

    createSortedTrackList () {
        if(!this.filepath) return;

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
        //return sorted week queue
        this.sort();
    }

    merge(q1, q2) {
        const merged = new Queue();

        while (!q1.isEmpty() && !q2.isEmpty()) {
            const q1Track = q1.peek();
            const q2Track = q2.peek();
            if (q1Track[1].localeCompare(q2Track[1]) > 0) {
                merged.add(q1.poll());
            } else if (q1Track[1].localeCompare(q2Track[1]) < 0) {
                merged.add(q2.poll());
            } else {
                merged.add(q1.poll());
                q2.poll();
            }
        }

        while (!q1.isEmpty()) {
            merged.add(q1.poll());
        }

        while (!q2.isEmpty()) {
            merged.add(q2.poll());
        }

        return merged;
    }
}

//export classes
module.exports = Queue;