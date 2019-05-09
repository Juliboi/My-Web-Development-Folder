document.querySelector('#getText')
  .addEventListener('click', getText); //get text button

document.querySelector('#getUsers')
  .addEventListener('click', getUsers); //get users button

document.querySelector('#getPosts')
  .addEventListener('click', getPosts); //get posts from external api website

  document.querySelector('#addPost')
    .addEventListener('submit', addPost); //get posts from external api website




const container = document.querySelector('#output') //the empty div

function getText() {
  fetch('sample.txt') //we made a sample.txt with some text inside
    .then(blob => blob.text())
    .then(data => {
      container.innerHTML = data; //put it into the empty div
    })
    .catch((err) => console.log(err)); //not sure?
}

function getUsers() {
    fetch('user.json') //we made a user.json file with an Array of Objects (people and their info)
      .then(blob => blob.json())
      .then(data => {
        let output = '<h2 class="mb-4">Users</h2>';
        data.forEach(function(user){
          output += `<ul class="list-group mb-3">
                      <li class="list-group-item">ID:${user.id}</li>
                      <li class="list-group-item">Name:${user.name}</li>
                      <li class="list-group-item">Email:${user.email}</li>
                     </ul>
                    `
        })
        container.innerHTML = output;
      })
}

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts') //we made a user.json file with an Array of Objects (people and their info)
      .then(blob => blob.json())
      .then(data => {
        let output = '<h2 class="mb-4">Posts</h2>';
        data.forEach(function(post){
          output += `<div class="card card-body mb-3">
                      <h3>${post.title}</h3>
                      <p>${post.body}</p>
                     </div>
                    `
        })
        container.innerHTML = output;
      })
}

function addPost(e){
  e.preventDefault();
  let title = document.getElementById('title'); //the title (input) form
  let body = document.getElementById('body'); //the body (textarea) form

  fetch('https://jsonplaceholder.typicode.com/posts', { //seconds parameter, not sure?
    method:'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type':'application/json'
    },
    body: JSON.stringify({title:title, body})
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
} //you can now submit your own data with the other object but it will not be added to the original form
