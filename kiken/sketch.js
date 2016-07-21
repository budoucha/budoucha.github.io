var kkn;
/*
function preload() {
  kkn = loadImage("data/kiken.png");
};*/

var kknX,kknY,trslX,trslY
var drag;

function setup() {
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);

  kkn = loadImage("data/kiken.png");
  kknX=width/2;kknY=height/2;
  fill(0,64);
}

function draw() {
  background(255);

  push();
  textSize(18);
  textAlign(LEFT,TOP);
  fill(0,128);
  text("\"kiken drag\" by budoucha",0,0);
  pop();

  trslX=kknX-mouseX; trslY=kknY-mouseY;
  image(kkn,kknX,kknY);

  noStroke();
  //ellipse(mouseX,mouseY,20,20);

}

function mousePressed(){fill(255,0,0,64);
  if(abs(trslX)<kkn.width/2&&abs(trslY)<kkn.height/2){drag=true;}
  else{drag=false;}
}

function mouseDragged(){fill(0,255,0,64);
  if(drag==true){kknX=mouseX+trslX;kknY=mouseY+trslY;}
}

function mouseReleased(){fill(0,0,255,64);
  drag=false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
