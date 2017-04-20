function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  short = min(width, height);
  long = max(width, height);
  rectMode(CENTER);
  colorMode(HSB);
}

function draw() {
  background(0);
  strokeWeight(1);
  stroke(255);
  noFill();
  ellipseMode(CENTER);

  for (i = 0; i < 4; i++) {
    stroke(255);
    randX = random(width);
    line(randX, 0, randX,height);
  }

  translate(width / 2, height / 2);
  l = short / 64;
  for (i = 0; i < 48; i++) {
    push();
    randX = random(-l, l);
    randY = random(-l, l);
    r = random(long / 2.4, long / 2);
    ellipse(randX, randY, r, r);
    pop();
  }
}


function windowResized() {
  setup();
}