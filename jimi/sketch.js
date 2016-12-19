function preload() {
  pixelDensity(1);
  jimiImg = loadImage("data/jimi.jpg");
  jikiImg = loadImage("data/jiki.png");
  bulletImg = loadImage("data/bullet.png");
  bgImgLong = loadImage("data/bglong.jpg");
  bgImgShort = loadImage("data/bg.jpg");
  aImg = loadImage("data/a.png");
  wikiLogoL = loadImage("data/wiki-Logo.png");
  wikiLogoM = loadImage("data/wiki-Logo.png");
  wikiLogoS = loadImage("data/wiki-Logo.png");
}

function setup() {
  createCanvas(600, 800);
  hgrid = width / 8;
  vgrid = height / 8;
  hhalf = width/2;

  jikiSpeedDefault = 6;
  jikiSpeedSlow = 3;
  jikiSpeed = jikiSpeedDefault;

  myBullets = new Group();

  jikiImg.resize(hgrid, hgrid);
  jiki = createSprite(hhalf, vgrid * 7, hgrid, hgrid);
  jiki.addImage(jikiImg);

  jimiImg.resize(hgrid * 1.44, hgrid * 1.44);
  jimi = createSprite(hhalf, vgrid, hgrid, hgrid);
  jimi.addImage(jimiImg);
  jimi.setCollider("rectangle");

  wikiLogoL.resize(hgrid * 2, hgrid * 2);
  wikiLogoM.resize(hgrid * 0.8, hgrid * 0.8);
  wikiLogoS.resize(hgrid * 0.4, hgrid * 0.4);

  shtcntdwn = 0;  
  score = 0;
  
  url1 = "https://payments.wikimedia.org/index.php?title=Special:GlobalCollectGateway&language=ja&country=JP&currency_code=JPY&frequency=onetime&amount=Other&amountGiven=";
  id = "input_amount_other_box"
}

function draw() {
  update();
  background(216);
  scroll = 0 - frameCount % bgImgLong.height + bgImgLong.height;
  if (scroll > 0) {
    image(bgImgLong, 0, scroll - bgImgLong.height, width, bgImgLong.height);
  }
  if (scroll < height) {
    image(bgImgShort, 0, scroll, width, bgImgShort.height);
  }

  fill(0);

  pop();
  drawSprites();
  drawTexts();
}

function update() {
  jimi.overlap(myBullets, myHit);

  jimiMove();
  readKey();

  if (shtcntdwn > 0) {
    shtcntdwn--; //再装填カウントダウン
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
    myBullet = createSprite(jiki.position.x + randomGaussian(0, 5), jiki.position.y - 24, 4, 40);
    myBullet.addImage(bulletImg);
    myBullet.life = 80;
    myBulletSpeed = -10;
    myBullet.velocity.x = 0;
    myBullet.velocity.y = myBulletSpeed;
    myBullets.add(myBullet);
    myBullet.setCollider("rectangle");

    shtcntdwn = 4; //再装填時間
  }
}

function myHit(jimi, myBullet) {
  score++;
  myBullet.remove();
}


function jimiMove() {
  jimi.position.x = hhalf + width / 3 * sin(frameCount / 108);
  if (frameCount % 90 == 0) {
    jimiShoot(0);
  }
  if (frameCount %  47 == 0) {
    jimiShoot(1);
  }
  if (frameCount % 57 == 0) {
    jimiShoot(2);

  }
}

function jimiShoot(type) {
  if (type == 0) {
    jimiShotSpeed = 1.8;
    jimiShotAngle = randomGaussian(HALF_PI, 0.5);
    jimiShot = createSprite(jimi.position.x, jimi.position.y + 64, 4, 4);
    jimiShot.addImage(wikiLogoL);
    jimiShot.life = 440;
    jimiShot.velocity.x = jimiShotSpeed * cos(jimiShotAngle);
    jimiShot.velocity.y = jimiShotSpeed * sin(jimiShotAngle);
  }
  if (type == 1) {
    jimiShotSpeed = 4;
    for (i = -1; i < 2; i += 2) {
      jimiShotAngle = HALF_PI - i * 0.1 - atan2(jiki.position.x - jimi.position.x, jiki.position.y - jimi.position.y);
      jimiShot = createSprite(jimi.position.x, jimi.position.y + 64, 4, 4);
      jimiShot.addImage(wikiLogoM);
      jimiShot.life = 180;
      jimiShot.velocity.x = jimiShotSpeed * cos(jimiShotAngle);
      jimiShot.velocity.y = jimiShotSpeed * sin(jimiShotAngle);
    }
  }
  if (type == 2) {
    jimiShotSpeed = 8;
    for (i = 0; i < 3; i++) {
      jimiShotAngle = HALF_PI - atan2(jiki.position.x - jimi.position.x, jiki.position.y - jimi.position.y);
      jimiShot = createSprite(jimi.position.x + i * 4 * jimiShotSpeed * cos(jimiShotAngle), jimi.position.y + i * 4 * jimiShotSpeed * sin(jimiShotAngle) + 64, 4, 4);
      jimiShot.addImage(wikiLogoS);
      jimiShot.life = 80;
      jimiShot.velocity.x = pow(1.1, i) * jimiShotSpeed * cos(jimiShotAngle);
      jimiShot.velocity.y = pow(1.1, i) * jimiShotSpeed * sin(jimiShotAngle);
    }
  }
}

function drawTexts() {
  textSize(24);
  textAlign(RIGHT);
  strokeWeight(3);
  stroke(0);
  fill(255);
  text("fps: " + nf(frameRate(), 0, 2) + " ", width, height - vgrid / 2);
  text("DONATE: ￥" + score + " ", width, vgrid / 2);
}


function donate() { //寄付ページに移動
  url = url1 + score;
  document.location.href = url;
}