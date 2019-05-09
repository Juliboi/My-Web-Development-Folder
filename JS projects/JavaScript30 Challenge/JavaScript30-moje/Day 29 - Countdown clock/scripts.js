let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000; //now is in miliseconds => seconds * 1000 to convert it to miliseconds
  displayTimeLeft(seconds);
  displayEndTime(then);


  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); //convert it to seconds and round it => decrements the seconds from now() => counts down to zero
    if(secondsLeft <= 0) {
      clearInterval(countdown)
    }
    console.log(secondsLeft);
    displayTimeLeft(secondsLeft)
  }, 1000);
}

function displayTimeLeft(seconds) { //because of the interval having to wait one second we just display the first number with this function => we pass in the seconds from the first parameter
  const minutes = Math.floor(seconds / 60); //show minutes and make it floor
  const remainderSeconds = seconds % 60 //show remainded seconds left
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour}:${minutes}`
}
