/**
 * Created by sam on 9/3/16.
 */

"use strict";

/**
 * Decorate room manager for storing room alias names
 */

var logger = require('log4js').getLogger(__filename);
class RoomManager{

    constructor(){
        this.manager = new require('../../game-rooms').roomManager;
        this.roomByAlias = {};
    }


    addRoom(room){
        if (this.roomByAlias[room.alias]){
            throw new Error("Room with alias "+room.alias+" already exists");
        }
        var roomId = this.manager.addRoom(room);
        this.roomByAlias[room.alias] = this.manager.getRoom(roomId);
        room.id = roomId;
        logger.info("Room with id=%s and alias=%s was created", room.id, room.alias);
        return room;
    }


    getRoom(roomId){
        this.manager.getRoom(roomId);
    }

    getRoomByAlias(alias){
        if(!this.roomByAlias[alias])
            throw new Error("No room with alias name " + alias);
        return this.roomByAlias[alias];
    }

}

module.exports = new RoomManager();
