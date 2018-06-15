var canvas = document.querySelector('canvas');
var cannon = document.getElementById('cannon');
var pyke1 = document.getElementById('pyke');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx = canvas.getContext('2d');

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
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
    } else if (e.keyCode === 32) {
        spacebarPressed = false;
    }
}

var speedlist =[];
var arclist = [];
var xPoslist = [];
var yPoslist = [];
var lifetimelist = [];
var currenttimelist = [];

function Bullet(xPos, yPos,speed,arc, lifetime,currenttime) {
    speedlist.push(speed);
    arclist.push(arc);

    xPoslist.push(xPos);
    yPoslist.push(yPos);
    lifetimelist.push(lifetime);
    currenttimelist.push(currenttime);
}

var enemyXList = [];
var enemyYList = [];
var enemyWidthList = [];
var enemyHeightList = [];
var enemySpeedList = [];
var enemyHealthList = [];
var enemyImgList = [];
var enemyAngList = [];


var ship = document.getElementById('ship');
ennemy_try1 = new Create_enemy(ship, 300,300, 3, 100,200,100,90);

var boost_speed = 5000;
var t = new Date();
var ready = t.getTime();
t = new Date();
delay_speed = 1000;
function speed_boost() {

    t = new Date();
    ctx.fillText("It gets here " + enemySpeedList[0] + "     " + ready + "        ", 0, 200);
    if (spacebarPressed === true && ready + boost_speed < t.getTime()) {
        t = new Date();
        ready = t.getTime();
        t = new Date();
        enemySpeedList[0] += 4;

        setTimeout(function () {
            enemySpeedList[0] -= 4;
            ctx.fillText("It gets here " + enemySpeedList[0] + "     " + ready + "        ", 0, 150);
        }, 500);



        t = new Date();
        ready = t.getTime();

    }
}

function Create_enemy(image,x,y,speed,width,height,health,ang) {
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.health = health;
    this.x = x;
    this.y = y;
    this.image = image;
    this.ang = ang;

    enemyAngList.push(this.ang);
    enemyHealthList.push(this.health);
    enemyHeightList.push(this.height);
    enemyWidthList.push(this.width);
    enemyXList.push(this.x);
    enemyYList.push(this.y);
    enemyImgList.push(this.image);
    enemySpeedList.push(this.speed);

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

}

var enemies= {
    rotator: function (x, y, ang, i) {

        var rad = ang * Math.PI / 180;

        ctx.translate(canvas.width/2-50 + enemyWidthList[i] / 2, canvas.height/2-100 + enemyHeightList[i] / 2);

        ctx.rotate(rad);

        ctx.drawImage(enemyImgList[i],enemyWidthList[i] / 2 * (-1),enemyHeightList[i] / 2 * (-1),enemyWidthList[i],enemyHeightList[i]);
        ctx.rotate(rad * (-1));

        ctx.translate((canvas.width/2-50 + enemyWidthList[i] / 2) * (-1), (canvas.height/2-100 + enemyHeightList[i] / 2) * (-1));

    },
    draw:function () {

        ctx.clearRect(0,0, canvas.width,canvas.height);
        mapx = canvas.width / 2 - enemyXList[0];
        mapy = canvas.height / 2 - enemyYList[0];

        ctx.drawImage(map, 0, 0, mapWidth, mapHeight, mapx, mapy, mapWidth * 4, mapHeight * 4);
        speed_boost();
        for(i = 0; i<enemyXList.length; i++){


            for(listPos = 0; listPos< xPoslist.length; listPos++) {
                if(currenttimelist[listPos]<lifetimelist[listPos]) {
                    x2 = xPoslist[listPos]+mapx;
                    y2 = yPoslist[listPos]+mapy;
                    yPoslist[listPos] -= (Math.sin(arclist[listPos] * Math.PI / 180.0)) * speedlist[listPos];
                    xPoslist[listPos] += (Math.cos(arclist[listPos] * Math.PI / 180.0)) * speedlist[listPos];

                    //ctx.drawImage(Baron, this.x2,this.y2);

                    ctx.drawImage(cannon, x2, y2 ,20, 20);

                    currenttimelist[listPos]+=.1
                }
            }

            for(z = 0; z<enemyYList.length; z++){

                var subx = enemyXList[z]+mapx;
                var suby = enemyXList[z]+mapy;

                enemies.rotator(subx, suby, enemyAngList[z], i);
                enemies.move();

            }
            ctx.fillStyle = "black";
            ctx.fillText(enemyXList[0]+" , "+enemyYList[0]+"   "+ mapx+" , "+mapy+"   " +subx+ " , "+suby+"   ", 0 , 100);
        }

    },
    move: function() {

        for(i = 0; i <enemyYList.length;i++){
            if (upPressed) {
                if (enemyYList[i] - enemySpeedList[i] * Math.sin((enemyAngList[i]+90) * Math.PI / 180) > 0 &&
                    enemyXList[i] - enemySpeedList[i] * Math.cos((enemyAngList[i]+90) * Math.PI / 180) > 0 &&
                    enemyYList[i] - enemySpeedList[i] * Math.sin((enemyAngList[i]+90) * Math.PI / 180) < 1730 &&
                    enemyXList[i] - enemySpeedList[i] * Math.cos((enemyAngList[i]+90) * Math.PI / 180) < 3125) {

                    enemyXList[i] -= enemySpeedList[i] * Math.cos((enemyAngList[i]+90) * Math.PI / 180);
                    enemyYList[i] -= enemySpeedList[i] * Math.sin((enemyAngList[i]+90) * Math.PI / 180);



                }
                else {
                    enemyXList[i] += enemySpeedList[i] * Math.cos((enemyAngList[i]+90) * Math.PI / 180);
                    enemyYList[i] += enemySpeedList[i] * Math.sin((enemyAngList[i]+90) * Math.PI / 180);


                }

            }


            if (rightPressed && i === 0) {
                enemyAngList[i]++;
            }
            if (leftPressed&& i === 0) {
                enemyAngList[i]--;
            }


        }}

};



