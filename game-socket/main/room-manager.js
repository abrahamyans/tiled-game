/**
 * Created by sam on 9/3/16.
 */

"use strict";

/**
 * Decorate room manager for storing room alias names
 */
class RoomManager{

    constructor(){
        this.manager = new require('../../game-rooms').roomManager;
        this.roomByAlias = {};
    }


    addRoom(room){
        var roomId = this.manager.addRoom(room);
        this.roomByAlias[room.alias] = this.manager.getRoom(roomId);
        room.id = roomId;
        return room;
    }


    getRoom(roomId){
        this.manager.getRoom(roomId);
    }

    getRoomByAlias(alias){
        if(!this.roomByAlias[alias])
            throw new Error({message: "No room with alias name " + alias});
        return this.roomByAlias[alias];
    }

}

module.exports = new RoomManager();
