import {createTile} from "./tile.js";

export default function createMap(mapSheet, mapArrayData, hotizontalTilesNum) {

    let mapArray = mapArrayData;
    let width = hotizontalTilesNum;

    let tileMapArray = [];
    let mapArrayRawData = [];
    
    for (let i = 0; i < mapArray.length; i++) {
        let row = Math.floor(i/width);
        let column = i - (row*width)
        let tile = createTile(mapSheet,mapArray[i],column,row)
        tileMapArray.push(tile.pixiValue);
        mapArrayRawData.push(tile.rawValue);
    }

    return {tileMapArray, mapArrayRawData};
};