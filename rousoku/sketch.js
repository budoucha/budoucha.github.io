function preload() {
  img = loadImage("data/rousoku.png");
}

function setup() {
  pixelDensity(1);
  createCanvas(800, 600);
  imageMode(CENTER);
  rectMode(CORNER);

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
  image(img, width / 2, height - img.height / 3);

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
  print(micLevel + " " + micLevelMax);
}