var map = document.getElementById('map');
var mapWidth = 780;
var mapHeight = 430;

var pykeXList = [];
var pykeYList = [];

var zx = 0;
var zy = 0;
var pyke_enemy = {



    draw1:function() {
        ctx.fillText("gets here", 250, 100);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        zx = canvas.width / 2 - enemyXList[0];
        zy = canvas.height / 2 - enemyYList[0];

        for(i = 0; i < pykeXList.length; i++) {

            x2 = pykeXList[i] + zx;
            y2 = pykeYList[i] + zy;


            ctx.drawImage(pyke1, x2, y2,20,20);

        }


    },
    move1: function() {
        ctx.fillText("gets here", 250, 150);
        for(i = 0; i < pykeXList.length; i++) {
            if (pykeXList[i] - enemyYList[0] - zx > 0) {
                pykeXList[i] -= 1;
            }

            if (pykeXList[i] - enemyYList[0] - zx < 0) {
                pykeXList[i] += 1;
            }
            if (pykeYList[i] - enemyYList[0] + zy - 100 > 0) {
                pykeYList[i] -= 1;
            }
            if (pykeYList[i]- enemyYList[0] +zy - 100 < 0) {
                pykeYList[i] += 1;
            }
        }



    },
    delete_pyke: function (list_Pos) {
        ctx.fillText("gets here", 250, 250);
        pykeYList.pop(list_Pos);
        pykeXList.pop(list_Pos);
    },
    check_if_hit: function () {
        ctx.fillText("gets here", 250, 200);
        for(i = 0; i < pykeXList.length; i++) {

            for(z = 0; z < xPoslist.length; z++) {
                if(xPoslist[i]+20>pykeYList[i] &&xPoslist[i]<pykeYList[i] ){
                    pyke.delete_pyke(i);
                }
            }
        }
    }


};

dx= Math.random() * (mapWidth - 100 * 2) + 100;
dy= Math.random() * (mapHeight - 200 * 2) + 200;

make_pykes(100,100);

function make_pykes(x, y) {
    pykeXList.push(x);
    pykeYList.push(y);


}
var Baron = document.getElementById('Baron');
var enemyArray = [];



function makeNewEnemies() {
    var x = new Enemy();
    x.addToArray();
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
        Bullet(enemyXList[0],enemyYList[0], 3,arc2,20,0);

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






function drawGame() {

    requestAnimationFrame(drawGame);
    Make_Bullets();



    enemies.draw();


    updateEnemies();


    ctx.clearRect(0,0,canvas.width,canvas.height);
}

drawGame();

