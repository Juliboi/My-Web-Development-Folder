//variables
const forma1 = document.getElementById('forma1');
const forma2 = document.getElementById('forma2');
const vysledek = document.getElementById('vysledek');
const button = document.querySelector('button');
const operator = document.querySelector('span');


//events
button.addEventListener('click', control);
generateNumber();
document.addEventListener('keydown', onEnter);

//functions
function generateNumber() {
  forma2.value = Math.round(Math.random()*20);
  forma1.value = Math.round(Math.random()*20);
  vysledek.value = "";

  //operator
  let op =  Math.round(Math.random()*2);
  if(op == 1) {
    operator.innerText = "-"
  } else {
    operator.innerText = "+"
  }
}

function onEnter(e) {

  if(e.keyCode == 13) {
    control()
  }

}


function control() {
  if(operator.innerText == "-") {
    if( Number(forma1.value) - Number(forma2.value) === Number(vysledek.value)) {
      alert("Correct!");
    } else {
      alert("Wrong!");
    }
  } else {
    if( Number(forma1.value) + Number(forma2.value) === Number(vysledek.value)) {
      alert("Correct!");
    } else {
      alert("Wrong!");
    }
  }
  generateNumber();
}
