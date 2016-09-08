function preload() {
  imageMode(CENTER);
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
  
  ellipseRate = short;

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  update();
  background(0);
  push();
  translate(transX, transY);
  fill("#FF8888");
  ellipse(0,vgrid,ellipseSize,ellipseSize);
  fill(255);
  textSize(tsize);
  textAlign(CENTER, CENTER);
  text("mic level\n"+nf(micLevel, 2, 3), 0, -vgrid*2);
  textSize(tsize/2);
  text(nf(frameRate(),2,2)+" fps",0,vgrid*3);
  pop();
}

function update() {
  micLevel = mic.getLevel();
  ellipseSize = micLevel*ellipseRate;
}

function windowResized() {
  setup();
}