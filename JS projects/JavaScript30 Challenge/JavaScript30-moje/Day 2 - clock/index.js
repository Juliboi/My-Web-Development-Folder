const secondHand = document.querySelector('.second-hand');
const min = document.querySelector('.min-hand');
const hrs = document.querySelector('.hour-hand');
console.log(secondHand);

function setDate() {
  const now = new Date(); //gives you date and time from your pc

  const seconds = now.getSeconds(); //getSeconds() = is a method of getting the current second from your pc
  console.log(seconds);



  const secondsDegrees = ((seconds/60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`; //if you would have selected secondHand with getElementsByClassName, you would have to use secondHand[0].style.transf... because it is a HTML collection. querySelector takes always the first element so in other selectors you have to specify which element to manipulate with.

  const minutes = now.getMinutes();
  const minutesDegrees = (minutes/60 * 360) + 90;
  min.style.transform = `rotate(${minutesDegrees}deg)`;

  const hours = now.getHours();
  const hoursDegrees = (hours/12 * 360) + 90;
  hrs.style.transform = `rotate(${hoursDegrees}deg)`;

}

setInterval(setDate, 1000) //how often does the function run
