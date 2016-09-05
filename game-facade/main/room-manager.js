/**
 * Created by sam on 9/3/16.
 */

"use strict";

/**
 * Decorate room manager for storing room alias names
 */

var logger = require('log4js').getLogger(__filename);
class RoomManager{

    constructor() {
        this.manager = new require('../../game-rooms').roomManager;
        this.roomByAlias = {};
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
        if (this.roomByAlias[params.alias]){
            throw new Error("Room with alias "+params.alias+" already exists");
        }
        if (!params.alias){
            throw new Error("Alias name is not specified");
        }
        var room = this.manager.addRoom(params);
        this.roomByAlias[params.alias] = room;
        room.alias = params.alias;
        logger.info("Room with id=%s and alias=%s was created", room.id, room.alias);
        return room;
    }

    removeRoom(alias) {
        var room = this.getRoomByAlias(alias);
        this.manager.removeRoom(room.id);
        delete this.roomByAlias[alias];
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
