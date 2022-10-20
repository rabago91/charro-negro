export default function characterKeysMovement(character, RightKeys, LeftKeys, UpKeys, DownKeys) {

    let right = RightKeys;
    let left = LeftKeys;
    let down = UpKeys;
    let up = DownKeys;

    //Up
    if ((up && !down && !right && !left) || (up && !down && right && left)) {
        if (character.actualAnimation === "Idle_") {
            character.stop();
        }
        if (character.lastDirection !== "North") {
            character.stop();
        }
        character.lastDirection = "North";
        character.actualAnimation = "Walk_";
        var craftedAnimation = character.actualAnimation + character.lastDirection;
        if (!character.playing) {
            character.textures = character.sheet[craftedAnimation];
            character.play();
        }

        character.setMoveUp();
    }

    //Down
    if ((down && !up && !right && !left) || (!up && down && right && left)) {
        if (character.actualAnimation === "Idle_") {
            character.stop();
        }
        if (character.lastDirection !== "South") {
            character.stop();
        }
        character.lastDirection = "South";
        character.actualAnimation = "Walk_";
        var craftedAnimation = character.actualAnimation + character.lastDirection;
        if (!character.playing) {
            character.textures = character.sheet[craftedAnimation];
            character.play();
        }

        character.setMoveDown();
    }

    //Rigth
    if (right && !left && !up && !down) {
        if (character.actualAnimation === "Idle_") {
            character.stop();
        }
        character.lastDirection = "East";
        character.actualAnimation = "Walk_";
        var craftedAnimation = character.actualAnimation + character.lastDirection;
        if (!character.playing) {
            character.textures = character.sheet[craftedAnimation];
            character.play();
        } 
        character.setMoveRight();
    }

    //Left
    if (left && !right && !up && !down) {
        if (character.actualAnimation === "Idle_") {
            character.stop();
        }
        character.lastDirection = "West";
        character.actualAnimation = "Walk_";
        var craftedAnimation = character.actualAnimation + character.lastDirection;
        if (!character.playing) {
            character.textures = character.sheet[craftedAnimation];
            character.play();
        }
        character.setMoveLeft();
    }

    //Up Rigth
    if (!down && up && right && !left)  {
        if (character.actualAnimation === "Idle_") {
            character.stop();
        }
        if (character.lastDirection !== "East"){
            character.stop();
        }
        character.lastDirection = "East";
        character.actualAnimation = "Walk_";
        var craftedAnimation = character.actualAnimation + character.lastDirection;
        if (!character.playing) {
            character.textures = character.sheet[craftedAnimation];
            character.play();
        } 

        character.setMoveUpRight();
    }

    //Up Left
    if (!down && up && !right && left) {
        if (character.actualAnimation === "Idle_") {
            character.stop();
        }
        if (character.lastDirection !== "West"){
            character.stop();
        }
        character.lastDirection = "West";
        character.actualAnimation = "Walk_";
        var craftedAnimation = character.actualAnimation + character.lastDirection;
        if (!character.playing) {
            character.textures = character.sheet[craftedAnimation];
            character.play();
        }

        character.setMoveUpLeft();
    }

    //Down Right
    if (down && !up && right && !left) {
        if (character.actualAnimation === "Idle_") {
            character.stop();
        }
        if (character.lastDirection !== "East"){
            character.stop();
        }
        character.lastDirection = "East";
        character.actualAnimation = "Walk_";
        var craftedAnimation = character.actualAnimation + character.lastDirection;
        if (!character.playing) {
            character.textures = character.sheet[craftedAnimation];
            character.play();
        }

        character.setMoveDownRight();
    }

    //Down Left
    if (down && !up && !right && left) {
        if (character.actualAnimation === "Idle_") {
            character.stop();
        }
        if (character.lastDirection !== "West"){
            character.stop();
        }
        character.lastDirection = "West";
        character.actualAnimation = "Walk_";
        var craftedAnimation = character.actualAnimation + character.lastDirection;
        if (!character.playing) {
            character.textures = character.sheet[craftedAnimation];
            character.play();
        }

        character.setMoveDownLeft();
    }

    if (!down && !up && !right && !left) {
        character.setMoveStill();
    }

    // Up + Down OR Right + Left
    if ((down && up && !right && !left) || (right && left && !down && !up)) {
        if (character.actualAnimation !== "Idle_") {
            character.stop();
        }
        character.actualAnimation = "Idle_";
        var craftedAnimation = character.actualAnimation + character.lastDirection;
        if (!character.playing) {
            character.textures = character.sheet[craftedAnimation];
            character.play();
        }
        character.setMoveStill();
    }
}