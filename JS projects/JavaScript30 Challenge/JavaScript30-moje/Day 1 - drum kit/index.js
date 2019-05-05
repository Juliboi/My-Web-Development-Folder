//adding the event for keyboard pressing
  let fired = false;

  function playSound(e) {
    if(!fired) {
      fired = true;
      //when you press a (A,S,D,F,G,H,J,K,L) key then it gives us the AUDIO element from HTML, other keys are NULL
      const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); //keyCode = the specific keyboard key
      //when you press a (A,S,D,F,G,H,J,K,L) key then it gives us the DIV element from HTML, other keys are NULL
      const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
      //console.log(audio); //you can console.log it will show you in the console the audio element
      if(!audio) return; //if a key doesnt exist, stops the function from running(there would be an error otherwise)
      audio.currentTime = 0; //makes so if you press it again and again it will rewind
      audio.play(); //plays the audio, but you have to wait till the end to play it again => audio.currentTime = 0;
      key.classList.add('playing'); //added the transition CLASS but you also have to remove it somehow so it can be replayed
    }
  };

  function removeTransition(e) { //the function for the FOREACH loop (deletes the trasition CLASS)
    if (e.propertyName !== 'transform') return; { //skip this function if its there isnt a transform property
    this.classList.remove('playing'); //removes the transition CLASS
    }
  }
  function reset() {
    fired = false;
  }

  const keys = document.querySelectorAll('.key'); //selected all the elements with the class .key (DIVS)
  keys.forEach(key => key.addEventListener('transitionend', removeTransition)); //you have to use a forEach loop for it to work. You cant use key.addEventListener('#,#')
  window.addEventListener('keydown', playSound); //plays the sound after pressing specific keys
  window.addEventListener('keyup', reset); //plays the sound after pressing specific keys
  console.log(keys)
