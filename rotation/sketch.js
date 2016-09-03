function setup() {
  createCanvas(windowWidth, windowHeight, P2D);

  frameRate(60);
  vgrid = height / 8;
  hgrid = width / 8;
  du = min(vgrid, hgrid);

  tsize = du / 2;
  rate = width / 180;
  rectH = tsize / 2;
  
  pixelDensity(1);
}

function draw() {
  rX = rotationX;
  rY = rotationY;
  rZ = rotationZ;
  background(0);
  rectMode(CORNERS);
  textAlign(CENTER, CENTER);
  textSize(tsize);

  translate(width / 2, height / 2);
  fill(255);
  text("ROTATION\nTEST", 0, -vgrid * 3);


  fill("#FF0000");
  text(nfp(rX, 3, 2) + " m/s/s", 0, -vgrid);
  rect(rX * rate * (rX < 0), -vgrid + tsize - rectH, rX * rate * (rX > 0), -vgrid + tsize + rectH);

  fill("#00FF00");
  text(nfp(rY, 3, 2) + " m/s/s", 0, 0);
  rect(rY * rate * (rY < 0), tsize - rectH, rY * rate * (rY > 0), tsize + rectH);

  fill("#0000FF");
  text(nfp(rZ, 3, 2) + " m/s/s", 0, vgrid);
  rect(rZ * rate * (rZ < 0), vgrid + tsize - rectH, rZ * rate * (rZ > 0), vgrid + tsize + rectH);

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