let initialState = true;
let mic;

function preload() {
  img = loadImage("data/rousoku.png");
  rousoku = loadImage("data/rousoku.png");
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight * 0.8);
  imageMode(CENTER);
  rectMode(CORNER);

  if (rousoku.height < height) {
    rousoku = createImage(img.width, img.height);
    rousoku.copy(img, 0, 0, img.width, img.height, 0, 0, rousoku.width, rousoku.height);
  }
  if (rousoku.height > height) {
    rousoku.resize(img.width * height / img.height, height);
  }

  mic = new p5.AudioIn();
  mic.enabled = true;
  mic.start();

  threshold = 6;
  micLevelMax = 0;
  dark = 0;
  timer = 0;
}

function draw() {
  update();
  background(128);
  image(rousoku, width / 2, height - rousoku.height / 3);

  fill(0, dark);
  rect(0, 0, width, height);
}

function update() {
  micLevel = int(map(mic.getLevel(), 0, 1, 0, 255));

  if (micLevel > threshold) {
    timer = 60;
  }

  if (timer > 0) {
    dark = constrain(dark + 36, 0, 255);
    timer--;
  } else {
    dark = constrain(dark - 36, 0, 255);
    timer = 0;
  }
  if (micLevel > micLevelMax) { //to hold the biggest value.
    micLevelMax = micLevel;
  }
  //print(micLevel + " " + micLevelMax);
}

function windowResized() {
  setup();
}