function preload() {
  pixelDensity(1);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  weight = width / 360;
  strokeWeight(weight);
  for (i = 0; i < 360; i++) {
    stroke((i + frameCount * 5) % 360, 100, 100);
    line(i * weight, 0, i * weight, height);
  }
}


function windowResized() {
  setup();
}
