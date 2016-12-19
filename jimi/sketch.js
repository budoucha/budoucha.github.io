score = 0;

function preload() {

  pixelDensity(1);

  jimiImg = loadImage("data/jimi.jpg");
  //jimiImg = loadImage("data/dummy.jpg");
  jikiImg = loadImage("data/jiki.png");
  bulletImg = loadImage("data/bullet.png");
  bgImg = loadImage("data/bglong.jpg");
  aImg = loadImage("data/a.png");
  wikiLogoL = loadImage("data/wiki-Logo.png");
  wikiLogoM = loadImage("data/wiki-Logo.png");
  wikiLogoS = loadImage("data/wiki-Logo.png");
}

function setup() {
  createCanvas(600, 800);
  short = min(width, height);
  long = max(width, height);
  hgrid = width / 8;
  vgrid = height / 8;
  tsize = short / 8;
  hhalf = width / 2;
  vhalf = height / 2;

  bg = bgImg;

  jikiSpeedDefault = 6;
  jikiSpeedSlow = 3;
  jikiSpeed = jikiSpeedDefault;
  shotSpeed = -10;


  jimiImg.resize(hgrid * 1.44, hgrid * 1.44);
  jikiImg.resize(hgrid, hgrid);

  jimi = createSprite(hhalf, vgrid, hgrid, hgrid);
  jiki = createSprite(hhalf, vgrid * 7, hgrid, hgrid);
  jimi.addImage(jimiImg);
  jiki.addImage(jikiImg);
  shtcntdwn = 0;


  wikiLogoL.resize(hgrid * 2, hgrid * 2);
  wikiLogoM.resize(hgrid * 0.8, hgrid * 0.8);
  wikiLogoS.resize(hgrid * 0.4, hgrid * 0.4);
  url1 = "https://payments.wikimedia.org/index.php?title=Special:GlobalCollectGateway&language=ja&country=JP&currency_code=JPY&frequency=onetime&amount=Other&amountGiven=";
  id = "input_amount_other_box"
}


function draw() {
  update();
  background(216);
  scroll = 0 - frameCount % bgImg.height + bgImg.height;
  if (scroll > 0) {
    image(bg, 0, scroll - bgImg.height, width, bgImg.height);
  }
  if (scroll < height) {
    image(bg, 0, scroll, width, bgImg.height);
  }

  fill(0);

  pop();
  drawSprites();
  drawTexts();
}

function update() {
  score++;
  jimiMove();

  readKey();

  if (shtcntdwn > 0) {
    shtcntdwn--; //発射可能カウントダウン
  }

}


function readKey() {
  if (keyDown("RIGHT_ARROW") && jiki.position.x + jiki.width / 2 < width) {
    jiki.position.x += jikiSpeed;
  }
  if (keyDown("LEFT_ARROW") && jiki.position.x - jiki.width / 2 > 0) {
    jiki.position.x -= jikiSpeed;
  }
  if (keyDown("UP_ARROW") && jiki.position.y - jiki.height / 2 > 0) {
    jiki.position.y -= jikiSpeed;
  }
  if (keyDown("DOWN_ARROW") && jiki.position.y + jiki.height / 2 < height) {
    jiki.position.y += jikiSpeed;
  }

  if (keyDown("SHIFT")) {
    jikiSpeed = jikiSpeedSlow;
  } else {
    jikiSpeed = jikiSpeedDefault;
  }

  if (keyDown("Z")) {
    shoot();
  }

}

function shoot() {
  if (shtcntdwn < 1) {
    shot = createSprite(jiki.position.x + randomGaussian(0, 5), jiki.position.y - 24, 4, 40);
    shot.addImage(bulletImg);
    shot.life = 80;
    shotSpeed = -10;
    shot.velocity.x = 0;
    shot.velocity.y = shotSpeed;

    shtcntdwn = 3; //発射不可時間
  }
}

function jimiMove() {
  jimi.position.x += randomGaussian(0, 2);
  if (frameCount % 90 == 0) {
    jimiShot(0);
  }
  if (frameCount % 47 == 0) {
    jimiShot(1);
  }
  if (frameCount % 57 == 0) {
    jimiShot(2);

  }
}

function jimiShot(type) {
  if (type == 0) {
    shotSpeed = 1.8;
    shotAngle = randomGaussian(HALF_PI, 0.5);
    shot = createSprite(jimi.position.x, jimi.position.y + 64, 4, 4);
    shot.addImage(wikiLogoL);
    shot.life = 440;
    shot.velocity.x = shotSpeed * cos(shotAngle);
    shot.velocity.y = shotSpeed * sin(shotAngle);
  }
  if (type == 1) {
    shotSpeed = 4;
    for (i = -1; i < 2; i += 2) {
      shotAngle = HALF_PI - i * 0.1 - atan2(jiki.position.x - jimi.position.x, jiki.position.y - jimi.position.y);
      shot = createSprite(jimi.position.x, jimi.position.y + 64, 4, 4);
      shot.addImage(wikiLogoM);
      shot.life = 180;
      shot.velocity.x = shotSpeed * cos(shotAngle);
      shot.velocity.y = shotSpeed * sin(shotAngle);
    }
  }
  if (type == 2) {
    shotSpeed = 8;
    for (i = 0; i < 3; i++) {
      shotAngle = HALF_PI - atan2(jiki.position.x - jimi.position.x, jiki.position.y - jimi.position.y);
      shot = createSprite(jimi.position.x + i * 4 * shotSpeed * cos(shotAngle), jimi.position.y + i * 4 * shotSpeed * sin(shotAngle) + 64, 4, 4);
      shot.addImage(wikiLogoS);
      shot.life = 80;
      shot.velocity.x = pow(1.1, i) * shotSpeed * cos(shotAngle);
      shot.velocity.y = pow(1.1, i) * shotSpeed * sin(shotAngle);
    }
  }
}

function drawTexts() {
  textSize(32);
  textAlign(RIGHT);
  strokeWeight(4);
  stroke(0);
  fill(255);
  text("fps: " + nf(frameRate(), 0, 2) + " ", width, height - vgrid / 2);
  text("DONATE: ￥" + score + " ", width, vgrid / 2);
}



function donate() { //寄付ページに移動
  url = url1 + score;
  document.location.href = url;
}