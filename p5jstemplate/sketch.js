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
  hhalf = width / 2;
  vhalf = height / 2;
  bg=255;
}

function draw() {
  update();
  background(bg);
  push();
  translate(hhalf, vhalf);
  fill(0);
  textSize(tsize);
  textAlign(CENTER, CENTER);
  text("hoge", 0, 0);
  pop();
}

function update() {

}

function mouseDragged() {
  //drag event here
  dragged = true;
}

function mouseReleased() {
  if (dragged == false) {
    //click event here
  } else {
    dragged = false;
  }
}

function windowResized() {
  setup();
}