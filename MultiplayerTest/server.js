// Dependencies.

var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(5000, function() {
    console.log('Starting server on port 5000');
});
speedlist =[];
arclist = [];
 xPoslist = [];
 yPoslist = [];
lifetimelist = [];
currenttimelist = [];
var players = {};
io.on('connection', function(socket) {
    socket.on('new player', function() {
        players[socket.id] = {
            x: 300,
            y: 300,
            rotation: 0,
            width: 35,
            height: 70,
            speed: 2
        };
    });
    socket.on('disconnect', function(){
        delete players[socket.id];
    });
    socket.on('movement', function(data) {
        var player = players[socket.id] || {};
        if (data.left) {
            player.rotation-=5;
        }
        if (data.up) {
            player.x += player.speed * Math.cos(player.rotation * Math.PI / 180);
            player.y += player.speed * Math.sin(player.rotation * Math.PI / 180);
        }
        if (data.right) {
            player.rotation+=5;
        }
        /*if(data.mousedown){
            var x1 = event.clientX;
            var y1 = event.clientY;
            rad2 = Math.atan((-1*(y1 - (canvas.height/2)))/(x1-(canvas.width/2)));
            arc2 = rad2 * 180 / Math.PI;
            if (x1 <canvas.width/2)
                arc2 += 180;

            var mousePos = false;
            var attack_speed = 500;
            var d = new Date();
            var shot = d.getTime();
            d = new Date();


                d = new Date();
                if (true) {
                    zx = canvas.width / 2 - player.x;
                    zy = canvas.height / 2 - player.y;
                    var subx = player.x + zx;
                    var suby = player.y + zy;
                    Bullet(subx, suby, 3, arc2, 20, 0);

                    d = new Date();
                    shot = d.getTime();

                }


        }
        */


    });

});

function Bullet(xPos, yPos,speed,arc, lifetime,currenttime) {
    speedlist.push(speed);
    arclist.push(arc);

    xPoslist.push(xPos);
    yPoslist.push(yPos);
    lifetimelist.push(lifetime);
    currenttimelist.push(currenttime);
}

setInterval(function () {


    for (var listPos = 0; listPos < xPoslist.length; listPos++) {
        if (currenttimelist[listPos] < lifetimelist[listPos]) {
            x2 = xPoslist[listPos] + mapx;
            y2 = yPoslist[listPos] + mapy;
            yPoslist[listPos] -= (Math.sin(arclist[listPos] * Math.PI / 180.0)) * speedlist[listPos];
            xPoslist[listPos] += (Math.cos(arclist[listPos] * Math.PI / 180.0)) * speedlist[listPos];
            var img = new Image();
            img.src = 'https://lh3.googleusercontent.com/jix6-RXVQlNBJafSeUTrqIB8Snms7DVIpeaWg9clCkwAv6jqj0KN178tZqWAoWIAqtCBcQ8=s85';
            drawImageRot(img, x2, y2, 20, 20);

            currenttimelist[listPos] += .1;
        }
    }
    },1000/30
);
setInterval(function() {
    io.sockets.emit('state', players);
}, 1000 / 30);