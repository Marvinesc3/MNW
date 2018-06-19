var socket = io();

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');

var movement = {
    up: false,
    down: false,
    left: false,
    right: false
};

var mouse = {
    mouseX: undefined,
    mouseY: undefined
};


document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = true;
            break;
        case 87: // W
            movement.up = true;
            break;
        case 68: // D
            movement.right = true;
            break;
        case 83: // S
            movement.down = true;
            break;
    }
});
document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = false;
            break;
        case 87: // W
            movement.up = false;
            break;
        case 68: // D
            movement.right = false;
            break;
        case 83: // S
            movement.down = false;
            break;
    }
});

/*
document.addEventListener('click', function(event){
    mouse.mouseX = event.clientX;
    mouse.mouseY = event.clientY;
    socket.emit('mousePos', mouse);
});
*/

socket.emit('new player');
setInterval(function() {
    socket.emit('movement', movement);
}, 1000 / 30);

socket.on('state', function(players) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var id in players) {
        context.save();
        var player = players[id];
        var img = new Image();
        img.src = 'https://opengameart.org/sites/default/files/spaceship.pod_.1.green_.png';
        context.translate(player.x + player.width / 2, player.y + player.height / 2);
        context.rotate(player.rotation * Math.PI/180);
        context.drawImage(img, -player.width / 2, -player.height / 2, player.width, player.height);
        context.fill();
        context.restore();
    }
    /*socket.on('shoot', function(bullets) {
        for (var i=0; i<bullets.length; i++) {
            bullet = bullets[i];
            var bmg = new Image();
            bmg.src= 'https://s1.piq.land/2013/02/24/K22HRK2BcpIwVYDuzwgpicei_400x400.png';
            context.drawImage(bgm, bullet.x, bullet.y, bullet.width, bullet.height);
        }
    });
    */
});

