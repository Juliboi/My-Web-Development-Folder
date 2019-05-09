//Get Our Elements
const player = document.querySelector('.player')
const video = document.querySelector('.player__video')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')
const toggle = document.querySelector('.toggle')
const ranges = document.querySelectorAll('.player__slider')
const buttons = document.querySelectorAll('[data-skip]')

//Build Our Functions
function togglePlay() {
  video.play();
  console.log('hey')
}

//Event Listeners
toggle.addEventListener('click', togglePlay)
