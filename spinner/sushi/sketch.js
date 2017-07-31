var img;

function preload(){
  img = loadImage("./assets/sushi.png");
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  img.resize(width *0.9, img.height*width *0.9/img.width);
  ar = 0;
  vr = 0;
  dr = 0;
  r = 0;
  colorMode(HSB);
}
function draw() {
  background(0);
  drawBg();

  push();
  translate(width / 2, height / 2);
  spinner();
  imageMode(CENTER);
  image(img,0,0);
  pop();

}

function spinner() {
  rz = (rotationZ > 180) ? rotationZ - 360 : rotationZ;
  prz = (pRotationZ > 180) ? pRotationZ - 360 : pRotationZ;
  dr = (30 < rotationZ && rotationZ < 330) ? rotationZ - pRotationZ : rz - prz;
  if (!pRotationZ) { dr = 0.0001; }

  ar = 0.05 * -radians(dr / abs(dr) * (dr * dr));
  vr += 0.2 * ar;
  r += vr;
  if (touches.length > 0) { vr = ar = 0; }
  rotate(r);
  vr = 0.995 * vr;

}

function drawBg() {
  push();
  var bga = abs(vr)*120-15;
  steps = 48;
  weight = height / steps;
  strokeWeight(weight+1);
  for (i = 0; i < steps; i++) {
    stroke(360 - (-i + frameCount * 5) % 360, 100, bga);
    line(0, i * weight, height, i * weight);
  }
  pop();
}
