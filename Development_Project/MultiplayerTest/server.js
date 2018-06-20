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
//--------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------------
io.on('connection', function(socket) {
    socket.on('new player', function() {
        players[socket.id] = {
            num: 0,
            x: 290,
            y: 300,
            rotation: 0,
            width: 70,
            height: 70,
            speed: 15,
            health:100,
            xBullets: [],
            yBullets: [],
            speedBullets:[],
            angBullets:[]
        };
    });
    socket.on('disconnect', function(){
        delete players[socket.id];

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
        if (data.space1){
            player.num = 1;
            player.xBullets.push(player.x);
            player.yBullets.push(player.y);
            player.speedBullets.push(1);
            player.angBullets.push(player.rotation);


        }
        setInterval(function () {
            for( i  =0; i< player.xBullets.length; i++){
                player.xBullets[i] +=50;
                player.yBullets[i] +=50;


            }
        }, 1000/30);
    });
});

setInterval(function() {
    io.sockets.emit('state', players);
}, 1000 / 30);

