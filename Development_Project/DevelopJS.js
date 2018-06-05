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

function Draw_Bullets() {
    var listPos;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(listPos = 0; listPos< xPoslist.length; listPos++) {
        ctx.beginPath();
        ctx.arc(xPoslist[listPos], yPoslist[listPos], radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();

        yPoslist[listPos] -= (Math.sin(arclist[listPos] * Math.PI / 180.0))*speedlist[listPos];
        xPoslist[listPos] += (Math.cos(arclist[listPos] * Math.PI / 180.0))*speedlist[listPos];
    }
    ctx.fillText(d.getTime()+" ", 50 ,100);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(canvas.width*5/11,canvas.height*5/11, canvas.width/11, canvas.height/11)

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
    if(spacebarPressed ){
        Bullet(canvas.width/2,canvas.height/2, 1,90);
        d = new Date();
        shot = d.getTime();
    }
}
setInterval(Make_Bullets,10);

