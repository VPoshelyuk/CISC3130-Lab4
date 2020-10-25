//import the module that comtains Artist and TopStreamingArtists classes
const Queue = require('./queue.js');
const Playlist = require('./playlist.js');
const SongHistoryList = require('./songHistoryList.js');
// file system node module to be able to read files
const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');
/*
    main method that starts the program and handles the input
    * @return {string[]}
 */
const porcessData = () => {
    const files = [];
    const dir = '../data/';
    
    fs.readdirSync(dir).forEach(filename => {
        const filepath = path.resolve(dir, filename);
        const weeklyQueue = new Queue(filepath);
        weeklyQueue.createSortedTrackList()
        files.push(weeklyQueue);
    });

    return files;
}

const createPlaylist = (data) => {
    let megaQueue = new Queue();
    data.forEach((queue) => {
        megaQueue = megaQueue.merge(megaQueue, queue)
    })
    let playlist = new Playlist();
    megaQueue.tracks.forEach((track) => {
        playlist.add(track[0], track[1])
    })

    return playlist;
}

const cropTheLine = (line) => {
    const width = 28;
    if (line.length >= width) {
        console.log('|        ', line.substring(0, width - 3), '...       |')
    } else {
        console.log(`|${line.padStart(width)}                 |`);
    }
}

const drawPlayer = (artist, song) => {
    console.clear()
    console.log('-----------------------------------------------');
    cropTheLine(artist)
    cropTheLine(song)
    console.log('|    <<               ||                >>    |');
    console.log('-----------------------------------------------');

}

const playerInterface = (playlist, historyList) => {
    const question = 
    'Options: \n' +
    'P: Show Playlist\n' +
    'H: Show History List\n' +
    '<: Previous | >: Next\n' +
    'E: Exit(Not streamed songs and history will be written into files)\n' +
    'What\'s the move? ';
    let answer = '';
    let currentlyPlaying = playlist.poll();
    drawPlayer(currentlyPlaying.artistName, currentlyPlaying.songName)
    while (answer !== 'E') {
        answer = readline.question(question);
        if (answer === '>' && !playlist.isEmpty()) {
            historyList.push(currentlyPlaying);
            currentlyPlaying = playlist.poll();
            drawPlayer(currentlyPlaying.artistName, currentlyPlaying.songName)
        } else if (answer === '<' && !historyList.isEmpty()) {
            currentlyPlaying = historyList.pop();
            drawPlayer(currentlyPlaying.artistName, currentlyPlaying.songName)
        } else if (answer === 'H') {
            drawPlayer(currentlyPlaying.artistName, currentlyPlaying.songName)
            historyList.print();
        } else if (answer === 'P') {
            drawPlayer(currentlyPlaying.artistName, currentlyPlaying.songName)
            playlist.print();
        } else {
            if (answer === '<') {
                drawPlayer('        End of History List', '  >> is the only option now')
            } else if (answer === '>') {
                drawPlayer('        End of Playlist', '  << is the only option now')
            } else {
                drawPlayer(currentlyPlaying.artistName, currentlyPlaying.songName)
            }
        }
    }

    playlist.log();
    historyList.log();
}

// call the porcessData method and handle the input data
const data = porcessData();
const playlist = createPlaylist(data);
const historyList = new SongHistoryList();
playerInterface(playlist, historyList);