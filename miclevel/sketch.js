function preload() {
  imageMode(CENTER);
  pixelDensity(1);
  ellipseMode(RADIUS);
  levelLog = [];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  short = min(width, height);
  long = max(width, height);
  hgrid = width / 8;
  vgrid = height / 8;
  tsize = short / 10;
  transX = width / 2;
  transY = height / 2;
  ellPos = vgrid;
  levelRange = short / 2.2;
  timeDiv = 512;
  barLen = width / timeDiv;
  bg = 0;

  mic = new p5.AudioIn();
  mic.enabled = true;
  mic.start();
  amp = 1.0;
}

function draw() {
  update();
  background(bg);
  push();
  translate(transX, transY);

  push();
  translate(0, ellPos);
  fill("#FF4444");
  noStroke();
  ellipse(0, 0, ellSize);

  noFill();
  stroke(255, 64);
  strokeWeight(2);
  ellipse(0, 0, levelRange);
  ellipse(0, 0, levelRange / 2);
  ellipse(0, 0, levelRange / 4);

  fill(255, 128);
  noStroke();
  textSize(tsize / 3);
  text("1.0", levelRange, 0);
  text("0.5", levelRange / 2, 0);
  text("0.25", levelRange / 4, 0);
  pop();

  push();
  translate(-transX, ellPos);
  stroke(255, 64);
  strokeWeight(2);
  line(0, -levelRange, width, -levelRange);
  line(0, -levelRange / 2, width, -levelRange / 2);
  line(0, -levelRange / 4, width, -levelRange / 4);
  line(0, 0, width, 0);

  stroke("#44FF44");
  strokeWeight(1);
  for (i = 0; i < timeDiv; i++) {
    line(i * barLen, -levelLog[i], (i + 1) * barLen, -levelLog[i + 1]);
  }
  pop();

  fill(255);
  noStroke();
  textSize(tsize);
  textAlign(CENTER, CENTER);
  text("mic level\n" + nf(micLevel, 0, 3), 0, -vgrid * 2);
  textSize(tsize / 2);
  text("mic amp :" + nf(amp, 1, 2), 0, -vgrid);
  textSize(tsize / 2);
  text(nf(frameRate(), 2, 2) + " fps", 0, vgrid * 3);
  pop();

  stroke(44, 255, 255, 128);
  strokeWeight(2);
  line(timeX, 0, timeX, height);

}

function update() {
  mic.amp(amp);
  micLevel = mic.getLevel();
  ellSize = micLevel * levelRange;
  levelLog[frameCount % (timeDiv)] = ellSize;
  timeX = (frameCount % (timeDiv)) * barLen;
  levelLog[timeDiv] = levelLog[0];
}

function windowResized() {
  setup();
}

function mouseDragged() {
  amp = dist(mouseX, mouseY, transX, ellPos + transY) * 12 / short;
  bg = "#000044";
  dragged = true;
}



function mouseClicked() {
  if (dragged == false) {
    amp = 1;
    bg = 0;
  } else {
    dragged = false;
  }
}