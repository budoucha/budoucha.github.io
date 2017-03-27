function preload() {
  img = loadImage("assets/mahoujin.png");
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight * 1.2);

  imgResize = min(width, height) / 2;
  img.resize(imgResize, imgResize);
  imageMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  scale(2);
  rot = (frameCount % 360);
  rotate(rot);
  image(img, 0, 0);
}
