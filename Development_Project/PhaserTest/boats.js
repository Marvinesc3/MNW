var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {preload: preload, create: create, update: update});
var background;
var boat;


function preload(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#21501b';

    game.load.image('background', 'images/waterGif.gif');
    game.load.image('boat', 'images/ship.png');
}

function create(){
    background = game.add.sprite(0, 0, 'background');
    boat = game.add.sprite(320, 180, 'boat');
}

function update(){
    boat.x += 5;
    boat.y += 5;
}
