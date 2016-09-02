/**
 * Created by Samvel Abrahamyan on 8/28/16.
 */

"use strict";

var chance = new (require('chance'))();
var shapes = require('./notation').shapes;
class Cell{
    constructor(){
        this.shapeId = chance.integer({
            max: Object.keys(shapes).length-1,
            min: 0
        });
        this.playerId = null;
    }
}

module.exports = Cell;