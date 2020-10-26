//import all the class modules
const Queue = require('./queue.js');
const Playlist = require('./playlist.js');
const SongHistoryList = require('./songHistoryList.js');
// modules to handle input
const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');

/*
    main method that starts the program and handles the input
    * @return {Queue[]}
*/
const porcessData = () => {
    //array that will hold processed data
    const files = [];
    //data directory
    const dir = '../data/';
    //read each file from data directory
    fs.readdirSync(dir).forEach(filename => {
        //create a complete path using path module
        const filepath = path.resolve(dir, filename);
        //creeate new Queue for the CSV at the given filepath
        const weeklyQueue = new Queue(filepath);
        //sort the Queue
        weeklyQueue.createSortedTrackList()
        //push sorted Queue into array
        files.push(weeklyQueue);
    });
    //return array of Queues
    return files;
}

/*
    create a Playlist from array of Queues
    * @return {Playlist}
*/
const createPlaylist = (data) => {
    //empty Queue that will have all the Queues merged in in the correct order 
    let megaQueue = new Queue();
    //merge each queue in the files array into megaQueue
    data.forEach((queue) => {
        megaQueue = megaQueue.merge(megaQueue, queue)
    })
    //init an empty Playlist
    let playlist = new Playlist();
    //appeng each track in megaQueue to playlist
    megaQueue.tracks.forEach((track) => {
        playlist.add(track[0], track[1])
    })
    //return Playlist with all of the songs from provided files
    return playlist;
}

/*
    misc method used for fitting the names
    into a "player" interface
*/
const cropTheLine = (line) => {
    const width = 28;
    //if line is longer than max allowed size, crop it
    if (line.length >= width) {
        console.log('|        ', line.substring(0, width - 3), '...       |');
    } else {
        console.log(`|${line.padStart(width)}                 |`);
    }
}

/*
    method used to draw a "player" interface
*/
const drawPlayer = (artist, song) => {
    //clear console, so our "player" always appears at the same place
    console.clear();
    //draw "player" out
    console.log('-----------------------------------------------');
    cropTheLine(artist);
    cropTheLine(song);
    console.log('|    <<               ||                >>    |');
    console.log('-----------------------------------------------');

}

/*
    method used to handle all user interactions
*/
const playerInterface = (playlist, historyList) => {
    //variables declaration
    const question = 
    'Options: \n' +
    'P: Show Playlist\n' +
    'H: Show History List\n' +
    '<: Previous | >: Next\n' +
    'E: Exit(Not streamed songs and history will be written into files)\n' +
    'What\'s the move? ';
    let answer = '';
    let currentlyPlaying = playlist.poll();
    //if playlist is empty, exit
    if (!currentlyPlaying) return;
    historyList.push(currentlyPlaying); //push current track into history
    //our player first displayed with the first song already playing
    drawPlayer(currentlyPlaying.artistName, currentlyPlaying.songName)
    //do somrthing till user decides to exit
    while (answer !== 'E') {
        //prompt user with available opions
        answer = readline.question(question);
        if (answer === '>' && !playlist.isEmpty()) { //if user decides to play next track and it exists
            currentlyPlaying = playlist.poll(); //poll the next one from playlist
            historyList.push(currentlyPlaying); //push current track into history
            drawPlayer(currentlyPlaying.artistName, currentlyPlaying.songName) //show the "player"
        } else if (answer === '<' && !historyList.isEmpty()) { //if user decides to play previous track and it exists
            currentlyPlaying = historyList.pop(); //pop from history
            //track is not added back into the playlist,
            //because I don't think it's reasonable to add it in the end
            //and if we decide to add it into the front, it will 
            //violate the queue interface rules
            drawPlayer(currentlyPlaying.artistName, currentlyPlaying.songName) //show the "player"
        } else if (answer === 'H') {
            historyList.print(); //print out all the tracks currently stored in the history list
        } else if (answer === 'P') {
            playlist.print(); //print out all the tracks left in the playlist
        } else {
            currentlyPlaying = null;
            if (answer === '<') {
                //if user wants to move back, but song history is empty
                //present them with an appropriate error message
                drawPlayer('        End of History List', '  >> is the only option now')
            } else if (answer === '>') { 
                //if user wants to move forward, but there are no more tracks left in the playlist
                //present them with an appropriate error message
                drawPlayer('        End of Playlist', '  << is the only option now')
            } else { //if user provides an invalid input, rerender
                drawPlayer('              Wrong Input', '')
            }
        }
    }
    //after user exits the program
    //we log all the data into files
    playlist.log();
    historyList.log();
}

//call the porcessData method and handle the input data
const data = porcessData();
//call the playlist method to convert all the data into PLaylist format
const playlist = createPlaylist(data);
//create empty SongHistoryList 
const historyList = new SongHistoryList();
//function responsible for user interactions
playerInterface(playlist, historyList);