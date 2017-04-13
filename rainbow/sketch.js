var img;
function preload() {
  pixelDensity(1);
  img = loadImage("assets/hima.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  imageMode(CENTER);
}

function draw() {
  weight = width / 360;
  strokeWeight(weight);
  for (i = 0; i < 360; i++) {
    stroke((i + frameCount * 5) % 360, 100, 100);
    line(i * weight, 0, i * weight, height);
  }
  image(img, width / 2, height / 2);
}


function windowResized() {
  setup();
}
