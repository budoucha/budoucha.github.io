function preload() {
  imageMode(CENTER);
  pixelDensity(1);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  short = min(width, height);
  long = max(width, height);
  hgrid = width / 8;
  vgrid = height / 8;


  if (geoCheck() == true) {
    println(1);
  } else {
    //error getting geolocaion
  }
}

function draw() {
  background(255);
  push();
  pop();
  update();
  text(accelerationX,10,10);
}


function update() {

}

function windowResized() {
  setup();
}