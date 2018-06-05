var canvas = document.querySelector('canvas');
var ship = document.getElementById("ship");
var cannon = document.getElementById('cannon');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx = canvas.getContext('2d');

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacebarPressed = false;



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

var speedlist =[];
var arclist = [];
var xPoslist = [];
var yPoslist = [];

function Bullet(xPos, yPos,speed,arc) {
    speedlist.push(speed);
    arclist.push(arc);

    xPoslist.push(xPos);
    yPoslist.push(yPos);
}
setInterval(Draw_Bullets,10);

function drawCharacter() {
    ctx.drawImage(ship, x, y, 100, 200);
}

var x = Math.random() * (canvas.width - 100 * 2) + 100;
var y = Math.random() * (canvas.height - 200 * 2) + 200;
function Draw_Bullets() {
    var listPos;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(listPos = 0; listPos< xPoslist.length; listPos++) {
        ctx.drawImage(cannon, xPoslist[listPos], yPoslist[listPos], 20, 20);
        yPoslist[listPos] -= (Math.sin(arclist[listPos] * Math.PI / 180.0))*speedlist[listPos];
        xPoslist[listPos] += (Math.cos(arclist[listPos] * Math.PI / 180.0))*speedlist[listPos];
    }
    ctx.fillText(d.getTime()+" ", 50 ,100);
    ctx.beginPath();
    drawCharacter();
}

// LOOK AT THIS
// THIS IS HOW TO CODE BULLETS
// FIRST X THEN Y
// THEN THE SPEED
// THEN THE ANGLE U WANT IT TO GO
// LIKE 30 OR 90 OR 250

for (i = 30; i<=360; i+=30){
// Bullet(canvas.width/2,canvas.height/2, 1,i);
}
Bullet(canvas.width/2,canvas.height/2, 1,120);
var attack_speed = 1000;
var d = new Date();
var shot = d.getTime();
d = new Date();
function Make_Bullets() {
    d = new Date();
    if(spacebarPressed && shot +attack_speed< d.getTime()){
        Bullet(canvas.width/2,canvas.height/2, 1,90);
        d = new Date();
        shot = d.getTime();
    }
}

setInterval(Make_Bullets,10);



