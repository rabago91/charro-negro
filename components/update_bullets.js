import verifyBulletsCollision from "./verify_bullets_collision.js";

export default function updateBullets(bulletsArray, colidingObjectsArray, appReference) {

    // let colidingObjectsArray = [Boxes, mapArrayRawData];

    for (let i = 0; i < bulletsArray.length; i++) {
        //Animation
        bulletsArray[i].x += bulletsArray[i].direction.x * bulletsArray[i].speed;
        bulletsArray[i].y += bulletsArray[i].direction.y * bulletsArray[i].speed;

        //Hit detection here:
        colidingObjectsArray.forEach(element => {
            if(verifyBulletsCollision(bulletsArray[i], element)) bulletsArray[i].dead = true;
        });
        if (bulletsArray[i].position.y < 0 || bulletsArray[i].position.y > appReference.view.height || bulletsArray[i].position.x < 0 || bulletsArray[i].position.y > appReference.view.width) {
            console.log("bullet out of screen");
            bulletsArray[i].dead = true;
        }
        if (bulletsArray[i].dead) {
            appReference.stage.removeChild(bulletsArray[i]);
            bulletsArray.splice(i,1);
        }
    }
}