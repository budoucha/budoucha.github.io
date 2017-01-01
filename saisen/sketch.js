function preload() {
  pixelDensity(1);
  coinImg = loadImage("data/money_5a.png");
  boxImg = loadImage("data/saisenbako.png");
  s1 = loadSound('data/money-drop2.mp3');
}

function setup() {
  n = allSprites.length;
  for (i = 0; i < n; i++) {
    allSprites[0].remove();
  }
  var myCanvas = createCanvas(windowWidth, windowHeight*0.8);
  myCanvas.parent('sketch-holder');

  coinImg.resize(width / 16, width / 16);
  boxImg.resize(width / 4, boxImg.height * width / 4 / boxImg.width);

  saisens = new Group();
  saisenbako = createSprite(width / 2, height / 4, 1, 1);
  saisenbako.addImage(boxImg);

  s1.setVolume(0.1);
  s1.playMode('sustain');
  
  kingaku = 0;
}

function draw() {
  background(255);
  if (mouseIsPressed) {
    throwSaisen();
  }
  drawSprites();

  saisenbako.overlap(saisens, charin);
  
  fill(0);
  textSize(24);
  textAlign(CENTER);
  text('￥'+kingaku,width/2,height*15/16);
}

function throwSaisen() {
  saisen = createSprite(mouseX + randomGaussian(0, 5), mouseY + randomGaussian(0, 5), 1, 1);
  saisen.addImage(coinImg);
  angle = HALF_PI - atan2(saisenbako.position.x - mouseX, saisenbako.position.y - mouseY);
  saisen.velocity.x = width / 16 * cos(angle);
  saisen.velocity.y = width / 16 * sin(angle);
  saisen.setCollider("circle", 0, 0, saisen.width / 2.1);
  saisens.add(saisen);
}

function charin(saisenbako, saisen) {
  s1.play();
  saisen.remove();
  kingaku+=5;
}