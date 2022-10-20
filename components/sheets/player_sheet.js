import {TextureCache} from "../../setup/pixi_setup.js"

export default function createPlayerSheet() {

    let playerSheet = {};


    // ATTACK
    playerSheet["Attack_East"] = [
        TextureCache["Attack_East_frame_0"]
    ];
    playerSheet["Attack_North"] = [
        TextureCache["Attack_North_frame_0"]
    ];
    playerSheet["Attack_South"] = [
        TextureCache["Attack_South_frame_0"]
    ];
    playerSheet["Attack_West"] = [
        TextureCache["Attack_West_frame_0"]
    ];
    // HURT
    playerSheet["Hurt_East"] = [
        TextureCache["Hurt_East_frame_0"]
    ];
    playerSheet["Hurt_North"] = [
        TextureCache["Hurt_North_frame_0"]
    ];
    playerSheet["Hurt_South"] = [
        TextureCache["Hurt_South_frame_0"]
    ];
    playerSheet["Hurt_West"] = [
        TextureCache["Hurt_West_frame_0"]
    ];
    // JUMP
    playerSheet["Jump_East"] = [
        TextureCache["Jump_East_frame_0"]
    ];
    playerSheet["Jump_North"] = [
        TextureCache["Jump_North_frame_0"]
    ];
    playerSheet["Jump_South"] = [
        TextureCache["Jump_South_frame_0"]
    ];
    playerSheet["Jump_West"] = [
        TextureCache["Jump_West_frame_0"]
    ];
    // IDLE EAST
    playerSheet["Idle_East"] = [
        TextureCache["Idle_East_frame_0"],
        TextureCache["Idle_East_frame_1"],
        TextureCache["Idle_East_frame_2"],
        TextureCache["Idle_East_frame_3"]
    ];
    // IDLE NORTH
    playerSheet["Idle_North"] = [
        TextureCache["Idle_North_frame_0"],
        TextureCache["Idle_North_frame_1"],
        TextureCache["Idle_North_frame_2"],
        TextureCache["Idle_North_frame_3"]
    ];
    // IDLE SOUTH
    playerSheet["Idle_South"] = [
        TextureCache["Idle_South_frame_0"],
        TextureCache["Idle_South_frame_1"],
        TextureCache["Idle_South_frame_2"],
        TextureCache["Idle_South_frame_3"]
    ];
    // IDLE WEST
    playerSheet["Idle_West"] = [
        TextureCache["Idle_West_frame_0"],
        TextureCache["Idle_West_frame_1"],
        TextureCache["Idle_West_frame_2"],
        TextureCache["Idle_West_frame_3"]
    ];
    // RUN EAST
    playerSheet["Run_East"] = [
        TextureCache["Run_East_frame_0"],
        TextureCache["Run_East_frame_1"],
        TextureCache["Run_East_frame_2"],
        TextureCache["Run_East_frame_3"]
    ];
    // RUN NORTH
    playerSheet["Run_North"] = [
        TextureCache["Run_North_frame_0"],
        TextureCache["Run_North_frame_1"],
        TextureCache["Run_North_frame_2"],
        TextureCache["Run_North_frame_3"]
    ];
    // RUN SOUTH
    playerSheet["Run_South"] = [
        TextureCache["Run_South_frame_1"],
        TextureCache["Run_South_frame_2"],
        TextureCache["Run_South_frame_3"],
        TextureCache["Run_South_frame_0"]
    ];
    // RUN WEST
    playerSheet["Run_West"] = [
        TextureCache["Run_West_frame_2"],
        TextureCache["Run_West_frame_3"],
        TextureCache["Run_West_frame_0"],
        TextureCache["Run_West_frame_1"]
    ];
    // WALK EAST
    playerSheet["Walk_East"] = [
        TextureCache["Walk_East_frame_2"],
        TextureCache["Walk_East_frame_3"],
        TextureCache["Walk_East_frame_0"],
        TextureCache["Walk_East_frame_1"]
    ];
    // WALK NORTH
    playerSheet["Walk_North"] = [
        (TextureCache["Walk_North_frame_2"]),
        (TextureCache["Walk_North_frame_3"]),
        (TextureCache["Walk_North_frame_0"]),
        (TextureCache["Walk_North_frame_1"])
    ];
    // WALK SOUTH
    playerSheet["Walk_South"] = [
        (TextureCache["Walk_South_frame_2"]),
        (TextureCache["Walk_South_frame_3"]),
        (TextureCache["Walk_South_frame_0"]),
        (TextureCache["Walk_South_frame_1"])
    ];
    // WALK WEST
    playerSheet["Walk_West"] = [
        (TextureCache["Walk_West_frame_0"]),
        (TextureCache["Walk_West_frame_1"]),
        (TextureCache["Walk_West_frame_2"]),
        (TextureCache["Walk_West_frame_3"])
    ];

    return playerSheet;
}