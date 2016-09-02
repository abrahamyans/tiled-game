var shapes = [
    4,5,2,2,5,3,1,2,
    4,2,4,0,3,0,5,3,
    1,3,3,3,0,0,1,2,
    0,5,0,3,0,2,2,5,
    5,3,0,5,1,3,0,3,
    4,5,0,5,2,5,4,0
];
var positions = [
    3, 1,
    2, 5
];
var out = shapes.concat(positions);
var count = 0;
class Chance{

    integer(){
        var val = out[count++];
        if (val === undefined) {
            throw new Error("Mock Chance: No values left");
        }
        return val;
    }
}


module.exports = Chance;