let initialState = true;
let dragged = false;
let mic;
let amp = 1;
let micLevel;
const logLength = 512;
const levelLog = [];

const defaultBG = 0;

//座標関連の便利変数
let short, long, hGrid, vUnit, vHalf, hHalf, tsize, ellPos;
let levelRange, timeWidth, bg;
let timeStep;

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  short = min(width, height);
  long = max(width, height);
  hGrid = width / 8;
  vUnit = height / 8;
  vHalf = height / 2;
  hHalf = width / 2;
  tsize = short / 10;
  ellPos = vHalf + vUnit;
  levelRange = short / 2.2;
  timeWidth = width / logLength;
  bg = defaultBG;
}

function draw() {
  background(bg);
  if (initialState) {
    fill(255, 128);
    noStroke();
    textSize(tsize);
    textAlign(CENTER, CENTER);
    text("tap to start", hHalf, vHalf);
    return;
  }
  drawBaseLines();

  mic.amp(amp);
  micLevel = mic.getLevel();
  timeStep = (frameCount - 1) % (logLength);
  levelLog[timeStep] = micLevel * levelRange;
  const timeX = timeStep * timeWidth;
  if (timeStep === 0) { levelLog[logLength] = micLevel * levelRange; }

  //time front
  stroke(44, 255, 255, 128);
  strokeWeight(2);
  line(timeX, 0, timeX, height);
  drawMicLevel(micLevel);
  drawTexts();
}

function drawBaseLines() {
  push();
  //音量の目盛り(文字)
  translate(hHalf, ellPos);
  fill(255, 128);
  noStroke();
  textSize(tsize / 3);
  textAlign(CENTER, TOP);
  text("1.0", levelRange, 0);
  text("0.5", levelRange / 2, 0);
  text("0.25", levelRange / 4, 0);

  //音量の目盛り(円)
  ellipseMode(RADIUS);
  noFill();
  stroke(255, 64);
  strokeWeight(2);
  ellipse(0, 0, levelRange);
  ellipse(0, 0, levelRange / 2);
  ellipse(0, 0, levelRange / 4);
  pop();

  //音量の目盛り(線)
  push();
  translate(0, ellPos);
  stroke(255, 64);
  strokeWeight(2);
  line(0, -levelRange, width, -levelRange);
  line(0, -levelRange / 2, width, -levelRange / 2);
  line(0, -levelRange / 4, width, -levelRange / 4);
  line(0, 0, width, 0);
  pop();
}

function drawMicLevel(micLevel) {
  push();
  //音量の円
  translate(hHalf, ellPos);
  fill("#FF4444");
  noStroke();
  ellipseMode(RADIUS);
  const ellSize = micLevel * levelRange;
  ellipse(0, 0, ellSize);
  pop();

  //level line
  push();
  translate(0, ellPos);
  strokeWeight(1);
  for (i = 1; i <= logLength + 1; i++) {
    const ringed_i = i + logLength - timeStep - ((i > timeStep) * logLength);
    const oldness = 16 + 1.44 * ringed_i * 255 / logLength; //古いデータを薄く
    stroke(64, 255, 64, oldness);
    line((i - 1) * timeWidth, -levelLog[i - 1], (i) * timeWidth, -levelLog[i]);
  }
  pop();
}

function drawTexts() {
  push();
  translate(hHalf, vHalf);
  fill(255);
  noStroke();
  textSize(tsize);
  textAlign(CENTER, CENTER);
  text("mic level\n" + nf(micLevel, 0, 3), 0, -vUnit * 2);
  textSize(tsize / 2);
  text("mic amp :" + nf(amp, 1, 2), 0, -vUnit);
  textSize(tsize / 2);
  text(nf(frameRate(), 2, 2) + " fps", 0, vUnit * 3);
  pop();
}


// itsumono
function windowResized() {
  setup();
}

function mouseDragged() {
  amp = dist(mouseX, mouseY, hHalf, ellPos) * 12 / short;
  bg = "#000044";
  dragged = true;
}

function mouseReleased() {
  if (initialState) {
    initialState = false;
    mic = new p5.AudioIn();
    mic.enabled = true;
    mic.start();
    amp = 1.0;
    return;
  }
  if (dragged === false) {
    amp = 1;
    bg = defaultBG;
  } else {
    dragged = false;
  }
}