import {app} from "../setup/pixi_setup.js"

export default function createOldBoxes(Boxes){
    for(var i in Boxes){
        createBox(Boxes[i])
    }
}

function createBox(box){
    var boxGraphic = new PIXI.Graphics();
    boxGraphic.beginFill(box.color);
    boxGraphic.drawRect(box.x, box.y, box.width, box.height);
    app.stage.addChild(boxGraphic);
}