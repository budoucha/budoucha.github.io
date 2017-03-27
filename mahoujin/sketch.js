function preload() {
  imgSrc = loadImage("assets/mahoujin.png");
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);

  img = createImage(imgSrc.width, imgSrc.height);
  imgResize = min(width, height) / 2;
  img.resize(imgResize, imgResize);
  img.copy(imgSrc, 0, 0, imgSrc.width, imgSrc.height, 0, 0, img.width, img.height);

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

function windowResized() {
  setup();
}