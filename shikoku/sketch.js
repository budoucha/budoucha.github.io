function preload() {
  y = 0;
  nihon = loadImage("data/kaigansenwithoutshikoku.png");
  shikoku = loadImage("data/kaigansenonlyshikoku.png");
  button = loadImage("data/button.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  short = min(width, height);
  long = max(width, height);
  hgrid = width / 8;
  vgrid = height / 8;
  
  if(width < height){
  scaleRate = width / nihon.width;
  }else{
  scaleRate = height / nihon.height;
  }
  
  offset = -height / 2 + nihon.height / 2 * scaleRate;
  buttonX=hgrid*2;
  buttonY=vgrid*2
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  
  push();
  scale(scaleRate);
  image(nihon, 0, 0 + offset/scaleRate);
  image(shikoku, 0, y + offset/scaleRate);
  
  pop();
  stroke("#FF0000");
  line(0, -height / 2 , 0, height / 2);

  image(button,buttonX,buttonY,button.width*scaleRate,button.height*scaleRate);
}


function windowResized() {
  setup();
}


function mouseClicked() {
  if(mouseX > width/2 + buttonX - button.width*scaleRate/2
  && mouseX < width/2 + buttonX + button.width*scaleRate/2 
  && mouseY > height/2 + buttonY - button.height*scaleRate/2
  && mouseY < height/2 + buttonY + button.height*scaleRate/2
  ){
  nanka();
  //println(1);
  }
  else{println(0);}
}


function nanka() {
  y += 230;

}