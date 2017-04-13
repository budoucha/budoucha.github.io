function preload() {
  pixelDensity(1);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  weight = height / 360;
  strokeWeight(weight);
  translate(0,height);
  for (i = 0; i < 360; i++) {
    stroke((i + frameCount * 5) % 360, 100, 100);
    line(0, -i * weight, width, -i * weight);
  }
}


function windowResized() {
  setup();
}
