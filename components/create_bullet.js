import Point from "./point.js";
import { app } from "../setup/pixi_setup.js";

function createBullet(targetX, targetY, playerX, playerY) {
    //Direction to mouse pointer
    var direction = new Point();
    direction.x = targetX - playerX;
    direction.y = targetY - playerY;

    //Normalize
    var length = Math.sqrt( direction.x*direction.x + direction.y*direction.y);
    direction.x/=length;
    direction.y/=length;

    // Bullet Sprite
    let bulletSpeed = 5;
    let bulletSize = 30
    let bullet = new PIXI.Graphics();
    bullet.beginFill(0xEE0000);
    bullet.drawRect(0, 0, bulletSize, bulletSize);
    bullet.endFill();
    bullet.x = playerX;
    bullet.y = playerY;
    bullet.pivot.x = bulletSize / 2;
    bullet.pivot.y = bulletSize / 2;
    bullet.direction = direction;
    bullet.speed = bulletSpeed;
    return bullet;
}

export default function fireBullet(targetX, targetY, playerX, playerY) {
    let bullet = createBullet(targetX, targetY, playerX, playerY);
    app.stage.addChild(bullet);
    return bullet
}