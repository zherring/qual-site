
// audio fix
const player = document.querySelector('#audio-player');
const audio = document.querySelector('#audio-file');
const toggle = document.querySelector('.toggle');
const icon = document.querySelector('#audio-control');
const audioControl = document.querySelector('#audio-control');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const timePassed = document.querySelector('#time-passed');
const timeTotal = document.querySelector('#time-total');

// methods for audio player
function togglePlay() {
  const method = audio.paused ? 'play' : 'pause';
  audio[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function handleRangeUpdate() {
  audio[this.name] = this.value;
}

function handleProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
}


function updateTime(e) {
    const currentTime = Math.floor(audio.currentTime);
    const duration = Math.floor(audio.duration);
    // timePassed.
    timePassed.textContent = currentTime;
    timeTotal.textContent = duration;
    console.log("fired");

}

// listeners
audio.addEventListener('click', togglePlay);
audio.addEventListener('play', updateButton);
audio.addEventListener('pause', updateButton);
audio.addEventListener('timeupdate', handleProgress);

let mousedown = false;

audioControl.addEventListener('click', togglePlay);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

audio.addEventListener('timeupdate', updateTime, false);
