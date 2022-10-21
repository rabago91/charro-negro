import colides from "./colides.js";

export default function verifyBulletsCollision (bullet, scenarioArray) {
    for(var x in scenarioArray){
        if( colides( bullet, scenarioArray[x] ) ) {
            if (!!scenarioArray[x].isFloor) {
                return false
            }
            console.log("Bullet crashed with " + scenarioArray[x].type, "| Tile position: " + "[x: " + scenarioArray[x].x + ",y: " + scenarioArray[x].y + "]");
            return true
        }
    }
    return false;
}