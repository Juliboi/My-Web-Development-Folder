//Get Our Elements
const player = document.querySelector('.player');
const video = document.querySelector('.player__video');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const ranges = document.querySelectorAll('.player__slider');
const skipButtons = document.querySelectorAll('[data-skip]');
const fullscreen = document.querySelector('.fullscreen');

//Build Our Functions
function togglePlay() {
  if(video.paused) { //there sadly isnt a video.played property
    video.play(); //plays the video
    toggle.textContent = '►'; //change the play/stop symbol
  } else {
    video.pause();
    toggle.textContent = '❚ ❚'; //change the play/stop symbol
  }
}

function skip() {
  video.currentTime += parseInt(this.dataset.skip); //dataset.skip = 25, parseInt = converts number/string to a whole number (parseFloat() = point number, Number() = number)
  //console.log(video.currentTime);
}

function handleRangeUpdate() {
  video[this.name] = this.value; //this.value = the value of the input slider
  //console.log(this.name);
  //console.log(this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100 //get the perentage of the current video (currentTime = #, video.duration = 596.5s)
  //console.log(video.duration)
  progressBar.style.flexBasis = `${percent}%` //give in the currect percentage of the video
}

function scrub(e) {
  //if (mousedown) {
    scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; //e.offsetX = current mouse position on the X line, progress.offsetWidth = the whole width of the progress bar, video.duration = total amount of the video duration
    video.currentTime = scrubTime;
    //console.log(e);
  //}
}

function turnFullscreen(elem) {
  elem = elem || document.documentElement;
  if (elem.requestFullscreen) {
   elem.requestFullscreen();
 } else if (elem.mozRequestFullScreen) { /* Firefox */
   elem.mozRequestFullScreen();
 } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
   elem.webkitRequestFullscreen();
 } else if (elem.msRequestFullscreen) { /* IE/Edge */
   elem.msRequestFullscreen();
 }
}

//Event Listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress); //running the event whenever the time is updating

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); //is the mousedown is true => then run the scrub(e) function
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mouseover', () => mousedown = false);
let mousedown = false;

fullscreen.addEventListener('click', function() {
turnFullscreen(player);
});
