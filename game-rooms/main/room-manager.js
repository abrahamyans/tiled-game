/**
 * Created by Samvel Abrahamyan on 8/31/16.
 */

"use strict";
var Room = require('./Room');
var SimpleStrategyWorld = require('../../game-core').SimpleStrategyWorld;
var idGenerator = require('./id-generator');
var strategies ={
    "simple": SimpleStrategyWorld
};

class RoomManager{
    
    constructor(){
        this._rooms = {};
    }
    
    addRoom(params){
        var id = idGenerator({min: 0, max: 2048}, this._rooms);
        if (!strategies[params.strategy]){
            throw new Error( "Strategy " + params.strategy + " does not exist")
        }
        this._rooms[id] = new Room({
            rows: params.rows,
            cols: params.cols,
            world: strategies[params.strategy]
        });
        return id;
    }
    
    getRoom(roomId){
        return this._rooms[roomId];
    }

}



module.exports = new RoomManager();

