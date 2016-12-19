function preload() {
  pixelDensity(1);
  title = loadImage("data/title.png");
  subtitle = loadImage("data/subtitle.png");
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
  hhalf = width / 2;

  titleScale = width * 0.78 / title.width;
  title.resize(title.width * titleScale, title.height * titleScale);
  subtitleScale = width * 0.96 / subtitle.width;
  subtitle.resize(subtitle.width * subtitleScale, subtitle.height * subtitleScale);

  jikiSpeedDefault = 6;
  jikiSpeedSlow = 3;
  jikiSpeed = jikiSpeedDefault;

  myBullets = new Group();
  jimiBullets = new Group();

  jikiImg.resize(hgrid * 0.8, hgrid * 0.8);
  jiki = createSprite(hhalf, vgrid * 7, hgrid, hgrid);
  jiki.addImage(jikiImg);
  jikiHead = jiki.height * 0.19;
  jiki.setCollider("circle", 0, -8, jikiHead);
  jikiLife = 128;

  jimiImg.resize(hgrid * 1.44, hgrid * 1.44);
  jimi = createSprite(hhalf, vgrid, hgrid, hgrid);
  jimi.addImage(jimiImg);
  jimi.setCollider("rectangle", 0, 0, jimi.width, jimi.height * 0.6);

  wikiLogoL.resize(hgrid * 2, hgrid * 2);
  wikiLogoM.resize(hgrid * 0.8, hgrid * 0.8);
  wikiLogoS.resize(hgrid * 0.4, hgrid * 0.4);

  score = 0;
  shtcntdwn = 0;
  mode = 0;

  url1 = "https://payments.wikimedia.org/index.php?title=Special:GlobalCollectGateway&language=ja&country=JP&currency_code=JPY&frequency=onetime&amount=Other&amountGiven=";
  id = "input_amount_other_box"
}

function draw() {
  if (mode == 1) {
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

    ellipseMode(CENTER);
    strokeWeight(2);
    blink = 156 + 128 * sin(12 * radians(frameCount % 360));
    stroke(blink);
    colorMode(HSB);
    fill(24, 216, blink);
    ellipse(jiki.position.x, jiki.position.y - jikiHead, 15);

    rectMode(CORNER);
    noStroke();
    if (jikiLife > 64) {
      fill('#00FF00');
    } else if (jikiLife > 32) {
      fill('#FFFF00');
    } else {
      fill('#FF0000');
    }
    rect(jiki.position.x - 28, jiki.position.y + jiki.height * 0.55, map(jikiLife, 0, 128, 0, 56), 6);
    strokeWeight(1);
    stroke(36);
    noFill();
    rect(jiki.position.x - 28, jiki.position.y + jiki.height * 0.55, 56, 6);


    drawTexts();
  } else if (mode === 0) {
    background(0);
    imageMode(CENTER);
    image(title, hhalf, vgrid * 2);
    image(subtitle, hhalf, vgrid * 2.9);

    textAlign(CENTER);
    textSize(36);
    strokeWeight(3);
    stroke(255);
    fill(0);
    text("move: ARROW KEY\nshot: [Z]\nslow mode: [SHIFT]\n\n\npress [Z] to start", hhalf, vgrid * 5);
    if (keyDown("Z")) {
      mode = 1;
    }
  } else if (mode == 2) {
    background(0);
    textAlign(CENTER);
    stroke(255);
    fill(0);
    textSize(64);
    strokeWeight(4);
    text("GAME OVER", hhalf, vgrid * 2);
    textSize(36);
    strokeWeight(3);
    text("SCORE:\n￥" + score, hhalf, vgrid * 3);
    text("press [Z] to restart\n\npress [D] to\ndonate Wikipedia\n(jump to wikimedia.org) ", hhalf, vgrid * 5);
    if (keyDown("Z")) {
      setup();
    }
    if (keyDown("D")) {
      donate();
    }
  }

}

function update() {
  if (jikiLife < 1) {
    gameOver();
  }
  jimi.overlap(myBullets, myHit);
  jimiBullets.overlap(jiki, jimiHit);
  jimi.overlap(jiki, directHit);
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
    myBullet.life = 64;
    myBulletSpeed = -12;
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
  if (frameCount % 90 === 0) {
    jimiShoot(0);
  }
  if (frameCount % 53 === 0) {
    jimiShoot(1);
  }
  if (frameCount % 67 === 0) {
    jimiShoot(2);

  }
}

function jimiShoot(type) {
  if (type === 0) {
    jimiBulletSpeed = 1.8;
    jimiBulletAngle = randomGaussian(HALF_PI, 0.5);
    jimiBullet = createSprite(jimi.position.x, jimi.position.y + 64, 4, 4);
    jimiBullet.addImage(wikiLogoL);
    jimiBullet.life = 440;
    jimiBullet.velocity.x = jimiBulletSpeed * cos(jimiBulletAngle);
    jimiBullet.velocity.y = jimiBulletSpeed * sin(jimiBulletAngle);
    jimiBullets.add(jimiBullet);
    jimiBullet.setCollider("circle", 0, 0, jimiBullet.width / 2);
  } else if (type == 1) {
    jimiBulletSpeed = 4;
    for (i = -1; i < 2; i += 2) {
      jimiBulletAngle = HALF_PI - i * 0.12 - atan2(jiki.position.x - jimi.position.x, jiki.position.y - jimi.position.y);
      jimiBullet = createSprite(jimi.position.x, jimi.position.y + 64, 4, 4);
      jimiBullet.addImage(wikiLogoM);
      jimiBullet.life = 192;
      jimiBullet.velocity.x = jimiBulletSpeed * cos(jimiBulletAngle);
      jimiBullet.velocity.y = jimiBulletSpeed * sin(jimiBulletAngle);
      jimiBullets.add(jimiBullet);
      jimiBullet.setCollider("circle", 0, 0, jimiBullet.width / 2);
    }
  } else if (type == 2) {
    jimiBulletSpeed = 10;
    for (i = 0; i < 3; i++) {
      jimiBulletAngle = HALF_PI - atan2(jiki.position.x - jimi.position.x, jiki.position.y - jimi.position.y - 64);
      jimiBullet = createSprite(jimi.position.x + i * 4 * jimiBulletSpeed * cos(jimiBulletAngle), jimi.position.y + i * 4 * jimiBulletSpeed * sin(jimiBulletAngle) + 64, 4, 4);
      jimiBullet.addImage(wikiLogoS);
      jimiBullet.life = 80;
      jimiBullet.velocity.x = pow(1.11, i) * jimiBulletSpeed * cos(jimiBulletAngle);
      jimiBullet.velocity.y = pow(1.11, i) * jimiBulletSpeed * sin(jimiBulletAngle);
      jimiBullets.add(jimiBullet);
      jimiBullet.setCollider("circle", 0, 0, jimiBullet.width / 2);
    }
  }
}

function jimiHit(jimiBullet, jiki) {
  jimiBullet.remove();
  jikiLife--;
  print(jikiLife);
}

function directHit(jimi, jiki) {
  jikiLife-=2;
  print(jikiLife);
}


function gameOver() {
  jimi.remove();
  jiki.remove()
  mode = 2;
}

function drawTexts() {
  textSize(24);
  textAlign(RIGHT);
  strokeWeight(3);
  stroke(0);
  fill(255);
  text("fps: " + nf(frameRate(), 0, 2) + " ", width, height - vgrid / 2);
  text("DONATE: ￥" + score + "  ", width, vgrid / 2);
}


function donate() { //寄付ページに移動
  url = url1 + score;
  document.location.href = url;
}