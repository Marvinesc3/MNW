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
var Baron1 = document.getElementById('Baron');

ennemy_try1 = new Create_enemy(Baron1, 300,300, 2, 100,200,100,90);




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

    mapx = canvas.width / 2 - enemyXList[i];
    mapy = canvas.height / 2 - enemyYList[i];



    ctx.drawImage(map, 0, 0, mapWidth, mapHeight, mapx, mapy, mapWidth * 4, mapHeight * 4);



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
            if (enemyYList[i] - enemySpeedList[i] * Math.sin((enemyAngList[i]+90) * Math.PI / 180) > 0 && enemyXList[i] - enemySpeedList[i] * Math.cos((enemyAngList[i]+90) * Math.PI / 180) > 0) {
                enemyXList[i] -= enemySpeedList[i] * Math.cos((enemyAngList[i]+90) * Math.PI / 180);
                enemyYList[i] -= enemySpeedList[i] * Math.sin((enemyAngList[i]+90) * Math.PI / 180);



            }
            else {
                enemyXList[i] += enemySpeedList[i] * Math.cos((enemyAngList[i]+90) * Math.PI / 180);
                enemyYList[i] += enemySpeedList[i] * Math.sin((enemyAngList[i]+90) * Math.PI / 180);


            }
        }
        if (downPressed) {
            if (this.y + this.speed * Math.sin((this.rotation+90) * Math.PI / 180)< mapHeight && this.x+this.speed * Math.cos((this.rotation+90) * Math.PI / 180) < mapWidth) {
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
var player = {
    alpha: 1000,
    omega: 500,
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
    x2:0,
    y2:0,
    numtest:0,
    ax: 200,
    ay: 200,

    rotator: function() {
        ctx.clearRect(0,0, canvas.width,canvas.height);
        var x = canvas.width/2 - player.x;
        var y = canvas.height/2 - player.y;

        //enemies.draw();

        var listPos;
        this.x1 = x;
        this.y1 = y;





        ctx.drawImage(map, 0, 0, mapWidth, mapHeight, x, y, mapWidth*4, mapHeight*4);

        this.x2 = this.ax+x;
        this.y2=this.ay+y;
        this.numtest +=1;

        this.ax -=1;
        //ctx.drawImage(Baron, this.x2,this.y2);



        ctx.drawImage(pyke,0, 0, pyke.width, pyke.height, this.dx, this.dy, pyke.width*2, pyke.height*2);


        for(listPos = 0; listPos< xPoslist.length; listPos++) {
            if(currenttimelist[listPos]<lifetimelist[listPos]) {
                ctx.drawImage(cannon, xPoslist[listPos], yPoslist[listPos], 20, 20);
                yPoslist[listPos] -= (Math.sin(arclist[listPos] * Math.PI / 180.0)) * speedlist[listPos];
                xPoslist[listPos] += (Math.cos(arclist[listPos] * Math.PI / 180.0)) * speedlist[listPos];
                currenttimelist[listPos]+=.1
            }
        }
        var rad = this.rotation * Math.PI / 180;


        ctx.translate(canvas.width/2-50 + this.width / 2, canvas.height/2-100 + this.height / 2);

        ctx.rotate(rad);
        ctx.drawImage(this.image,this.width / 2 * (-1),this.height / 2 * (-1),this.width,this.height);

        ctx.rotate(rad * ( -1 ) );

        ctx.translate((canvas.width/2-50 + this.width / 2) * (-1), (canvas.height/2-100 + this.height / 2) * (-1));
        Make_Bullets();


        //ctx.fillStyle = "black";
        //ctx.fillText(this.x+" , "+this.y+"   "+ x+" , "+y+"   " +this.dx+ " , "+this.dy+"   "+a, 0 , 100);

    },
    move: function() {
        if (upPressed) {
            if (this.y - this.speed * Math.sin((this.rotation+90) * Math.PI / 180) > 0 && this.x - this.speed * Math.cos((this.rotation+90) * Math.PI / 180) > 0) {
                this.x -= this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.y -= this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
                this.dx += this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.dy += this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
                this.alpha += this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.omega += this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
            }
            else {
                this.x += this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.y += this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
                this.dx -= this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.dy -= this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
                this.alpha -= this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.omega -= this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
            }
        }
        if (downPressed) {
            if (this.y + this.speed * Math.sin((this.rotation+90) * Math.PI / 180)< mapHeight && this.x+this.speed * Math.cos((this.rotation+90) * Math.PI / 180) < mapWidth) {
                this.x += this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.y += this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
                this.dx -= this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.dy -= this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
                this.alpha -= this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.omega -= this.speed * Math.sin((this.rotation+90) * Math.PI / 180);

            }
            else {
                this.x -= this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.y -= this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
                this.dx += this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.dy += this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
                this.alpha += this.speed * Math.cos((this.rotation+90) * Math.PI / 180);
                this.omega += this.speed * Math.sin((this.rotation+90) * Math.PI / 180);
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




        this.rotator();

    }
};
var Baron = document.getElementById('Baron');
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



function drawCharacter() {
    player.update();
    }


function drawGame() {

    requestAnimationFrame(drawGame);
    Make_Bullets();
    drawCharacter();
    //player.move();
    enemies.draw();

    drawHealthBar();
    updateEnemies();
    if (player.health<=0) {
        window.location.replace("deathScreen.html");
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

drawGame();

