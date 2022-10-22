import createMap from "./components/create_map.js";
import createPlayerSheet from "./components/sheets/player_sheet.js";
import fireBullet from "./components/create_bullet.js";
import createOldBoxes from "./components/create_old_boxes.js"
import colides from "./components/colides.js";
import colidesSide from "./components/colisionSide.js";
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
var playerSafeMargin = 40;
var playerSafebox = {};
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
        mapArray.forEach((tile) => app.stage.addChild(tile));
        mapArrayRawData = map.mapArrayRawData;

        playerProtaSheet = createPlayerSheet();
        currentPlayerPosition = {
            x: app.view.width / 2 - 40,
            y: (app.view.height / 2) + 50,
            type: "currentPlayerPosition"
        }

        playerSafebox = createObjectWithAdjustedCoordinates(currentPlayerPosition.x, currentPlayerPosition.y, playerWidth, playerHeight, playerSafeMargin, playerScale, "PlayerSafebox");

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


    function createObjectWithAdjustedCoordinates(x, y, width, height, margin, scale, type) {
        // The characters in this code are created from the center un X and in the bottom Y, this function creates an object that reinterpretes the position in the Top Left corner, and adds a margin.
        let object = {};
        let finalWidth = width * scale;
        let finalHeight = height * scale;

        object.x = x - finalWidth / 2 - margin;
        object.y = y - finalHeight - margin;
        object.width = finalWidth + margin * 2;
        object.height = finalHeight + margin * 2;
        object.margin = margin;
        object.sacale = scale;
        object.type = type;

        return object;
    }


    var playerSafeboxGraphic = new PIXI.Graphics();
    function drawRectangle(pixiGraphicObject, x, y, width, height, color, opacity) {
        pixiGraphicObject.clear();
        pixiGraphicObject.beginFill(color);
        pixiGraphicObject.drawRect(x, y, width, height);
        pixiGraphicObject.alpha = opacity;
        pixiGraphicObject.endFill();
        app.stage.addChild(pixiGraphicObject);
    }

    var safeboxXYPoint = new PIXI.Graphics();
    var playerXYPoint = new PIXI.Graphics();

    function drawCircle(pixiObject, x, y, diameter, color) {
        pixiObject.clear();
        pixiObject.beginFill(color);
        pixiObject.drawCircle(x, y, diameter);
        pixiObject.alpha = .8;
        pixiObject.endFill();
        app.stage.addChild(pixiObject);
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


    function verifyCollisionToObjectsArray(safeColideObject, collidablesObjectArray) {
        let doesCollides = false;
        let lastCollidingObject = {};
        collidablesObjectArray.forEach(element => {
            if (!element.isFloor) {
                if (colides(safeColideObject, element)) {
                    console.log("collisionPlayerSafebox || " + safeColideObject.type + " crashed with: " + element.type);
                    console.log(
                        'objectA.x = ' + safeColideObject.x + ';',
                        'objectA.y = ' + safeColideObject.y + ';',
                        'objectA.width = ' + safeColideObject.width + ';',
                        'objectA.height = ' + safeColideObject.height + ';',
                    );
                    console.log(
                        'objectB.x = ' + element.x + ';',
                        'objectB.y = ' + element.y + ';',
                        'objectB.width = ' + element.width + ';',
                        'objectB.height = ' + element.height + ';',
                    );
                    console.log('COLLIDING:TRUE');
                    doesCollides = true;
                    lastCollidingObject = element;
                }
            }
        });

        return [doesCollides,lastCollidingObject]
    }

    function characterMovement(character, followingObjectsArray, collidablesObjectArray) {
        let localSafeBox = followingObjectsArray[0];
        let pushBackValue = 1;

        if (character.movingLeft) {
            let collideVerification = verifyCollisionToObjectsArray(localSafeBox, collidablesObjectArray);
            if (!collideVerification[0]) {
                character.x -= character.speed;
                for (var i in followingObjectsArray) {
                    followingObjectsArray[i].x -= character.speed;
                }
            } else {
                character.x += pushBackValue;
                for (var i in followingObjectsArray) {
                    followingObjectsArray[i].x += pushBackValue;
                }
            }
        }
        if (character.movingRight) {
            let collideVerification = verifyCollisionToObjectsArray(localSafeBox, collidablesObjectArray);
            if (!collideVerification[0]) {
                character.x += character.speed;
                for (var i in followingObjectsArray) {
                    followingObjectsArray[i].x += character.speed;
                }
            } else {
                character.x -= pushBackValue;
                for (var i in followingObjectsArray) {
                    followingObjectsArray[i].x -= pushBackValue;
                }
            }
        }
        if (character.movingUp) {
            let collideVerification = verifyCollisionToObjectsArray(localSafeBox, collidablesObjectArray);
            if (!collideVerification[0]) {
                character.y -= character.speed;
                for (var i in followingObjectsArray) {
                    followingObjectsArray[i].y -= character.speed;
                }
            } else {
                character.y += pushBackValue;
                for (var i in followingObjectsArray) {
                    followingObjectsArray[i].y += pushBackValue;
                }
            }
        }
        if (character.movingDown) {
            let collideVerification = verifyCollisionToObjectsArray(localSafeBox, collidablesObjectArray);
            if (!collideVerification[0]) {
                character.y += character.speed;
                for (var i in followingObjectsArray) {
                    followingObjectsArray[i].y += character.speed;
                }
            } else {
                character.y -= pushBackValue;
                for (var i in followingObjectsArray) {
                    followingObjectsArray[i].y -= pushBackValue;
                }
            }
        }
    }

    function printObjectsArrayPositionOnKeyDown(keyCode, objectsArray) {
        if (keys[keyCode]) {
            objectsArray.forEach(element => {
                console.log('Object type: ' + element.type, '| X: ' + element.x, '| Y: ' + element.y);
            });
            console.log('-------------------------XY');
        }
    }
    function printObjectsArrayWidthHeightOnKeyDown(keyCode, objectsArray) {
        if (keys[keyCode]) {
            objectsArray.forEach(element => {
                console.log('Object type: ' + element.type, '| Width: ' + element.width, '| Heigth: ' + element.height);
            });
            console.log('-------------------------WidthHeigth');
        }
    }

    function gameLoop() {
        let colidingObjectsArray = [Boxes, mapArrayRawData]// if I take this map outside the gameLoop function, bullets only collide with boxes, not tiles.
        // createPlayerBox();
        // createPlayerBoxB();

        // setObjectWithAdjustedCoordinatesLeftTopPlusMargin(playerSafebox,playerSafeboxGraphic, currentPlayerPosition.x, currentPlayerPosition.y, playerWidth, playerHeight, playerSafeMargin, playerScale,);

        drawRectangle(playerSafeboxGraphic, playerSafebox.x, playerSafebox.y, playerSafebox.width, playerSafebox.height, "0xff00ff", 0.3)
        drawCircle(safeboxXYPoint, playerSafebox.x, playerSafebox.y, 5, "0x27FF00");
        drawCircle(playerXYPoint, currentPlayerPosition.x, currentPlayerPosition.y, 5, "0x008FFF");
        updateBullets(protaBullets, colidingObjectsArray, app);
        characterMovement(playerProta, [playerSafebox, currentPlayerPosition], mapArrayRawData);
        printObjectsArrayPositionOnKeyDown("75", [playerSafebox, currentPlayerPosition, playerProta]);
        printObjectsArrayWidthHeightOnKeyDown("73", [playerSafebox, currentPlayerPosition, playerProta]);
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