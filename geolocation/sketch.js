function preload() {
  imageMode(CENTER);
  pixelDensity(1);
  locationData = getCurrentPosition();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  short = min(width, height);
  long = max(width, height);
  hgrid = width / 8;
  vgrid = height / 8;

  if (geoCheck() == true) {
    fill("#0000FF");
  } else {
    fill("#FF0000");
  }
}

function draw() {
  background(255);
  update();
  rect(0, 0, 30, 30);
  push();
  translate(width / 2, height / 2);
  text("longitude: "+locationData.longitude+"\nlatitude: "+locationData.latitude,0,0);

  pop();

  //text(p5,0,-winMouseY*8);
}


function update() {

}

function windowResized() {
  setup();
}