// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 63342);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(63342, function() {
    console.log('Starting server on port 63342');
});

var players = {};
//---------------------------------------------------------------------------------------------------------------

var bullets = [];
function Bullet(x, y, angle){
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.ang = angle;
    this.speed = 5;
}

//---------------------------------------------------------------------------------------------------------------
io.on('connection', function(socket) {
    socket.on('new player', function() {
        players[socket.id] = {
            x: 300,
            y: 300,
            rotation: 0,
            width: 70,
            height: 70,
            speed: 15,
            health:100
        };
    });
    socket.on('disconnect', function(){
        delete players[socket.id];
        delete bullets[socket.id];
    });
    socket.on('movement', function(data) {
        var player = players[socket.id] || {};
        if (data.left) {
            player.rotation-=2*Math.PI;
        }
        if (data.up) {
            player.x -= player.speed * Math.cos((player.rotation+90) * Math.PI / 180);
            player.y -= player.speed * Math.sin((player.rotation+90) * Math.PI / 180);
        }
        if (data.right) {
            player.rotation+=2*Math.PI;
        }
        if (data.down) {
            player.x += player.speed * Math.cos((player.rotation+90) * Math.PI / 180);
            player.y += player.speed * Math.sin((player.rotation+90) * Math.PI / 180);
        }

    });
});

setInterval(function() {
    io.sockets.emit('state', players);
}, 1000 / 30);
