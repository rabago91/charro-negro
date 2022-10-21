//settings
// PIXI.settings.RESOLUTION = window.devicePixelRatio;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

//Aliases
var Application = PIXI.Application
export var loader = PIXI.Loader.shared
export var TextureCache = PIXI.utils.TextureCache


export var app = new Application({
width: 960,
height: 960,
backgroundColor: 0xeeeeee,
});