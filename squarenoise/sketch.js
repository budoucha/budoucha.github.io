function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  short = min(width, height);
  long = max(width, height);
  rectMode(CENTER);
}

function draw() {
  background(0);
  noStroke();
  fill(255);
  for (i = 0; i < 100; i++) {
    randX = random(width);
    randY = random(height);
    rectSize = random(short / 16, long / 8);
    rect(randX, randY, rectSize, rectSize);
  }

}

function windowResized() {
  setup();
}