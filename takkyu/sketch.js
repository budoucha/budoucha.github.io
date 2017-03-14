var hasHit
var hit_sound

function preload() {
  hit_sound = loadSound("assets/table-tennis-ball.mp3");
}

function setup() {
  pixelDensity(1);
  var myCanvas = createCanvas(windowWidth * 0.95, windowHeight * 0.8);
  myCanvas.parent('sketch-holder');

  masterVolume(1.0);
  hit_sound.setVolume(1.0);
  hit_sound.playMode('sustain');

  background(255, 0, 0);
  hasHit = false;
}

function draw() {
  background(216, 0, 0);
  fill(216,168,128);
  rect(0,height*4/5,width,height*4/5);

  if (accelerationZ > 100) {
    if (hasHit === false) {
      hitBall();
      hasHit = true;
    }
  }
  else {
    hasHit = false;
  }
}


function hitBall() {
  hit_sound.setVolume(1.0);
  hit_sound.play();
  vib = function(){navigator.vibrate(60);}
  setTimeout(vib,75);
  setTimeout(bounce,500)
}


function mousePressed() {
    if (accelerationZ == 0){
        hitBall();
    }
}

function bounce(){
  hit_sound.setVolume(0.4);
  hit_sound.play();
}