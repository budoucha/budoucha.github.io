function preload() {
  imageMode(CENTER);
  pixelDensity(1);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pg = createGraphics(width, height);
  short = min(width, height);
  long = max(width, height);
  hgrid = width / 8;
  vgrid = height / 8;
}

function draw() {
  update();
  background(0);
  //pointLight(255, 0, 0, 0, 0, 300);

  push();
  rotateZ(rotZ);
  rotateX(rotX);
  rotateY(rotY);

  box(200);
  box(long * 2);
  pop();


  /*
    push();
    translate(0, vgrid * 6.5);
    pg.background(255,128);
    pg.clear();
    pg.noStroke(0);
    pg.fill(0);
    pg.textSize(vgrid / 4);
    pg.text("rotX= " + nf(rotX, 3, 2) + "\nrotY= " + nf(rotY, 3, 2) + "\nrotZ= " + nf(rotZ, 3, 2), hgrid, vgrid / 2);
    texture(pg);
    plane(width, height);
    pop();*/

}


function update(){
  rotX=0;
  rotY=0;
  rotZ=0;
  rotZ = radians(rotationZ) * (-1*(abs(rotationX)<=90) + (abs(rotationX)>90));
  rotX = cos(rotZ) * radians(-rotationX) + sin(rotZ) * radians(-rotationY);
  rotY = sin(radians(rotationZ)) * radians(-rotationX) + cos(radians(rotationZ)) * radians(rotationY);
}

function windowResized() {
  setup();
}