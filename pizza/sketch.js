var pizzas = 8;
var pizza = "🍕";
var radius;

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  background(216);
  radius = min(width,height)/12;
}

function draw() {
  background(216);
  var offset =textWidth(pizza);
  push();
  translate(width/2,height/2);
  rotate(radians(frameCount)*2);
  push();
  for(i=0;i<pizzas;i++){
    rotate(radians(360/pizzas));
    var ts = 108;
    textSize(ts);
    text(pizza,radius+radius*sin(radians(frameCount)*2)-offset*2,
    -radius-radius*sin(radians(frameCount)*2));
  }
  pop();
  pop();
  

}


function windowResized(){
  setup();
}