function preload() {
  pixelDensity(1);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(180,100,100);
  long = min(width,height);
}

function draw() {
  steps = 120;
  weight = height / steps;
  strokeWeight(weight);
  translate(width/2,height/2);
  rotate(frameCount);
  for (i = 0; i < steps; i++) {
    rotate(i);
    stroke(360-(-i + frameCount * 5) % 360, 100, 100);
    line(-long/2, i * weight, long/2, i * weight);
    line(i * weight,-long/2, i * weight, long/2);
  }
}


function windowResized() {
  setup();
}
