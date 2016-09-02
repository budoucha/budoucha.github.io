var ran, ranx, rany, du;
var cnt;

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);
  pixelDensity(1);
  du = min(width, height) / 4;
  background(255);
}

function draw() {
  cnt = 0;
  translate(width / 2, height / 2);
  fill(255, 48);
  noStroke();
  rect(-width / 2, -height / 2, width, height);
  stroke(0);

  strokeWeight(du / 128);
  //background
  for (var i = 0; i < 192; i++) {
    ranx = random(-width / 2, width / 2);
    rany = random(-height / 2, height / 2);
    point(ranx, rany);//cnt++;
  }

  //mouth
  for (var i = 0; i < 128; i++) {
    ran = random(PI / 8, PI - PI / 8);
    point(du * cos(ran) + du * randomGaussian() / 16,
      du * sin(ran) + du * randomGaussian() / 16);//cnt++;
  }

  //eyes
  var RL = 1;
  for (var k = 0; k < 2; k++) {
    push();
    translate(RL * du / 2, -du / 3);
    for (var i = 0; i < 48; i++) {
      ran = random(0, 2 * PI);
      point(du / 12 * (cos(ran) + randomGaussian()),
        du / 12 * (sin(ran) + randomGaussian()));//cnt++;
    }
    pop();
    RL = -RL;
  }

  //face
  for (var i = 0; i < 128; i++) {
    ran = random(0, 2 * PI);
    point(1.6 * du * cos(ran) + du / 16 * randomGaussian(),
      1.6 * du * sin(ran) + du / 16 * randomGaussian());//cnt++;
  }


  //satelites
  for (var k = 0; k < 3; k++) {
    for (var i = 0; i < 32; i++) {
      ran = frameCount * PI / 48 + k * PI / 1.5;;
      point(1.6 * du * cos(ran) + du / 12 * randomGaussian(),
        1.6 * du * sin(ran) + du / 12 * randomGaussian());//cnt++;
    }
  }

  //println(cnt);

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  du = min(width, height) / 4;
}