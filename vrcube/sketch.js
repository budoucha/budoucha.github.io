function preload() {
  imageMode(CENTER);
  //button = loadImage(".png");
  pixelDensity(1);
}

function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);
  short = min(width, height);
  long = max(width, height);
  hgrid = width / 8;
  vgrid = height / 8;
}

function draw() {
  background(128);
  rotateZ(radians(-rotationZ));
  rotateX(radians(-rotationY));
  rotateY(radians(rotationX));
  box(6000);
  push();
  pop();
  update();
}


function update(){
  
}

function windowResized() {
  setup();
}