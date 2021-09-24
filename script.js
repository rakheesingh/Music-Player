const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
let previous = document.querySelector("#prev");
let play = document.querySelector("#curr");
let next = document.querySelector("#next");
let audio = document.querySelector("#audio");
let progress_container = document.querySelector("#progress-container");
let progress = document.querySelector("#progress");
let currentTimeEl = document.querySelector("#current-time");
let durationEle = document.querySelector("#duration");

let isPlaying = false;
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacanto design",
  },
  {
    name: "jacinto-2",
    displayName: "Electric Chill Machine(Remix)",
    artist: "Blue Sony",
  },
  {
    name: "jacinto-3",
    displayName: "Seven Nation Army(Remix)",
    artist: "Honey Singh",
  },
  {
    name: "metric-1",
    displayName: "Sexy on Beach",
    artist: "Johnson Pery",
  },
];

function playSong() {
  isPlaying = true;
  play.classList.replace("fa-play", "fa-pause");
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  play.classList.replace("fa-pause", "fa-play");
  audio.pause();
}

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.setAttribute("src", `img/${song.name}.jpg`);
  audio.setAttribute("src", `music/${song.name}.mp3`);
  playSong();
}

let songIndex = 0;

function nextSong() {
  pauseSong();
  songIndex = (songIndex + 1) % 4;
  loadSong(songs[songIndex]);
}

function prevSong() {
  pauseSong();
  songIndex--;
  songIndex = songIndex < 0 ? 3 : songIndex;
  loadSong(songs[songIndex]);
}

function updateProgessBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    progessPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progessPercentage}%`;
    //Duration of the Audio
    let durationMinute = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    //Delay Switching Duration in order to avoid NAN
    if (durationSeconds)
      durationEle.textContent = `${durationMinute}:${durationSeconds}`;

    //Duration of the Audio
    let currMinute = Math.floor(currentTime / 60);
    let currSeconds = Math.floor(currentTime % 60);
    if (currSeconds < 10) currSeconds = `0${currSeconds}`;
    //Delay Switching Duration in order to avoid NAN
    if (currSeconds) currentTimeEl.textContent = `${currMinute}:${currSeconds}`;
  }
}

function setProgressBar(e) {
  let actualWidth = this.clientWidth;
  let clickWidth = e.offsetX;
  let { duration } = audio;
  console.log(actualWidth, clickWidth);
  let percentSong = clickWidth / actualWidth;
  audio.currentTime = duration * percentSong;
}

play.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
next.addEventListener("click", nextSong);
previous.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgessBar);
progress_container.addEventListener("click", setProgressBar);
audio.addEventListener("ended", nextSong);