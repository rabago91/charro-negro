export default function createPlayer (playerName, x, y, characterSheet, speed = 2, scale = 4, width, height) {
    let player = new PIXI.AnimatedSprite(characterSheet["Idle_South"]);
    player.name = playerName
    player.anchor.set(0.5, 1);
    player.animationSpeed = .2;
    player.loop = true;
    player.x = x;
    player.y = y;
    player.speed = speed;
    player.scale.set(scale);
    player.sheet = characterSheet;
    player.textures = player.sheet["Idle_South"];
    //player.isIdle;
    player.movingUp;
    player.movingDown;
    player.movingLeft;
    player.movingRight;
    player.actualAnimation = "Idle_";
    player.lastDirection = "South";
    if(width)player.width = width;
    if(height)player.height = height;
    player.play();

    player.setMoveUp = function (){
        player.movingUp = true;
        player.movingDown = false;
        player.movingRight = false;
        player.movingLeft = false;
    };

    player.setMoveDown = function (){
        player.movingUp = false;
        player.movingDown = true;
        player.movingRight = false;
        player.movingLeft = false;
    };

    player.setMoveRight = function (){
        player.movingUp = false;
        player.movingDown = false;
        player.movingRight = true;
        player.movingLeft = false;
    };

    player.setMoveLeft = function (){
        player.movingUp = false;
        player.movingDown = false;
        player.movingRight = false;
        player.movingLeft = true;
    };

    player.setMoveUpRight = function (){
        player.movingUp = true;
        player.movingDown = false;
        player.movingRight = true;
        player.movingLeft = false;
    };

    player.setMoveUpLeft = function (){
        player.movingUp = true;
        player.movingDown = false;
        player.movingRight = false;
        player.movingLeft = true;
    };

    player.setMoveDownRight = function (){
        player.movingUp = false;
        player.movingDown = true;
        player.movingRight = true;
        player.movingLeft = false;
    };

    player.setMoveDownLeft = function (){
        player.movingUp = false;
        player.movingDown = true;
        player.movingRight = false;
        player.movingLeft = true;
    };

    player.setMoveStill = function (){
        player.movingUp = false;
        player.movingDown = false;
        player.movingRight = false;
        player.movingLeft = false;
    };

    return player
}