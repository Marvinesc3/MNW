var canvas = document.querySelector('canvas');
var img = document.getElementById("ship");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx = canvas.getContext('2d');

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacebarPressed = false;
var radius = 10;



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode === 68 || e.keyCode === 39) {
        rightPressed = true;
    } else if (e.keyCode === 65 || e.keyCode === 37) {
        leftPressed = true;
    } else if (e.keyCode === 87 || e.keyCode === 38) {
        upPressed = true;
    } else if (e.keyCode === 83 || e.keyCode === 40) {
        downPressed = true;
    }
    else if (e.keyCode === 32) {
        spacebarPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode === 68 || e.keyCode === 39) {
        rightPressed = false;
    } else if (e.keyCode === 65 || e.keyCode === 37) {
        leftPressed = false;
    } else if (e.keyCode === 87 || e.keyCode === 38) {
        upPressed = false;
    } else if (e.keyCode === 83 || e.keyCode === 40) {
        downPressed = false;
    } else if (e.keyCode === 32) {
        spacebarPressed = false;
        }
}
var bx = canvas.width/2;
var by = canvas.height/2;

var speedlist =[];
var xarclist = [];
var yarclist = [];
var xPoslist = [];
var yPoslist = [];
function Bullet(xPos, yPos,speed, xarc, yarc) {
    speedlist.push(speed);
    xarclist.push(xarc);
    yarclist.push(yarc);
    xPoslist.push(xPos);
    yPoslist.push(yPos);
}
setInterval(Bullets,10);

function Bullets() {
    var listPos;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(listPos = 0; listPos< xPoslist.length; listPos++) {
        ctx.beginPath();
        ctx.arc(xPoslist[listPos], yPoslist[listPos], radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();

        xPoslist[listPos] += xarclist[listPos] * speedlist[listPos];
        yPoslist[listPos] += yarclist[listPos] * speedlist[listPos];
    }

}
Bullet(100, 50, 1, 1,1);
Bullet(150, 350, 2, 1,0);


