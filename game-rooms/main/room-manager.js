/**
 * Created by Samvel Abrahamyan on 8/31/16.
 */

"use strict";
var Room = require('./Room');
var SimpleStrategyWorld = require('../../game-core').SimpleStrategyWorld;
var idGenerator = require('./id-generator');
var logger = require('log4js').getLogger(__filename);
var strategies ={
    "simple": SimpleStrategyWorld
};

class RoomManager{
    
    constructor(){
        this._rooms = {};
        this._roomByAlias = {};
        this.setupTestRoom();
    }

    setupTestRoom(){
        this.addRoom({
            rows: 5,
            cols: 7,
            strategy: "simple",
            alias: "test"
        })
    }
    
    addRoom(params){
        if (!params.alias){
            throw new Error("Alias name is not specified");
        }
        if (this._roomByAlias[params.alias]){
            throw new Error("Room with alias "+params.alias+" already exists");
        }
        var id = idGenerator({min: 0, max: 2048}, this._rooms);
        if (!strategies[params.strategy]){
            throw new Error( "Strategy " + params.strategy + " does not exist")
        }
        if (!params.rows || !params.cols){
            throw new Error("Please specify rows and cols arguments");
        }
        var room = new Room({
            rows: params.rows,
            cols: params.cols,
            world: strategies[params.strategy],
        });
        room.id = id;
        room.alias = params.alias;
        this._rooms[id] = room;
        this._roomByAlias[params.alias] = room;
        logger.info("Room with id=%s and alias=%s was created", room.id, room.alias);

        return room;
    }
    
    getRoom(roomId){
        if (!this._rooms[roomId]){
            throw new Error("Can't find room with roomId " + roomId);
        }
        return this._rooms[roomId];
    }

    removeRoomByAlias(roomAlias){
        var roomId = this._roomByAlias[roomAlias].id;
        delete this._rooms[roomId];
        delete this._roomByAlias[roomAlias];
    }

    getRoomByAlias(alias){
        if(!this._roomByAlias[alias])
            throw new Error("No room with alias name " + alias);
        return this._roomByAlias[alias];
    }

}



module.exports = new RoomManager();

