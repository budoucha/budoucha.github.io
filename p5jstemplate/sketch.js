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
  background(255);
  push();
  pop();
  update();
}


function update(){
  
}

function windowResized() {
  setup();
}