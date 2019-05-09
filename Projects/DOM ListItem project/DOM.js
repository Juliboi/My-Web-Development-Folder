//Variable of the form <form>
var form = document.getElementById('addForm');
//Variable of the list items <ul>
var itemList = document.getElementById('items');
//Variable of the search filter <input>
var filter = document.getElementById('filter');



//Form sumbit event => you have to use it in the whole FORM
form.addEventListener('submit', addItem);
//Delete event
itemList.addEventListener('click', removeItem);
//Filter event
filter.addEventListener('keyup', filterItems);


//Add item function
function addItem(e){
  //because of the sumbit event
  e.preventDefault();
  //get input value => 'item' is the TEXT INPUT (inside the input)
  var newItem = document.getElementById('item').value;


  //create new li element => <li> </li>
  var li = document.createElement('li');
  //add class from the bootstrap => <li class="list-group-item"> </li>
  li.className = 'list-group-item';
  //add text node with input value => <li class="list..." INPUT VALUE </li>
  li.appendChild(document.createTextNode(newItem)); /*you can also write it as
  var newText = document.createTextNode(newItem);
  li.appendChild(newText); */

  //create delete button element
  var button = document.createElement('button');
  button.className = 'btn btn-danger btn-sm float-right delete';
  button.appendChild(document.createTextNode('X'));

  li.appendChild(button);

  //connect the UL with the LI
  itemList.appendChild(li);
}

//Remove item function
function removeItem(e) {
  if(e.target.classList.contains('delete')) { /*classList.contains(#) = only clicking the element with that class will trigger the event */
      var li = e.target.parentElement; /*we need to choose the parentElement (li, not the button)*/
      itemList.removeChild(li); /*we need to remove it from the itemList(ul)*/
  }
}

//Filter Items
function filterItems(e){
  //convert text to lowercase
  var text = e.target.value.toLowerCase();
  //get li tags => you get an HTML collection
  var items = itemList.getElementsByTagName('li');
  //but we need to convert it to an Array
  Array.from(items).forEach(function(item){ /*Array.from() turns HTML collection into an Array*/
    /*forEach(function(item)) => Array loop, runs as many elements inside* => (item, index, array)*/

    //ul first childs text => loops again => second childs
    var itemName = item.firstChild.textContent;
    //if the lowercase child text is the same as the input then display: "block", if not display: "none"
    //you need that the itemName (text) to be also LOWERCASE just like the text is LOWERCASE
    if(itemName.toLowerCase().indexOf(text) != -1) { /* -1 = non-existing element in the array*/
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

}
