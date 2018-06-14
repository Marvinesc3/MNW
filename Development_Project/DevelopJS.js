var canvas = document.querySelector('canvas');
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




var map = document.getElementById('map');
var mapWidth = 780;
var mapHeight = 430;
var player = {
    x: Math.random() * (mapWidth - 100 * 2) + 100,
    y: Math.random() * (mapHeight - 200 * 2) + 200,
    dx: Math.random() * (canvas.width - 100 * 2) + 100,
    dy: Math.random() * (canvas.height - 200 * 2) + 200,
    image: document.getElementById("ship"),
    rotation: 0,
    speed: 2,
    width: 100,
    height: 200,
    health: 100,
    x1: canvas.width/2,
    y1: canvas.height/2,


    rotator: function() {
        ctx.clearRect(0,0, canvas.width,canvas.height);
        var x = canvas.width/2 - player.x;
        var y = canvas.height/2 - player.y;

        var listPos;
        this.x1 = x;
        this.y1 = y;





        ctx.drawImage(map, 0, 0, mapWidth, mapHeight, x, y, mapWidth*4, mapHeight*4);
        ctx.drawImage(pyke,0, 0, pyke.width, pyke.height, this.dx, this.dy, pyke.width*2, pyke.height*2);

        for(listPos = 0; listPos< xPoslist.length; listPos++) {
            ctx.drawImage(cannon, xPoslist[listPos], yPoslist[listPos], 20, 20);
            yPoslist[listPos] -= (Math.sin(arclist[listPos] * Math.PI / 180.0))*speedlist[listPos];
            xPoslist[listPos] += (Math.cos(arclist[listPos] * Math.PI / 180.0))*speedlist[listPos];
        }

        var rad = this.rotation * Math.PI / 180;


        ctx.translate(canvas.width/2-50 + this.width / 2, canvas.height/2-100 + this.height / 2);

        ctx.rotate(rad);
        ctx.drawImage(this.image,this.width / 2 * (-1),this.height / 2 * (-1),this.width,this.height);

        ctx.rotate(rad * ( -1 ) );

        ctx.translate((canvas.width/2-50 + this.width / 2) * (-1), (canvas.height/2-100 + this.height / 2) * (-1));
        Make_Bullets();
        a = this.dx-this.x;
        ctx.fillStyle = "black";
        ctx.fillText(this.x+" , "+this.y+"   "+ x+" , "+y+"   " +this.dx+ " , "+this.dy+"   "+a, 0 , 100);


    },
    move: function() {
        if (upPressed) {
            if (this.y - this.speed * Math.sin((this.rotation+90) * Math.PI / 180) > 0 && this.x - this.speed * Math.cos((this.rotation+90) * Math.PI / 180) > 0) {
                this.x -= this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.y -= this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
                this.dx += this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.dy += this.speed * Math.sin((this.rotation+90) * Math.PI / 180);

            }
            else {
                this.x += this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.y += this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
                this.dx -= this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.dy -= this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
            }
        }
        if (downPressed) {
            if (this.y + this.speed * Math.sin((this.rotation+90) * Math.PI / 180)< canvas.height && this.x+this.speed * Math.cos((this.rotation+90) * Math.PI / 180) < canvas.width) {
                this.x += this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.y += this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
                this.dx -= this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.dy -= this.speed * Math.sin((this.rotation+90) * Math.PI / 180);

            }
            else {
                this.x -= this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.y -= this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
                this.dx += this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.dy += this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
            }
        }

        if (rightPressed) {
            this.rotation++;
        }
        if (leftPressed) {
            this.rotation--;
        }
        if(this.dx - this.x-this.x1>0){
            this.dx-=1;
        }

        if(this.dx - this.x-this.x1<0){
            this.dx+=1;
        }
        if(this.dy - this.y+this.y-100>0){
            this.dy-=1;
        }
        if(this.dy - this.y + this.y-100<0){
            this.dy+=1;
        }




    },

    update: function() {
        ctx.drawImage(pyke, this.dx, this.dy);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.rotator();

    }
};

var enemyArray = [];



function makeNewEnemies() {
    var x = new Enemy();
    x.addToArray();
}

function drawHealthBar() {
    ctx.clearRect(10, 10, player.health, 25);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(10, 10, player.health, 25);
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
    rad2 = Math.atan((-1*(y1 - (canvas.height/2)))/(x1-(canvas.width/2)));
    arc2 = rad2 * 180 / Math.PI;
    if (x1 <canvas.width/2)
        arc2 += 180;
    document.getElementById("myText").innerHTML = "x: " + x1 + " y: " + y1;

}
var mousePos = false;
var attack_speed = 500;
var d = new Date();
var shot = d.getTime();
d = new Date();
function Make_Bullets() {

    d = new Date();
    if(mousePos === true && shot + attack_speed< d.getTime()){
        Bullet(canvas.width/2,canvas.height/2, 3,arc2);
        arc3 = player.rotation+180 -arc2;
        Bullet(canvas.width/2,canvas.height/2 , 3,arc3);
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



function drawCharacter() {
    player.update();}


function drawGame() {

    requestAnimationFrame(drawGame);
    Make_Bullets();
    drawCharacter();
    player.move();

    drawHealthBar();
    updateEnemies();
    if (player.health<=0) {
        window.location.replace("deathScreen.html");
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

drawGame();