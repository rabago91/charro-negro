export default function colides(a, b){
    // a = Coliding Object, b = Scenario object
    let aRight = a.x + a.width;
    let aLeft = a.x;
    let aBottom = a.y + a.height;
    let aTop = a.y;

    let bRight = b.x + b.width;
    let bLeft = b.x;
    let bBottom = b.y + b.height;
    let bTop = b.y;

    if (
        aRight >= bLeft &&
        aLeft <= bRight &&
        aBottom >= bTop &&
        aTop <= bBottom
    ) {
        return true;
    } else { 
        return false;
    }
}