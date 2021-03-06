function preload() {
  imageMode(CENTER);
  ellipseMode(RADIUS);
  //button = loadImage(".png");
  pixelDensity(1);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  short = min(width, height);
  long = max(width, height);
  hgrid = width / 8;
  vgrid = height / 8;
  tsize = short / 8;
  transX = width / 2;
  transY = height / 2;
}

function draw() {
  update();
  background(255);
  push();
  translate(transX, transY);
  fill(0);
  textSize(tsize);
  textAlign(CENTER, CENTER);
  text("hoge", 0, 0);
  pop();
}

function update() {}

function windowResized() {
  setup();
}