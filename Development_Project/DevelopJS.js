var canvas = document.querySelector('canvas');
var ship = document.getElementById("ship");
var cannon = document.getElementById('cannon');
var pyke = document.getElementById('pyke');

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

mouse = {
    x:undefined,
    y:undefined
};

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
    });

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

var x1 = 0;
var y1 = 0;

var rad1 = 90;
var rad2 = 90;
var arc1 = 90;
var arc2 = 90;


function showCoords(event) {
    x1 = mouse.x;
    y1 = mouse.y;
    rad1 = Math.atan((-1*(y1-canvas.height/2))/(x1-canvas.width/2));
    arc1 = rad1 * 180 / Math.PI;
    if (x1 < canvas.width/2)
        arc1 += 180;
    rad2 = Math.atan((-1*(y1 - (y+100)))/(x1-(x+40)));
    arc2 = rad2 * 180 / Math.PI;
    if (x1 < x+40)
        arc2 += 180;

}

var attack_speed = 500;
var d = new Date();
var shot = d.getTime();
d = new Date();
function Make_Bullets() {
    d = new Date();
    if(mousePos === true && shot +attack_speed< d.getTime()){
        Bullet(x+40,y+100, 3,arc2);
        arc3 = 180 -arc2;
        Bullet(x+40,y+100, 3,arc3);
        d = new Date();
        shot = d.getTime();

    }
}
function MouseDown(TorF) {
    if(TorF){
        mousePos = true;
    }
}
function MouseUp(TorF) {
    if(TorF){
        mousePos = false;
    }
}
pyke_x = Math.random() * (canvas.width - 100 * 2) + 100;
pyke_y = Math.random() * (canvas.height - 200 * 2) + 200;
repaint_pyke = true;
function is_pyke_dead() {
    for(i = 0; i< xPoslist.length;i++){

        if(pyke_x+50> xPoslist[i]&& pyke_x<xPoslist[i] && pyke_y+50> yPoslist[i]&& pyke_y<yPoslist[i]){
            pyke_x = Math.random() * (canvas.width - 100 * 2) + 100;
            pyke_y = Math.random() * (canvas.height - 200 * 2) + 200;


        }
    }
}

function drawCharacter() {
    ctx.drawImage(ship, x, y, 100, 200);
    if (repaint_pyke === true) {
        if (x - pyke_x > 0) {
            pyke_x += .3;
        }
        if (x - pyke_x < 0) {
            pyke_x -= .3;
        }
        if ((y + 100) - pyke_y > 0) {
            pyke_y += .3;
        }
        if ((y + 100) - pyke_y < 0) {
            pyke_y -= .3;
        }
    }
    is_pyke_dead();
    if (repaint_pyke === true) {
        ctx.drawImage(pyke, pyke_x, pyke_y, 50, 50);
    }

    if (upPressed) {
        if (y >0) {
            y -= 1;
            ctx.clearRect(x, y, 100, 200);
            ctx.drawImage(ship, x, y, 100, 200);
        }
    }
    if (downPressed) {
        if (y < canvas.height - 210) {
            y += 1;
            ctx.clearRect(x, y, 100, 200);
            ctx.drawImage(ship, x, y, 100, 200);
        }
    }
}


function drawGame() {
    drawCharacter();
    Make_Bullets();


}

setInterval(drawGame, 10);

