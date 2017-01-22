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
  short = min(width,height);
  
  if (abs(rotationY) > 60) {
    keyOpen();
  }

  if (rotationY > 15 && rotationY < 30) {
    keyLock();
  }

  noStroke();  
  if(locked===true){fill(255,0,0,128);}else{fill(0, 255, 255, 128);}

  textAlign(CENTER);
  textSize(short / 8);
  if (locked) {t = "LOCKED"} else { t = "OPEN"}
  text(t, width/2,height/2);
  
  push();
  translate(width / 2, height * 6 / 8);
  
  angle = radians(rotationY + 45 * cos(radians(frameCount * 2)));
  angled = cos(angle) ;
  angled_ = sin(angle)/3;

  r = angled * short / 8;
  tw = angled * -short / 8
  th = short / 16;
  rw = short / 12;
  rh = short / 6;

  triangle(-r + tw/2 - angled_*(-r + tw/2), 0,
           -r + tw/2 + angled_*(-r + tw/2), th - angled_*th,
           -r + tw/2 +angled_*(-r + tw/2), -th-angled_*(-th));
  triangle( r - tw/2 - angled_*( r - tw/2), 0,  
            r - tw/2 + angled_*( r - tw/2), th + angled_*th,
            r - tw/2 +angled_*( r - tw/2), -th+angled_*(-th));
  quad(rw + angled_*rw, rh + angled_*rh,
  rw + angled_*rw, -rh - angled_*rh,
  -rw - angled_*rw, -rh + angled_*rh,
  -rw - angled_*rw, rh - angled_*rh);

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

function windowResized(){setup();}