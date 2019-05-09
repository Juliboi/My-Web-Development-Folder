const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
      //console.log(localMediaStream);
      video.srcObject = localMediaStream; //getting the video source
      video.play();
    })
    .catch(err => //what if you dont get the access
    alert(err.message))
}

function paintToCanvas() {
  const width = video.videoWidth; 640
  const height = video.videoHeight; 480
  //console.log(width, height);
  canvas.width = width; //canvas and video has to be matching
  canvas.height = height; //canvas and video has to be matching

  return setInterval(() => { // in 16 miliseconds => take a picture1
    //The screenshot
    ctx.drawImage(video, 0, 0, width, height); //scan the screen image => video = what to scan, 0, 0 => from left to right, w + h = how much

    //The filtering
      //take the pixels out
      let pixels = ctx.getImageData(0, 0, width, height);

      //mess with them
      //console.log(pixels)
      //pixels = redEffect(pixels)
      //pixels = rgbSplit(pixels); //changing the [long array] into the redEffext function and passing the pixels variable as a parameter
      pixels = greenScreen(pixels); //green screen with inputs

      //put them back
      ctx.putImageData(pixels, 0, 0);


  }, 16);
}

function takePhoto(){
  //sound tick
  snap.currentTime = 0;
  snap.play(0);
  //photo
  const data = canvas.toDataURL('image/jpeg'); //creating a screen shot in base 64 (image in character form)
  const link = document.createElement('a');
  link.href = data; //giving the link a hyper refrence
  link.setAttribute('download', 'handsome'); //downloads the file
  link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt="handsome man">`;
  strip.insertBefore(link, strip.firstChild); //inserts the <a> tag inside the strip <div>, before the firstChild
}

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // BLUE
  }

  return pixels;
}

function rgbSplit(pixels){
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 100] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 150] = pixels.data[i + 2]; // BLUE
  }

  return pixels;
}

function greenScreen(pixels) {
  const levels = {}; //is the specific color which we take out

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value; //for each input set the name (bmin,bmax,etc..) = to the value of the input
  });

  //console.log(levels) => bmin = 128, bmax = 165, etc..
  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
