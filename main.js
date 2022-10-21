import createMap from "./components/create_map.js";
import createPlayerSheet from "./components/sheets/player_sheet.js";
import fireBullet from "./components/create_bullet.js";
import createOldBoxes from "./components/create_old_boxes.js"
import colides from "./components/colides.js";
import createMapSheet from "./components/sheets/map_sheet.js";
import createPlayer from "./components/create_player.js";
import updateBullets from "./components/update_bullets.js";
import characterKeysMovement from "./components/key_combinations.js";
import {Boxes} from "./src/local_maps/maps.js"
import {app} from "./setup/pixi_setup.js"

let playerProta, playerProtaSheet;
let keys = {};
let protaBullets = [];
let mapSheet = {};
let mapArrayRawData = [];


// export default function runGame() {
    window.onload = function() {

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

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
        let playerStartPoint = {
            x:app.view.width / 2,
            y:(app.view.height / 2)-130
        }
        playerProta = createPlayer('THE PROTA', playerStartPoint.x, playerStartPoint.y, playerProtaSheet, 5);
        app.stage.addChild(playerProta);
        createOldBoxes(Boxes);
        app.ticker.add(gameLoop);
    }

    
    var playerBox = new PIXI.Graphics();
    function createPlayerBox() {
        playerBox.clear();
        playerBox.beginFill("0xff00ff");
        playerBox.drawRect(
            playerProta.x-playerProta.width/2,
            playerProta.y-playerProta.height,
            playerProta.width,
            playerProta.height
            );
            playerBox.alpha = .2;
            playerBox.endFill();
            app.stage.addChild(playerBox);
        }
        
        var playerBoxB = new PIXI.Graphics();
        function createPlayerBoxB() {
        playerBoxB.clear();
        playerBoxB.beginFill("0x00FF80");
        playerBoxB.drawRect(
            playerProta.x-playerProta.width/5,
            playerProta.y-playerProta.height,
            playerProta.width*2/5,
            playerProta.height
        );
        playerBoxB.alpha = .5;
        playerBoxB.endFill();
        app.stage.addChild(playerBoxB);
    }

    function verifyPlayerCollisions (direction, character, scenarioArray) {
        var tmpPlayerA;
        var tmpPlayerB;

        switch(direction){
            case "goLeft" : 
            tmpPlayerA = {
                x: character.x - character.width/2 - character.speed,
                y: character.y - character.height/1,
                width: character.width,
                height: character.height
            }
            tmpPlayerB = {
                x: character.x - character.speed,
                y: character.y,
                width: character.width,
                height: character.height
            }
            break;
            case "goRight" : 
            tmpPlayerA = {
                x: character.x - character.width/2 + character.speed,
                y: character.y - character.height/1,
                width: character.width,
                height: character.height
            }
            tmpPlayerB = {
                x: character.x + character.speed,
                y: character.y,
                width: character.width,
                height: character.height
            }
            break;
            case "goUp" : 
            tmpPlayerA = {
                x: character.x - character.width/5, //Adapted for this character
                y: character.y - character.height/1 - character.speed,
                width: character.width*2/5, //Adapted for this character
                height: character.height
            }
            tmpPlayerB = {
                x: character.x,
                y: character.y,
                width: character.width, 
                height: character.height
            }
            break;
            case "goDown" : 
            tmpPlayerA = {
                x: character.x - character.width/5, //Adapted for this character
                y: character.y - character.height/1 + character.speed,
                width: character.width*2/5, //Adapted for this character
                height: character.height
            }
            tmpPlayerB = {
                x: character.x,
                y: character.y + character.speed,
                width: character.width,
                height: character.height
            }
            break;
        }

        for (var x in scenarioArray) {
            // if ( colides( tmpPlayerA, scenarioArray[x]) || colides( tmpPlayerB, scenarioArray[x] ) ) {
            if ( colides( tmpPlayerA, scenarioArray[x])) {
                if (!!scenarioArray[x].isFloor) {
                    return false
                }
                console.log(character.name + " crashed with: " + scenarioArray[x].type);
                // console.log(
                //     'objectA.x = ' + tmpPlayerA.x + ';',
                //     'objectA.y = ' + tmpPlayerA.y + ';',
                //     'objectA.width = ' + tmpPlayerA.width + ';',
                //     'objectA.height = ' + tmpPlayerA.height + ';',
                // );
                // console.log(
                //     'objectB.x = ' + scenarioArray[x].x + ';',
                //     'objectB.y = ' + scenarioArray[x].y + ';',
                //     'objectB.width = ' + scenarioArray[x].width + ';',
                //     'objectB.height = ' + scenarioArray[x].height + ';',
                // );
                return true
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
        var craftedAnimation = playerProta.actualAnimation +  playerProta.lastDirection;
        playerProta.textures = playerProta.sheet[craftedAnimation];
        playerProta.play();
    }

    function characterMovement (character){
        if(character.movingLeft) moveAndCollisionPlayer("goLeft", character);
        if(character.movingRight) moveAndCollisionPlayer("goRight", character);
        if(character.movingUp) moveAndCollisionPlayer("goUp", character);
        if(character.movingDown) moveAndCollisionPlayer("goDown", character);
    }
    
    function moveAndCollisionPlayer(direction, character){
        // var playerCollisionsBoxes = verifyPlayerCollisions(direction, character, Boxes);
        var playerCollisionsMap = verifyPlayerCollisions(direction, character, mapArrayRawData);
    
        // if(playerCollisionsMap || playerCollisionsBoxes){
        // if(playerCollisionsBoxes){
        if(playerCollisionsMap){
            // let characterBoundaries = {}
            return false
        }
        if(direction == "goLeft") character.x -= character.speed;
        if(direction == "goRight") character.x += character.speed;
        if(direction == "goUp") character.y-= character.speed;
        if(direction == "goDown") character.y+= character.speed;
        
    }
    
    function gameLoop() {
        let colidingObjectsArray = [Boxes, mapArrayRawData]// if I take this map outside the gameLoop function, bullets only collide with boxes, not tiles.
        createPlayerBox()
        createPlayerBoxB()
        updateBullets(protaBullets, colidingObjectsArray, app);
        characterMovement(playerProta);
        characterKeysMovement(playerProta, keys["39"] || keys["68"], keys["37"] || keys["65"], keys["40"] || keys["83"], keys["38"] || keys["87"]);
    }

    //keyboard event handlers
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", KeysUp);
    window.addEventListener("pointerdown", function(e){
        let bullet = fireBullet(e.pageX, e.pageY, playerProta.x, playerProta.y-(playerProta.height/2));
        protaBullets.push(bullet);
    });
}
// }