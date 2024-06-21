document.querySelector("#home").addEventListener("click", () => {
    window.open("index.html", "_self");
});

// Direct to the album page
let selectAlbum = document.querySelectorAll(".album");
selectAlbum.forEach(selAlbum => {
    selAlbum.addEventListener("click", function() {
        var img = this.querySelector("img");
        var albumName = img.getAttribute("alt");

        localStorage.setItem("albumName", albumName);

        window.open("album.html", "_self");
    });
});

// Show the selected album
window.onload = function() {
    let showAlbum = document.querySelectorAll(".albumSongs");
    showAlbum.forEach(album => {
        album.classList.add("hidden");
    });

    var albumName = localStorage.getItem("albumName");
    var albumId = document.getElementById(albumName);

    if (albumId) {
        albumId.classList.remove("hidden");
    }
};

let albumNameId = localStorage.getItem("albumName")
let startMusic = document.querySelectorAll(`#${albumNameId} h2`);
let myProgressBar = document.querySelector("#progressBar");
let audioElement;
let songName;
let songList = [];

startMusic.forEach(function(h2Element) {
    songList.push(h2Element.innerHTML);
});
console.log(songList)

// Function to play a song
function playSong(song) {
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }

    audioElement = new Audio(`./songs/${song}.mp3`);
    audioElement.play();

    if(audioElement) {
        audioElement.addEventListener("ended", function() {
            console.log("Audio playback completed");
            nextSong();
        });
    }

    audioElement.addEventListener("timeupdate", updateProgressBar);
    togglePlayPauseButtons();

    console.log("Song is playing")
}

function updateProgressBar() {
    if (audioElement && audioElement.duration) {
        var progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
}

myProgressBar.addEventListener("change", function() {
    if (audioElement) {
        audioElement.currentTime = parseInt((myProgressBar.value / 100) * audioElement.duration);
    }
});

// Function to toggle play and pause buttons
function togglePlayPauseButtons() {
    const playBtn = document.querySelector("#playBtn");
    const pauseBtn = document.querySelector("#pauseBtn");

    if (audioElement.paused) {
        playBtn.classList.remove("hidden");
        pauseBtn.classList.add("hidden");
    } else {
        playBtn.classList.add("hidden");
        pauseBtn.classList.remove("hidden");
    }
}

// Add event listeners to start music on click
startMusic.forEach(album => {
    album.addEventListener("click", function() {
        songName = this.innerHTML;
        playSong(songName);
        togglePlayPauseButtons();
    });
});


// Play and pause music
document.querySelector("#playBtn").addEventListener("click", function() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
    togglePlayPauseButtons();
});

document.querySelector("#pauseBtn").addEventListener("click", function() {
    audioElement.pause();
    togglePlayPauseButtons();
});

// prev song and next song
document.querySelector("#prevBtn").addEventListener("click", function() {
    var songIndex = songList.indexOf(`${songName}`)
    console.log(songIndex)

    if (songIndex === 0) {
        songIndex = songList.length - 1
    } else {
        songIndex--
    }

    playSong(songList[songIndex]);
    console.log(songIndex)
    songName = songList[songIndex]
})

document.querySelector("#nextBtn").addEventListener("click", function() {
    nextSong()
})

function nextSong() {
    var songIndex = songList.indexOf(`${songName}`)
    console.log(songIndex)

    if (songIndex === songList.length - 1) {
        songIndex = 0
    } else {
        songIndex++
    }

    playSong(songList[songIndex]);
    console.log(songIndex)
    songName = songList[songIndex]
}

let isAudioPlaying = false; // Variable to track the state of audio playback

// Add event listener for keydown event on the document
document.addEventListener("keydown", function(event) {
    if (event.key === " ") {
        if (isAudioPlaying) {
            audioElement.pause();
            playBtn.classList.remove("hidden");
            pauseBtn.classList.add("hidden");
        } else {
            audioElement.play();
            playBtn.classList.add("hidden");
            pauseBtn.classList.remove("hidden");
        }
        // Update the state of isAudioPlaying
        isAudioPlaying = !isAudioPlaying;
    }
});

// Event listener to update isAudioPlaying when the audio playback state changes
audioElement.addEventListener("play", function() {
    isAudioPlaying = true;
});

audioElement.addEventListener("pause", function() {
    isAudioPlaying = false;
});



