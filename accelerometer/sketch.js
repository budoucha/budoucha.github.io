function setup() {
  createCanvas(windowWidth, windowHeight, P2D);

  frameRate(60);
  vgrid = height / 8;
  hgrid = width / 8;
  du = min(vgrid, hgrid);

  tsize = du / 2;
  rate = width / 60;
  rectH = tsize / 2;
  
  pixelDensity(1);
}

function draw() {
  aX = accelerationX;
  aY = accelerationY;
  aZ = accelerationZ;
  background(0);
  rectMode(CORNERS);
  textAlign(CENTER, CENTER);
  textSize(tsize);

  translate(width / 2, height / 2);
  fill(255);
  text("ACCELEROMETERS\nTEST", 0, -vgrid * 3);


  fill("#FF0000");
  text(nfp(aX, 3, 2) + " m/s/s", 0, -vgrid);
  rect(aX * rate * (aX < 0), -vgrid + tsize - rectH, aX * rate * (aX > 0), -vgrid + tsize + rectH);

  fill("#00FF00");
  text(nfp(aY, 3, 2) + " m/s/s", 0, 0);
  rect(aY * rate * (aY < 0), tsize - rectH, aY * rate * (aY > 0), tsize + rectH);

  fill("#0000FF");
  text(nfp(aZ, 3, 2) + " m/s/s", 0, vgrid);
  rect(aZ * rate * (aZ < 0), vgrid + tsize - rectH, aZ * rate * (aZ > 0), vgrid + tsize + rectH);

  fill(255);
  //text("display density: " + displayDensity(), 0, vgrid * 3 - tsize * 3);
  //text("display size: " + displayWidth + "*" + displayHeight, 0, vgrid * 3 - tsize * 2);
  //text("window size: " + windowWidth + "*" + windowHeight, 0, vgrid * 3 - tsize);
  text("canvas size: " + width + " * " + height, 0, vgrid * 3);
  text(nf(frameRate(), 2, 1) + " fps", 0, vgrid * 3 + tsize);
  //text("pixel density: " + pixelDensity(), 0, vgrid * 3+tsize*2);
}

function windowResized() {
  setup();
}