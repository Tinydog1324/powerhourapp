const fileInput = document.getElementById("upload-file");
const playlist = document.getElementById("playlist");
const player = document.getElementById("player");
let songs = [];
let currentSongIndex = -1; // Track the index of the currently playing song

fileInput.addEventListener("change", function () {
  for (let i = 0; i < fileInput.files.length; i++) {
    let file = fileInput.files[i];
    let song = {
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
      row: null
    };
    songs.push(song);
    addSongToPlaylist(song);
  }
});

function addSongToPlaylist(song) {
  let row = playlist.insertRow();
  let nameCell = row.insertCell(0);
  let durationCell = row.insertCell(1);
  let actionCell = row.insertCell(2);
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    deleteSong(song);
  });
  nameCell.innerHTML = song.name;
  durationCell.innerHTML = "1 minute";
  actionCell.innerHTML = '<button onclick="playSong(this)">Play</button>';
  actionCell.appendChild(deleteButton);

  song.row = row;
}

function playSong(button) {
  let index = button.parentNode.parentNode.rowIndex - 1;

  // Check if the same song is clicked again
  if (index === currentSongIndex) {
    // If the player is currently playing, stop it and reset
    if (!player.paused) {
      player.pause();
      player.currentTime = 0;
    } else {
      // If the player is paused, resume playing
      player.play();
    }
  } else {
    // Play a new song
    if (currentSongIndex !== -1) {
      // Stop the currently playing song and reset it
      player.pause();
      player.currentTime = 0;
    }

    player.src = songs[index].url;
    player.play();
    currentSongIndex = index;

   
  

    // Listen for the "timeupdate" event to stop the player after 60 seconds
    player.addEventListener("timeupdate", function checkDuration () {
        if (player.currentTime >= 60) {
          
          player.removeEventListener("timeupdate", checkDuration);
          playNextSong(); // Call playNextSong to play the next song
          
        }
      });


       // Listen for the "ended" event to reset the player when the song finishes
    player.addEventListener("ended", function() {
      player.currentTime = 0;
      currentSongIndex = -1;
      playNextSong();
    });
  }
}



function playNextSong() {
  currentSongIndex++;
  if (currentSongIndex < songs.length) {
    let nextSong = songs[currentSongIndex];
    player.src = nextSong.url;
    player.play();

    // Listen for the "timeupdate" event to check if the song has played for 60 seconds
    player.addEventListener("timeupdate", function checkDuration() {
      if (player.currentTime >= 60) {
        player.removeEventListener("timeupdate", checkDuration);
        playNextSong(); // Call playNextSong recursively to play the next song
      }
    });
  } else {
    // All songs have been played, stop the player
    player.pause();
    player.currentTime = 0;
    currentSongIndex = -1;
  }
}


function deleteSong(song) {
  let index = songs.indexOf(song);

  // Revoke the URL object to release the file resources
  URL.revokeObjectURL(song.url);

  // Remove the song from the array
  songs.splice(index, 1);

  // Remove the row from the table
  let row = song.row;
  playlist.deleteRow(row.rowIndex);

  // If the deleted song was the currently playing song, stop and reset the player
  if (index === currentSongIndex) {
    player.pause();
    player.currentTime = 0;
    currentSongIndex = -1;
  }

  song.row = null;

  const fileInput = document.getElementById('upload-file');
  fileInput.value = '';
}

function addPlayer() {
  let playerName = document.querySelector("#player-name").value;
  let playersList = document.querySelector("#players");
  let playerItem = document.createElement("li");
  playerItem.innerHTML = playerName;
  playersList.appendChild(playerItem);
  document.querySelector("#player-name").value = "";
}

function deletePlayer() {
  let playersList = document.querySelector("#players");
  playersList.innerHTML = "";
}

  




const imageContainer = document.querySelector('.image-container');
const whitecapImage = document.querySelector('.whitecap');
const newImage = document.querySelector('.new-image');

imageContainer.addEventListener('mouseenter', () => {
  whitecapImage.style.display = 'none';
  newImage.style.display = 'block';
});

imageContainer.addEventListener('mouseleave', () => {
  whitecapImage.style.display = 'block';
  newImage.style.display = 'none';
});

