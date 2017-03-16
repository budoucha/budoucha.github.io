function preload() {
  img = loadImage("assets/japari_no.bmp");
}


function setup() {
  pixelDensity(1);
  frameRate(60);
  createCanvas(windowWidth, windowHeight);

  data = [];
  for (var x = 0; x < img.width * 2; x++) {
    data[x] = [];
    for (var y = 0; y < img.height; y++) {
      data[x][y] = ((img.get(x, y)[0] < 16) && (x < img.width)) ? 1 : 0;
    }
  }

  period = 100 / img.width;

  vgrid = int(height / (data[0].length * 1.0));

  ax = 0;
  i = 0;
  isLocked = false;
  background(0);
}

function draw() {
  background(0);

  if (accelerationX > 8 && isLocked === false) {
    navigator.vibrate(20);
    isLocked = true; setTimeout(start(), 2 * period);
  }


  rectMode(CENTER);
  noStroke();
  for (var j = 0; j < data[i].length; j++) {
    fill(255 * data[i][j]);
    rect(width / 2, (j + 2) * vgrid, vgrid, vgrid);
  }
}

function start() {
  i = 0;
  var countup = function () {
    i++;
    var f = setTimeout(countup, period);

    if (i >= data.length - 1) {
      clearTimeout(f);
      unlock();
      i = 0;
    }
  }
  countup();
}

function unlock() {
  isLocked = false;
}
