function preload() {
  imageMode(CENTER);
  ellipseMode(RADIUS);
  mainbarImg = loadImage("assets/mainbar.png");
  pixelDensity(1);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  short = min(width, height);
  long = max(width, height);
  hgrid = width / 8;
  vgrid = height / 8;
  tsize = short / 8;
  hhalf = width / 2;
  vhalf = height / 2;
  bg = 255;


  //mainbar = createSprite(width / 2, height / 2);
  //mainbar.maxSpeed = 6;
  //mainbar.friction = .98;
  //mainbar.setCollider("circle", 0, 0, 20);

  //mainbar.addImage("normal", mainbarImg);
  //mainbar.addAnimation("thrust", "assets/asteroids_ship0002.png", "assets/asteroids_ship0007.png");
}

function draw() {
  update();
  background(bg);
  push();
  translate(hhalf, vhalf);
  fill(0);
  textSize(tsize);
  textAlign(CENTER, CENTER);
  text("hoge", 0, 0);
  pop();

  drawSprites();
}

function update() {

}

function mouseDragged() {
  //drag event here
  dragged = true;
}

function mouseReleased() {
  if (dragged === false) {
    //click event here
  } else {
    dragged = false;
  }
}

function windowResized() {
  setup();
}