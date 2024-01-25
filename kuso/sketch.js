let htuImage, handClapSound;
let bg, tSize, hasClapped;
let initialState = true;

function preload() {
    htuImage = loadImage("assets/HTU.png")
    handClapSound = loadSound("assets/hall-clapping-hands.mp3");
}

function setup() {
    pixelDensity(1);
    const myCanvas = createCanvas(600, 800, P2D);
    myCanvas.parent('sketch-holder');

    frameRate(30);
    bg = 255;
    masterVolume(1.0);
    handClapSound.setVolume(1.0);
    handClapSound.playMode('sustain');
    hasClapped = false;
}

function draw() {
    background(bg);
    imageMode(CENTER);
    //copy(htuImage,0,0,htuImage.width,htuImage.height,width*0.2 , height*0.2 , width*0.6,height*0.6);
    image(htuImage, width / 2, height / 2);
    if (initialState) {
        fill(255, 168);
        rect(0, 0, width, height); //メイン画像を薄く
        textSize(64);
        textAlign(CENTER);
        fill(0);
        noStroke();
        text("tap to start", width / 2, height / 2);
        return;
    }

    if (accelerationZ > 35) {
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


function mousePressed() {
    if (initialState) {
        initialState = false;
        return;
    }
    if (accelerationZ == 0) {
        handClap();
    }
}

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
