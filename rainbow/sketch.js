var img;
function preload() {
    pixelDensity(1);
    img = loadImage("assets/hima.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  short = min(width, height);
  long = max(width, height);
  colorMode(HSB);
  imageMode(CENTER);
}

function draw() {
    background(0);
    for(i =0;i<width;i++){
      strokeWeight(1);
      stroke((i+frameCount*2)%width*360/width,100,100);
      line(i,0,i,height);
    }
    image(img,width/2,height/2);
}



function windowResized() {
  setup();
}
