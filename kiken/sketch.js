var kkn;
var kknX,kknY,distX,distY,relX,relY;
var drag;

function setup() {
  createCanvas(windowWidth,windowHeight,P2D);
  pixelDensity(1);
  imageMode(CENTER);

  kkn = loadImage("data/kiken.png");
  kknX=width/2;kknY=height/2;
  fill(0,64);
  noStroke();
}

function draw() {
  background(255);

  push();
  fill(128);
  textSize(18);  textAlign(LEFT,TOP);
  text("\"kiken drag\" by budoucha",0,0);
  pop();

  //rect(0,0,50,50);
  //ellipse(touchX,touchY,60,60);
  update();
  image(kkn,kknX,kknY);
}


function update(){
  if(drag){
  kknX = touchX+relX; kknY = touchY+relY;
  }

  distX=kknX-touchX; distY=kknY-touchY;
  if(abs(distX)<kkn.width/2 && abs(distY)<kkn.height/2){cursor(MOVE);}
  else{cursor(ARROW);}
}

function touchStarted(){//fill(255,0,0,64);
  distX=kknX-touchX; distY=kknY-touchY;
  if(abs(distX)<kkn.width/2 && abs(distY)<kkn.height/2){//fill(0,255,0,64);
    relX =distX; relY = distY;
    drag=true;
  }
}

function touchEnded(){
  //fill(0,0,255,64);
  drag=false;
}

function touchMoved(){
  return false;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
