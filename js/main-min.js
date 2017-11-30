
function fancyTimeFormat(time)
{
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


//comments

const commentContainer = document.querySelectorAll(".comment-container");

function commentToggle (e) {
    console.log("comment logged!", e, (this.classList.contains("closed")));
    this.classList.contains("closed") ? this.classList.remove("closed") : this.classList.add("closed");
    }

commentContainer.forEach(comment => comment.addEventListener("click", commentToggle));

// ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

// audio fix
const player = document.querySelector('#audio-player');
const audio = document.querySelector('#audio-file');
const toggle = document.querySelectorAll('.toggle');
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
  // const icon = this.paused ? 'play' : 'pause';
  console.log(audioControl.classList.contains("paused"));
  audioControl.classList.contains("paused") ? audioControl.classList.remove("paused") : audioControl.classList.add("paused");
  console.log(icon);
  // audioControl.classList = icon;
}

function handleRangeUpdate() {
  audio[this.name] = this.value;
}

function handleProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  console.log("logged")
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
}


function updateTime(e) {
    const currentTime = fancyTimeFormat(Math.floor(audio.currentTime));
    const duration = fancyTimeFormat(Math.floor(audio.duration));

    timePassed.textContent = currentTime;
    timeTotal.textContent = duration;
    }

// listeners
audio.addEventListener('click', togglePlay);
audio.addEventListener('play', updateButton);
audio.addEventListener('pause', updateButton);
audio.addEventListener('timeupdate', handleProgress);

let mousedown = false;

audioControl.addEventListener('click', togglePlay);
progress.addEventListener('click', (e) => scrub(e));

// progress.addEventListener('click', (e) => console.log(e));


// progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
// progress.addEventListener('mousedown', () => mousedown = true);
// progress.addEventListener('mouseup', () => mousedown = false);

audio.addEventListener('timeupdate', updateTime, false);

audio.currentTime = 1;
updateTime();


/// Smooth Scroll
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
      }, 500);
        return false;
      }
    }
  });
});


