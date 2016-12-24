function setup() {
 createCanvas(200,100); 
 ellipseMode(CORNERS);
 k=30;
 L=R=0;
 Ltime=25;
 Rtime=10;
}


function draw() {
  fill(255,0,0);
  background(0);
  if(frameCount%(3*k)===0){
    L=Ltime;
  }
  if(frameCount%(1*k)===0){
    R=Rtime;
  }
  //print(frameRate());
  
  if(L>0){
    fill(255,0,0,L*(255/Ltime));
    ellipse(0,0,width/2,height);
    L--;
  }
  if(R>0){
    fill(255,0,0,R*(255/Rtime));
    ellipse(width/2,0,width,height);
    R--;
  }
}