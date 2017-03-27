function preload(){
  a_img = loadImage("assets/a.png");
}

function setup() {
  pixelDensity(1);
  var myCanvas = createCanvas(windowWidth * 0.6, windowHeight * 0.75);
  myCanvas.parent('sketch-holder');

  background(255);
  imageMode(CENTER);
  image(a_img,width/2,height/2);
}

function draw() {
  background(0,1);
}
