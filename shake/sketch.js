function preload() {
  imageMode(CENTER);
  pixelDensity(1);
  shakeCount = 0;
  notShaked = 45;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  short = min(width, height);
  long = max(width, height);
  hgrid = width / 8;
  vgrid = height / 8;
  tsize = short / 8;
  setShakeThreshold(notShaked * 1.8);
  shakeEnabled = 0;
}

function draw() {
  background(255 * shakeEnabled);
  push();
  translate(width / 2, height / 2);
  fill(255);
  textSize(tsize);
  textAlign(CENTER, CENTER);
  text(shakeCount, 0, 0);
  pop();
  update();
}


function update() {
  if (sqrt(pow(accelerationX, 2) + pow(accelerationY, 2)) < notShaked) {
    shakeEnabled = 0;
  }
}

function windowResized() {
  setup();
}


function deviceShaken() {
  if (shakeEnabled === 0) {
    shakeCount++;
  }
  shakeEnabled = 1;
}