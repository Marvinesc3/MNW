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
    });
});

setInterval(function() {
    io.sockets.emit('state', players);
}, 1000 / 30);