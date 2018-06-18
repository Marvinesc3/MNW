var socket = io();

var movement = {
    up: false,
    down: false,
    left: false,
    right: false
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

function drawImageRot(img,x,y,width,height,deg){

    //Convert degrees to radian
    var rad = deg * Math.PI / 180;
    //Set the origin to the center of the image
    context.translate(x + width / 2, y + height / 2);
    //Rotate the canvas around the origin
    context.rotate(rad);
    //draw the image
    context.drawImage(img, width / 2 * (-1),height / 2 * (-1),width,height);
    //reset the canvas
    context.rotate(rad * ( -1 ) );
    context.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
}

socket.emit('new player');
setInterval(function() {
    socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
var ship = document.getElementById('ship');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');
socket.on('state', function(players) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var id in players) {
        var player = players[id];
        context.fillRect(player.x, player.y, player.width, player.height);
        //context.drawImage(ship, player.x, player.y, player.width, player.height);
    }
});