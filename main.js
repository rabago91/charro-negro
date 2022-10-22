import createMap from "./components/create_map.js";
import createPlayerSheet from "./components/sheets/player_sheet.js";
import fireBullet from "./components/create_bullet.js";
import createOldBoxes from "./components/create_old_boxes.js"
import colides from "./components/colides.js";
import createMapSheet from "./components/sheets/map_sheet.js";
import createPlayer from "./components/create_player.js";
import updateBullets from "./components/update_bullets.js";
import characterKeysMovement from "./components/key_combinations.js";
import { Boxes } from "./src/local_maps/maps.js"
import { app } from "./setup/pixi_setup.js"

var playerProta, playerProtaSheet;
var currentPlayerPosition;
var playerScale = 2;
var playerWidth = 15;
var playerHeight = 22;
var playerSpeed = 3;
var playerSafeMargin = 5;
let keys = {};
let protaBullets = [];
let mapSheet = {};
let mapArrayRawData = [];


// export default function runGame() {
window.onload = function () {

    //Add the canvas that Pixi automatically created for you to the HTML document
    // document.body.appendChild(app.view);
    document.getElementById("game").appendChild(app.view);

    app.loader
        .add(["src/spritesheets/spritesheet.json"]) //Character
        // .add("jsonMap", "./src/tilemaps/map_test_2.json")
        .add("jsonMap", "./src/tilemaps/let_it_be_map.json")
        .add("tilesSource", "./src/tilemaps/TileMap_01.png")
        .onProgress.add(loadProgressHandler)
    app.loader.load(setup);

    function loadProgressHandler(loader, resource) {
        console.log("Name: " + resource.name);
        console.log("URL: " + resource.url);
        console.log("progress: " + loader.progress + "%");
        console.log("________________________")
    }

    function setup() {

        let mapArrayData = app.loader.resources["jsonMap"].data.layers[0].data;
        let hotizontalTilesNum = app.loader.resources["jsonMap"].data.layers[0].width;

        mapSheet = createMapSheet();
        let map = createMap(mapSheet, mapArrayData, hotizontalTilesNum);
        let mapArray = map.tileMapArray;
        mapArray.map((tile) => app.stage.addChild(tile));
        mapArrayRawData = map.mapArrayRawData;

        playerProtaSheet = createPlayerSheet();
        currentPlayerPosition = {
            x: app.view.width / 2,
            y: (app.view.height / 2) - 130
        }
        playerProta = createPlayer('THE PROTA', currentPlayerPosition.x, currentPlayerPosition.y, playerProtaSheet, playerSpeed, playerScale);
        app.stage.addChild(playerProta);
        createOldBoxes(Boxes);
        app.ticker.add(gameLoop);
    }


    // var playerBox = new PIXI.Graphics();
    // function createPlayerBox() {
    //     playerBox.clear();
    //     playerBox.beginFill("0xff00ff");
    //     playerBox.drawRect(
    //         playerProta.x - playerProta.width / 2,
    //         playerProta.y - playerProta.height,
    //         playerProta.width,
    //         playerProta.height
    //     );
    //     playerBox.alpha = .2;
    //     playerBox.endFill();
    //     app.stage.addChild(playerBox);
    // }

    // var playerBoxB = new PIXI.Graphics();
    // function createPlayerBoxB() {
    //     playerBoxB.clear();
    //     playerBoxB.beginFill("0x00FF80");
    //     playerBoxB.drawRect(
    //         playerProta.x - playerProta.width / 5,
    //         playerProta.y - playerProta.height,
    //         playerProta.width * 2 / 5,
    //         playerProta.height
    //     );
    //     playerBoxB.alpha = .5;
    //     playerBoxB.endFill();
    //     app.stage.addChild(playerBoxB);
    // }
    var playerSafebox = new PIXI.Graphics();

    function createPlayerSafebox(safebox, x, y, width, height, margin, scale) {
        safebox.clear();
        safebox.beginFill("0xff00ff");
        let finalWidth = width*scale;
        let finalHeight = height*scale;
        safebox.drawRect(
            x - finalWidth/2 - margin,
            y - finalHeight - margin,
            finalWidth + margin*2,
            finalHeight + margin*2
        );
        safebox.alpha = .3;
        safebox.endFill();
        app.stage.addChild(safebox);
    }

    var currentPlayerPositionXYpoint = new PIXI.Graphics();
    function createCurrentPlayerPositionXYpoint() {
        currentPlayerPositionXYpoint.clear();
        currentPlayerPositionXYpoint.beginFill("0x27FF00");
        currentPlayerPositionXYpoint.drawCircle(
            currentPlayerPosition.x,
            currentPlayerPosition.y,
            5,
        );
        currentPlayerPositionXYpoint.alpha = .8;
        currentPlayerPositionXYpoint.endFill();
        app.stage.addChild(currentPlayerPositionXYpoint);
    }

    function verifyPlayerCollisions(direction, character, scenarioArray) {
        var tmpPlayerA;
        var tmpPlayerB;

        let finalWidth = playerWidth*playerScale;
        let finalHeight = playerHeight*playerScale;

        let playerSafebox = {
            x: currentPlayerPosition.x - finalWidth/2 - playerSafeMargin,
            y: currentPlayerPosition.y - finalHeight - playerSafeMargin,
            width: finalWidth + playerSafeMargin*2,
            height: finalHeight + playerSafeMargin*2
        }

        switch (direction) {
            case "goLeft":
                tmpPlayerA = {
                    // x: character.x - character.width / 2 - character.speed,
                    // y: character.y - character.height / 1,
                    // width: character.width,
                    // height: character.height
                    x: currentPlayerPosition.x - character.width/2 - playerSafeMargin,
                    y: currentPlayerPosition.y - character.height - playerSafeMargin,
                    width: 30 + playerSafeMargin*2,
                    height: 88 + playerSafeMargin*2
                }
                // tmpPlayerB = {
                //     x: character.x - character.speed,
                //     y: character.y,
                //     width: character.width,
                //     height: character.height
                // }
                break;
            case "goRight":
                tmpPlayerA = {
                    // x: character.x - character.width / 2 + character.speed,
                    // y: character.y - character.height / 1,
                    // width: character.width,
                    // height: character.height
                    x: currentPlayerPosition.x - character.width/2 - playerSafeMargin,
                    y: currentPlayerPosition.y - character.height - playerSafeMargin,
                    width: 30 + playerSafeMargin*2,
                    height: 88 + playerSafeMargin*2
                }
                // tmpPlayerB = {
                //     x: character.x + character.speed,
                //     y: character.y,
                //     width: character.width,
                //     height: character.height
                // }
                break;
            case "goUp":
                tmpPlayerA = {
                    // x: character.x - character.width / 5, //Adapted for this character
                    // y: character.y - character.height / 1 - character.speed,
                    // width: character.width * 2 / 5, //Adapted for this character
                    // height: character.height
                    x: currentPlayerPosition.x - character.width/2 - playerSafeMargin,
                    y: currentPlayerPosition.y - character.height - playerSafeMargin,
                    width: 30 + playerSafeMargin*2,
                    height: 88 + playerSafeMargin*2
                }
                // tmpPlayerB = {
                //     x: character.x,
                //     y: character.y,
                //     width: character.width,
                //     height: character.height
                // }
                break;
            case "goDown":
                tmpPlayerA = {
                    // x: character.x - character.width / 5, //Adapted for this character
                    // y: character.y - character.height / 1 + character.speed,
                    // width: character.width * 2 / 5, //Adapted for this character
                    // height: character.height
                    x: currentPlayerPosition.x - character.width/2 - playerSafeMargin,
                    y: currentPlayerPosition.y - character.height - playerSafeMargin ,
                    width: 30 + playerSafeMargin*2,
                    height: 88 + playerSafeMargin*2
                }
                // tmpPlayerB = {
                //     x: character.x,
                //     y: character.y + character.speed,
                //     width: character.width,
                //     height: character.height
                // }
                break;
        }

        for (var x in scenarioArray) {
            // var temporalPlayer = tmpPlayerB;
            var collisionTemporalPlayerSafebox = colides(playerSafebox, scenarioArray[x]);
            // var collisionTemporalPlayerB = colides(tmpPlayerB, scenarioArray[x]);

            // if ( colides( tmpPlayerA, scenarioArray[x]) || colides( tmpPlayerB, scenarioArray[x] ) ) {
            if (collisionTemporalPlayerSafebox) {


                if (!!scenarioArray[x].isFloor) {
                    return false
                }

                console.log("collisionTemporalPlayerSafebox || " + character.name + " crashed with: " + scenarioArray[x].type);
                console.log(
                    'objectA.x = ' + tmpPlayerA.x + ';',
                    'objectA.y = ' + tmpPlayerA.y + ';',
                    'objectA.width = ' + tmpPlayerA.width + ';',
                    'objectA.height = ' + tmpPlayerA.height + ';',
                );
                console.log(
                    'objectB.x = ' + scenarioArray[x].x + ';',
                    'objectB.y = ' + scenarioArray[x].y + ';',
                    'objectB.width = ' + scenarioArray[x].width + ';',
                    'objectB.height = ' + scenarioArray[x].height + ';',
                );
                return true
                // } else if (collisionTemporalPlayerB){
                //     if (!!scenarioArray[x].isFloor) {
                //         return false
                //     }

                //     console.log("collisionTemporalPlayerB || " + character.name + " crashed with: " + scenarioArray[x].type);
                //     // console.log(
                //     //     'objectA.x = ' + temporalPlayer.x + ';',
                //     //     'objectA.y = ' + temporalPlayer.y + ';',
                //     //     'objectA.width = ' + temporalPlayer.width + ';',
                //     //     'objectA.height = ' + temporalPlayer.height + ';',
                //     // );
                //     // console.log(
                //     //     'objectB.x = ' + scenarioArray[x].x + ';',
                //     //     'objectB.y = ' + scenarioArray[x].y + ';',
                //     //     'objectB.width = ' + scenarioArray[x].width + ';',
                //     //     'objectB.height = ' + scenarioArray[x].height + ';',
                //     // );
                //     return true
            }
        }
        return false;
    }

    function keysDown(e) {
        keys[e.keyCode] = true;
    }

    function KeysUp(e) {
        keys[e.keyCode] = false;
        if (playerProta.actualAnimation !== "Idle_") {
            playerProta.stop();
        }
        playerProta.actualAnimation = "Idle_";
        var craftedAnimation = playerProta.actualAnimation + playerProta.lastDirection;
        playerProta.textures = playerProta.sheet[craftedAnimation];
        playerProta.play();
    }

    function characterMovement(character, virtualPosition) {
        if (character.movingLeft) moveAndCollisionPlayer("goLeft", character, virtualPosition);
        if (character.movingRight) moveAndCollisionPlayer("goRight", character, virtualPosition);
        if (character.movingUp) moveAndCollisionPlayer("goUp", character, virtualPosition);
        if (character.movingDown) moveAndCollisionPlayer("goDown", character, virtualPosition);
    }

    function moveAndCollisionPlayer(direction, character, virtualPosition) {
        var playerCollisionsBoxes = verifyPlayerCollisions(direction, character, Boxes);
        var playerCollisionsMap = verifyPlayerCollisions(direction, character, mapArrayRawData);

        if(playerCollisionsMap || playerCollisionsBoxes){
        // if(playerCollisionsBoxes){
        // if (playerCollisionsMap) {
            // let characterBoundaries = {}
            return false
        }
        if (direction == "goLeft") {
             character.x -= character.speed;
             virtualPosition.x -= character.speed;
            }
        if (direction == "goRight") {
             character.x += character.speed;
             virtualPosition.x += character.speed;
            }
        if (direction == "goUp") {
             character.y -= character.speed;
             virtualPosition.y -= character.speed;
            }
        if (direction == "goDown") {
             character.y += character.speed;
             virtualPosition.y += character.speed;
            }

    }

    function gameLoop() {
        let colidingObjectsArray = [Boxes, mapArrayRawData]// if I take this map outside the gameLoop function, bullets only collide with boxes, not tiles.
        // createPlayerBox();
        // createPlayerBoxB();
        createPlayerSafebox(playerSafebox, currentPlayerPosition.x, currentPlayerPosition.y, playerWidth, playerHeight, playerSafeMargin, playerScale)
        createCurrentPlayerPositionXYpoint();
        updateBullets(protaBullets, colidingObjectsArray, app);
        characterMovement(playerProta, currentPlayerPosition);
        characterKeysMovement(playerProta, keys["39"] || keys["68"], keys["37"] || keys["65"], keys["40"] || keys["83"], keys["38"] || keys["87"]);
    }

    //keyboard event handlers
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", KeysUp);
    window.addEventListener("pointerdown", function (e) {
        let bullet = fireBullet(e.pageX, e.pageY, playerProta.x, playerProta.y - (playerProta.height / 2));
        protaBullets.push(bullet);
    });
}
// }