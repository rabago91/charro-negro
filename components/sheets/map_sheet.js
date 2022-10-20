import { app } from "../../setup/pixi_setup.js";


export default function createMapSheet() {
    let mapSheet = {};
    let ssheet = new PIXI.BaseTexture.from(app.loader.resources["tilesSource"].url);
    var w = app.loader.resources["jsonMap"].data.tilewidth;
    var h = app.loader.resources["jsonMap"].data.tileheight;

    mapSheet["tile01"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0, w, h))
    ];
    mapSheet["tile02"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    mapSheet["tile03"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    mapSheet["tile04"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 0, w, h))
    ];
    mapSheet["tile05"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 0, w, h))
    ];

    return mapSheet;
}