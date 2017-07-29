var cubeNum = 256;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
var cubes = [];

var h = 0, s = 100, l = 50;
var scl = 1;
var r1 = 0, r2 = 96;
var r = 0;
var trX = 0, trY = 0;

for (i = 0; i < cubeNum; i++) {
    cubes.push(new THREE.Mesh(geometry, material));
    scene.add(cubes[i]);
}

camera.position.z = 256;

var frameCount = 0;

var distri = 0.1;

var animate = function () {
    requestAnimationFrame(animate);
    colUpdate();

    if (r < r2) {
        r += 1;
    } else {
        l = 0;
        regen();
    }
    if (r > 0.5 * r2) {
        fadeBk();
    }

    for (i = 0; i < cubeNum; i++) {
        cubes[i].position.x = Math.sin(Math.PI * i / cubeNum) * r * Math.cos(19 * i * 2 * Math.PI / cubeNum) + trX;
        cubes[i].position.y = r * Math.cos(Math.PI*i/ cubeNum) + trY;
        cubes[i].position.z = Math.sin(Math.PI * i / cubeNum) * r * Math.sin(19 * i * 2 * Math.PI / cubeNum);
    }

    renderer.render(scene, camera);
};

animate();


function colUpdate() {
    var col = "hsl(" + h + "," + s + "%," + l + "%)";
    material.color = new THREE.Color(col);
}

function fadeBk() {
    l = Math.round(0.92 * l);
}

function regen() {
    l = 80;
    r = r1;
    h = 360 * Math.random();
    camera.rotation.z = Math.PI * Math.random();
    trX = 32 * Math.random();
    trY = 18 * Math.random();
}