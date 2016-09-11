  levelLog = [];

  function preload() {
    imageMode(CENTER);
    pixelDensity(1);
    ellipseMode(RADIUS);

  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    short = min(width, height);
    long = max(width, height);
    hgrid = width / 8;
    vgrid = height / 8;
    tsize = short / 8;
    transX = width / 2;
    transY = height / 2;

    ellPos=vgrid;
    levelRange = short;
    timeDiv = 512;

    mic = new p5.AudioIn();
    mic.enabled = true;
    mic.start();

  }

  function draw() {
    update();
    background(0);
    push();
    translate(transX, transY);

    fill("#FF4444");
    noStroke();
    ellipse(0, ellPos, ellSize, ellSize);

    fill(255);
    textSize(tsize);
    textAlign(CENTER, CENTER);
    text("mic level\n" + nf(micLevel, 0, 3), 0, -vgrid * 2);
    textSize(tsize / 2);
    text(nf(frameRate(), 2, 2) + " fps", 0, vgrid * 3);

    noFill();
    stroke(255, 64);
    strokeWeight(2);
    ellipse(0, ellPos, levelRange, levelRange);
    ellipse(0, ellPos, levelRange / 2, levelRange / 2);
    ellipse(0, ellPos, levelRange / 4, levelRange / 4);

    fill(255, 128);
    noStroke();
    textSize(tsize / 3);
    text("1.0", levelRange / 2, ellPos);
    text("0.5", levelRange / 4, ellPos);
    text("0.25", levelRange / 8, ellPos);

    stroke("#44FF44");
    strokeWeight(2);
    for (i = 0; i < timeDiv; i++) {
      line(-width / 2 + i * width / timeDiv,  ellPos - levelLog[i], -width / 2 + (i + 1) * width / timeDiv, ellPos - levelLog[i]);
    }
    pop();
    stroke(44, 255, 255, 128);
    strokeWeight(2);
    line((frameCount % (timeDiv))*width/timeDiv,0,(frameCount % (timeDiv))*width/timeDiv,height);
  }

  function update() {
    micLevel = mic.getLevel();
    ellSize = micLevel * levelRange;
    levelLog[frameCount % (timeDiv)] = ellSize;
  }

  function windowResized() {
    setup();
  }