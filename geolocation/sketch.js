function preload() {
  imageMode(CENTER);
  pixelDensity(1);
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

  //if(navigator.geolocation){fill("#00FF00");}
}



function draw() {
  //  background(255);
  update();
  rect(0, 0, 30, 30);
  push();
  translate(width / 2, height / 2);


  pop();

  //text(p5,0,-winMouseY*8);
}


function update() {

}

function windowResized() {
  setup();
}


function hoge(position) {
  text("done", 0, 0);
  //text("longitude: "+ position.longitude+"\nlatitude: "+ position.latitude,0,0); 
}

function errhoge(position) {
  text("err", 0, 0);
  //text("longitude: "+ position.longitude+"\nlatitude: "+ position.latitude,0,0); 
}
