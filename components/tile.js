import { app } from "../setup/pixi_setup.js";

export function createTile(mapSheet,tileKind,tileX,tileY) {

    let tileSprite, tileType, isFloor;
    switch (tileKind) {
        case 1:
            tileSprite = mapSheet.tile01;
            tileType = "Orange tile";
            isFloor = false;
            break;
        case 2:
            tileSprite = mapSheet.tile02;
            tileType = "Green tile";
            isFloor = true;
            break;
        case 3:
            tileSprite = mapSheet.tile03;
            tileType = "Cyan tile";
            isFloor = true;
            break;
        case 4:
            tileSprite = mapSheet.tile04;
            tileType = "Purple tile";
            isFloor = true;
            break;
        case 5:
            tileSprite = mapSheet.tile05;
            tileType = "pink tile";
            isFloor = false;
            break;
    }
    var tileHeight = app.loader.resources["jsonMap"].data.tileheight;
    var tileWidth = app.loader.resources["jsonMap"].data.tilewidth;

    let rawValue = {
        x : tileX * tileWidth,
        y : tileY * tileHeight,
        width : tileWidth,
        height : tileHeight,
        type : tileType,
        isFloor : isFloor
    }

    var pixiValue = new PIXI.AnimatedSprite(tileSprite);
        pixiValue.x = rawValue.x;
        pixiValue.y = rawValue.y;
        pixiValue.width = rawValue.width;
        pixiValue.height = rawValue.height;
        pixiValue.type = rawValue.type;
        pixiValue.isFloor = rawValue.isFloor;

    return {pixiValue, rawValue};
}