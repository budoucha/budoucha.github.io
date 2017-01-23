function preload() {
  pixelDensity(1);
  s1 = loadSound('data/key-in2.mp3');
  s2 = loadSound('data/key-tighten1.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  masterVolume(1.0);
  s1.setVolume(1.0);
  s1.playMode('sustain');
  locked = false;
}

function draw() {
  background(0);
  short = min(width, height);

  if (-65 < rotationY && rotationY < -55) {
    keyOpen();
  }

  if (10 < rotationY && rotationY < 20) {
    keyLock();
  }

  noStroke();
  if (locked === true) {
    fill(255, 0, 0, 128);
  } else {
    fill(0, 255, 255, 128);
  }

  textAlign(CENTER);
  textSize(short / 8);
  if (locked) {
    t = "LOCKED"
  } else {
    t = "OPEN"
  }
  text(t, width / 2, height * 3 / 8);

  push();
  translate(width / 2, height * 5 / 8);

  angle = radians(rotationY + 60 * cos(radians(frameCount * 2)));

  angled = cos(angle);
  angled_ = sin(angle) / 3;

  tr = short / 8;
  tw = short / 8;
  th = short / 16;

  rw = short / 10;
  rh = short / 6;

  if (locked === true) {
    triangle(-tr * angled + tw * angled_ + (tr * angled - tw * angled_) * angled_, 0,
             -tr * angled - tw * angled_ + (tr * angled + tw * angled_) * angled_, -th + (th) * angled_,
             -tr * angled - tw * angled_ + (tr * angled + tw * angled_) * angled_, +th - (th) * angled_);

    triangle(+tr * angled - tw * angled_ + (tr * angled - tw * angled_) * angled_, 0,
             +tr * angled + tw * angled_ + (tr * angled + tw * angled_) * angled_, -th - (th) * angled_,
             +tr * angled + tw * angled_ + (tr * angled + tw * angled_) * angled_, +th + (th) * angled_);

  } else {
    triangle(-tr * angled - tw * angled_ + (tr * angled + tw * angled_) * angled_,0,
             -tr * angled + tw * angled_ + (tr * angled - tw * angled_) * angled_, -th + (th) * angled_,
             -tr * angled + tw * angled_ + (tr * angled - tw * angled_) * angled_, th - (th) * angled_);

    triangle(tr * angled + tw * angled_ + (tr * angled + tw * angled_) * angled_, 0,
             tr * angled - tw * angled_ + (tr * angled - tw * angled_) * angled_, -th - (th) * angled_,
             tr * angled - tw * angled_ + (tr * angled - tw * angled_) * angled_, +th + (th) * angled_);
  }

  quad(-rw * angled + (rw * angled) * angled_, (-rh) + (rh) * angled_,
       -rw * angled + (rw * angled) * angled_, (+rh) - (rh) * angled_,
        rw * angled + (rw * angled) * angled_, (+rh) + (rh) * angled_,
        rw * angled + (rw * angled) * angled_, (-rh) - (rh) * angled_
  );


  noFill();
  strokeWeight(2);
  stroke(0);

  pop();
}

function keyOpen() {
  if (locked === true) {
    s1.play();
    background(255);
    locked = false;
  }
}

function keyLock() {
  if (locked === false) {
    s2.play();
    background(255);
    locked = true;
  }
}

function windowResized() {
  setup();
}