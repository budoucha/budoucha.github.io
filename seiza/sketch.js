function setup() {
  pixelDensity(1);
  var myCanvas = createCanvas(windowWidth * 0.96, windowHeight * 0.75);
  myCanvas.parent('sketch-holder');

  background(0);
  textAlign(CENTER);
  textSize(48);
  fill(255);
  text("Left click to (re)generate", width / 2, height / 2);
}

function draw() {
}

function drawSeiza() {
  background(0);

  var datalen = 255; // numbber of data
  var margin = min(width, height) * 0.05;
  var bigint = 114514893; // 値がでかい

  var dataX = []; //data-position X container
  var dataY = []; // data-position Y container


  noStroke();
  ellipseMode(CENTER);
  for (i = 0; i < datalen; i++) { //initialize data-position
    dataX[i] = random(0 + margin, width - margin);
    dataY[i] = random(0 + margin, height - margin);
    ellipse(dataX[i], dataY[i], 5, 5);
    //console.log(dataX[i]);
  }

  var distances = []; //distances-between-data container
  stroke(255);
  for (i = 0; i < datalen; i++) {
    distances[i] = [];
    for (j = 0; j < datalen; j++) {
      distances[i][j] = int(dist(dataX[i], dataY[i], dataX[j], dataY[j])); // store distances
    }
    distances[i][i] = bigint; // exclude itself
  }

  for (i = 0; i < datalen; i++) {
    mindisi = min(distances[i]);
    for (j = 0; j < datalen; j++) {
      if (distances[i][j] == mindisi) { // draw line to nearest neighboor
        line(dataX[i], dataY[i], dataX[j], dataY[j]);
        if (distances[i][j] == min(distances[j])) { // dissolve isolated pairs
          distances[j][i] = bigint;
        }
        break;
      }
    }
  }
}

function mouseClicked() {
  drawSeiza();
}