# CISC3130-Lab4
## Your VIP client wants to listen to the music tracks in this week's latest song list to review them and get a sense for what they sound like. This time your client wants you to process all the full weeks of the fiscal quarter that just passed.

---
### About
---
This CLI tool allows you to parse last quarter's CSV reports from [SpotifyCharts](https://spotifycharts.com/regional) and provides you with the "music player" interface, where you can "listen" to the music from the playlist created from tracks gathered from provided CSVs.
This program has a very minimalistic look, as soon as you start it, you will be provided with the "music player" interface and the list of options which includes:
* Playing next track
* Playing previous track (if your history is not empty)
* Displaying all the songs remaining in the Playlist  
* Displaying all the songs in Song List History  

Also, the thing worth mentioning is that as soon as you exit the program you will be provided with 2 txt files, one of them will have all the unlistened songs left in your playlist and the other one will hold your listening history.

---
### Dependencies
---
- Terminal for command line access  

The main piece of software that this repo holds is a Node app, for that to run you will need:
- Node.js v10.22.0 or newer (You can check your Node version by running ```node -v``` in your Terminal) 

Since node dosn't provide a module for reading user input synchronously, npm is also required to install one single module🤷‍♂️:
- npm v6.14.7 or never (You can check your npm version by running ```npm -v``` in your Terminal or visit [this page](https://www.npmjs.com/get-npm) for installation instructions) 

---
### Setup and Usage
---
1. While you are in the home directory of this repo, press on the green "Code" button in the top right corner.
2. You will be prompted to copy an SSH or HTTPS URL to clone this repo to your local machine.
3. After you got that URL, go to the Terminal on your local machine(I will assume you are on Mac or Linux) and run the following command: 
```zsh
git clone *PASTE THE LINK HERE*
```
4. After all the files are copied to your local machine navigate to the newly created directory using the following command 
```zsh 
cd CISC3130-Lab4
```  
5. There is a package.json file provided for your convenience, so while inside `CISC3130-Lab4` run `npm i` or `npm install`
6. After all the dependemcies are installed(there is only one), navigate to the `src` directory:
```zsh 
cd CISC3130-Lab4/src/
```  
7. When you are inside the `src` directory, run the following command and you will be presented with the "music player" right in your command line: 
```zsh
node index.js
```  

***NOTE: Filepath should be a path to the file saved locally, also no spaces in the Pathname are allowed.***
