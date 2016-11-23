function preload() {
  imageMode(CENTER);
  ellipseMode(RADIUS);
  rectMode(CORNER);
  pixelDensity(1);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  dragged=false;
  short = min(width, height);
  long = max(width, height);
  hgrid = width / 8;
  vgrid = height / 8;
  tsize = short / 8;
  hhalf = width / 2;
  vhalf = height / 2;
  bg = 0;
  rX = 0;
  rY = 0;
  aX = 0;
  aY = 0;
  vX = 0;
  vY = 0;
  X = 0;
  Y = 0;
  pX = 0;
  pY = 0;
  f = 60;
  bound =0.4;
  zoom = width / 4;
  background(bg);
}

function draw() {
  update();
  //background(bg);
  push();
  translate(hhalf, vhalf);

  noStroke();
  fill(bg,4);

  strokeWeight(hgrid/3);
  stroke(255);
  line(pX, pY, X, Y);

  noStroke();
  rect(-hhalf,-vgrid*3,hhalf*2,vgrid*6);
  fill(216);
  rect(-hhalf, -vhalf, hhalf * 2, vgrid);
  rect(-hhalf, vgrid * 3, hhalf * 2, vgrid);
  fill(0);
  textSize(tsize / 4);
  textAlign(CENTER, CENTER);
  text("tap screen to start/reset", 0, vgrid * 3.5);
  text("rotation sensor required", 0, -vgrid * 3.5);
  //  text(nfp(rX, 3, 2), -hgrid, vgrid * 3.75);
  //  text(nfp(rY, 3, 2), hgrid, vgrid * 3.75);

  pop();
}

function update() {
  rX = pow(-1,(abs(rotationX)>90)) * radians(rotationY);
  rY = radians(rotationX);
  f = frameRate()

  aX = 9.8 *zoom* sin(rX);
  aY = 9.8 *zoom* sin(rY);

  vX = vX + aX * 1 / f;
  vY = vY + aY * 1 / f;

  pX = X;
  pY = Y;

  X += vX * 1 / f;
  Y += vY * 1 / f;

  if (X > hhalf) {
    vX = -vX * bound;
    X = hhalf;
  }
  if (Y > vhalf - vgrid) {
    vY = -vY * bound;
    Y = vhalf - vgrid;
  }

  if (X < -hhalf) {
    vX = -vX * bound;
    X = -hhalf;
  }
  if (Y < -vhalf + vgrid) {
    vY = -vY * bound;
    Y = -vhalf + vgrid;
  }
}

/*function mouseDragged() {
  //drag event here
  dragged = true;
}

function mouseReleased() {
  if (dragged === false) {
    //click event here
  } else {
    dragged = false;
  }
}*/

function windowResized() {
  setup();
}

function mouseClicked() {
  setup();
}