var htuImage, handClapSound;
var bg, tSize, hasClapped;

function preload() {
    htuImage = loadImage("assets/HTU.png")
    handClapSound = loadSound("assets/hall-clapping-hands1.mp3");
}

function setup() {
    pixelDensity(1);
    var myCanvas = createCanvas(600, 800, P2D);
    myCanvas.parent('sketch-holder');

    frameRate(30);
    bg = 255;
    masterVolume(1.0);
    handClapSound.setVolume(0.8);
    handClapSound.playMode('sustain');
    hasClapped = false;
}

function draw() {
    background(bg);
    imageMode(CENTER);
    //copy(htuImage,0,0,htuImage.width,htuImage.height,width*0.2 , height*0.2 , width*0.6,height*0.6);
    image(htuImage, width / 2, height / 2);

    if (accelerationZ > 30) {
        if (hasClapped === false) {
            handClap();
            hasClapped = true;
        }
    }
    else {
        hasClapped = false;
        tSize = 64;
    }
    drawHands();
}

/*
function mousePressed(){
    handClap();
}*/


function handClap() {
    handClapSound.play();
    tSize = 128;
}


function drawHands() {
    textSize(tSize);
    textAlign(CENTER);
    noStroke();
    text("👏", width / 2, height / 2);
}
