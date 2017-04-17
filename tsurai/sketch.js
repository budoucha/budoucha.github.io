function preload() {
  tsurai_img = loadImage("assets/tsurai.png");
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  short = min(width,height);
  long =  max(width,height);

  if (tsurai_img.height < height) {
    tsurai = createImage(tsurai_img.width, tsurai_img.height);
    tsurai.copy(tsurai_img, 0, 0, tsurai_img.width, tsurai_img.height, 0, 0, tsurai.width, tsurai.height);
  }
  if (tsurai_img.height > height) {
    tsurai.resize(tsurai_img.width * height / tsurai_img.height, height);
  }
}

function draw() {
  background(255);
  tint(255, 0, 0);
  randX = random(long / 100);
  randY = random(long / 100);
  image(tsurai, width / 2 + randX, height / 2 + randY);
}

function windowResized() {
  setup();
}
