let pageCounter = 1;

const container = document.querySelector('#animal-info');
const button = document.querySelector('#btn');

button.addEventListener('click', function() {
  var ourRequest = new XMLHttpRequest(); //the AJAX call for downloading the data will be called after clicking this button => NOT ON PAGE LOAD (would have to be global)
  ourRequest.open('get', `animals-${pageCounter}.json`, true); //getting the data out of JSON, what is the location of the data, ?
  ourRequest.onload = function() { //what to do after onload
    var ourData = JSON.parse(ourRequest.responseText) //we have to turn back to its original form => .responseText = the content of the data
    console.log(ourData);

    ourData.forEach(animal => {
      container.insertAdjacentHTML('beforeend', `${animal.name} is a ${animal.species} <br>`);
    })
  }
  ourRequest.send() //send the response

  if(pageCounter === 4) {
    button.classList.add('hide-me')
  } else {
    pageCounter++;
  }
})


// MY VERSION

// const animals = []

// fetch('animals-1.json')
//   .then(blob => blob.json())
//   .then(data => animals.push(...data));
//
// const container = document.querySelector('#animal-info');
// const button = document.querySelector('#btn');
//
// function clickAnimals() {
//   container.innerHTML = JSON.parse(JSON.stringify(animals.name));
// }
//
// console.log(animals)
//
// button.addEventListener('click', clickAnimals);



// var people = [
//   {
//     name: "brad",
//     age: 35
//   },
//   {
//     name: "John",
//     age: 40
//   },
//   {
//     name: "Sara",
//     age: 25
//   }
// ];
//
//
// var output = '';
// for (let i = 0; i < people.length; i++) {
//   //console.log(people[i]);
//   output += `<li>${people[i].name}</li>`
// }
//
// console.log(output)

// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       var response = JSON.parse(xhttp.responseText);
//       console.log(response.people);
//     }
// };
// xhttp.open("GET", "people.json", true);
// xhttp.send();



//   const dick = [];
//
// fetch('people.json')
//   .then(blob => blob.json())
//   .then(data => dick.push(...data.people))
//
// console.log(dick)
//
// const container = document.querySelector('#animal-info')
//
// var output = '';
//
//
//
// dick.forEach(yp => {
//   console.log('yo')
// });
