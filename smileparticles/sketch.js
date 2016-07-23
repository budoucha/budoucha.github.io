var ran, ranx, rany, du;

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);
  du = min(width, height) / 4;
  background(255);
}

function draw() {
  translate(width / 2, height / 2);
  fill(255, 64);
  noStroke();
  rect(-width / 2, -height / 2, width, height);
  stroke(0);

  for (var i = 0; i < 4 * du; i++) {
    ranx = random(-width / 2, width / 2);
    rany = random(-height / 2, height / 2);
    point(ranx, rany);
  }

  //mouth
  for (var i = 0; i < 3 * du; i++) {
    ran = random(PI / 8, PI - PI / 8);
    point(du * cos(ran) + du * randomGaussian() / 10,
      du * sin(ran) + du * randomGaussian() / 10);
  }

  //left eye
  push();
  translate(du / 2, -du / 3);
  for (var i = 0; i < du; i++) {
    ran = random(0, 2 * PI);
    point(du / 10 * (cos(ran) + randomGaussian()),
      du / 10 * (sin(ran) + randomGaussian()));
  }
  pop();

  //right eye
  push();
  translate(-du / 2, -du / 3);
  for (var i = 0; i < du; i++) {
    ran = random(0, 2 * PI);
    point(du / 10 * (cos(ran) + randomGaussian()),
      du / 10 * (sin(ran) + randomGaussian()));
  }
  pop();


  for (var i = 0; i < 400; i++) {
    ran = random(0, 2 * PI);
    point(1.6 * du * cos(ran) + du / 10 * randomGaussian(),
      1.6 * du * sin(ran) + du / 10 * randomGaussian());
  }


  for (var i = 0; i < 100; i++) {
    ran = frameCount * PI / 48;
    point(1.6 * du * cos(ran) + du / 8 * randomGaussian(),
      1.6 * du * sin(ran) + du / 8 * randomGaussian());
  }

  for (var i = 0; i < 100; i++) {
    ran = frameCount * PI / 48 + PI / 1.5;
    point(1.6 * du * cos(ran) + du / 8 * randomGaussian(),
      1.6 * du * sin(ran) + du / 8 * randomGaussian());
  }

  for (var i = 0; i < 100; i++) {
    ran = frameCount * PI / 48 - PI / 1.5;
    point(1.6 * du * cos(ran) + du / 8 * randomGaussian(),
      1.6 * du * sin(ran) + du / 8 * randomGaussian());
  }


}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  du = min(width, height) / 4;
}