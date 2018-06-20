var socket = io();

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');

var movement = {
    up: false,
    down: false,
    left: false,
    right: false,
    space1:false
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
        case 67: // X
            movement.space1 = true;
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
        case 67: //X
            movement.space1 = false;
            break;
    }
});



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
        context.fillStyle = "red";

        context.fillText(player.num+" ", 50, 100);

      if(player.xBullets.length > 0){
        for( i  =0; i< player.xBullets.length; i++){
            player.xBullets[i] +=5;
            player.yBullets[i] +=5;
            context.fillRect(player.xBullets[i], player.yBullets[i], 50, 50);


        }
    }
    }
});

