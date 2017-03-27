var aX, aY, aZ;
var aX_max, aY_max, aZ_max;
var aX_min, aY_min, aZ_min;

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);

  frameRate(60);
  vgrid = height / 8;
  hgrid = width / 8;
  du = min(vgrid, hgrid);

  tsize = du / 3;
  rate = width / 180;
  rectH = tsize / 2;

  pixelDensity(1);

  aX_max = 0; aY_max = 0; aZ_max = 0;
  aX_min = 0; aY_min = 0; aZ_min = 0;
}

function draw() {
  aX = accelerationX;
  aY = accelerationY;
  aZ = accelerationZ;

  aX_max = (aX > aX_max) ? aX : aX_max;
  aY_max = (aY > aY_max) ? aY : aY_max;
  aZ_max = (aZ > aZ_max) ? aZ : aZ_max;

  aX_min = (aX < aX_min) ? aX : aX_min;
  aY_min = (aY < aY_min) ? aY : aY_min;
  aZ_min = (aZ < aZ_min) ? aZ : aZ_min;

  background(0);
  rectMode(CORNERS);
  textAlign(CENTER, BOTTOM);
  textSize(tsize);

  translate(width / 2, height / 2);
  fill(255);
  text("ACCELEROMETER\nTEST", 0, -vgrid * 3);


  fill("#FF0000");
  text("X: " + nfp(aX, 3, 2) + " m/s^2\nmax: " + nfp(aX_max, 3, 2) + " m/s^2   min: " + nfp(aX_min, 3, 2) + " m/s^2", 0, -vgrid);
  rect(aX * rate * (aX < 0), -vgrid + tsize - rectH, aX * rate * (aX > 0), -vgrid + tsize + rectH);

  fill("#00FF00");
  text("Y: " + nfp(aY, 3, 2) + " m/s^2\nmax: " + nfp(aY_max, 3, 2) + " m/s^2   min: " + nfp(aY_min, 3, 2) + " m/s^2", 0, 0);
  rect(aY * rate * (aY < 0), tsize - rectH, aY * rate * (aY > 0), tsize + rectH);

  fill("#0000FF");
  text("Z: " + nfp(aZ, 3, 2) + " m/s^2\nmax: " + nfp(aZ_max, 3, 2) + " m/s^2   min: " + nfp(aZ_min, 3, 2) + " m/s^2", 0, vgrid);
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