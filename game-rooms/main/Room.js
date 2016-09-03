/**
 * Created by Samvel Abrahamyan on 8/31/16.
 */

"use strict";

var errors = require('./room-errors');
var chance = require('chance');
var conf = require('./config.json');
var idGenerator = require('./id-generator');

class Room{
    
    constructor(params){
        this._world = new params.world({
            rows: params.rows,
            cols: params.cols
        });
        this.id = params.id;
        this.players = {};
    }


    addPlayer(player) {
        try {
            var id = idGenerator({min: conf.publicIdMin, max: conf.publicIdMax}, this.players);
        }catch(err){
            throw new Error({
                message: errors.FULL_ROOM
            })
        }

        player.publicId = id;
        this.players[id] = player;
        var addPlayerResponse = this._world.addPlayer();
        player.worldId  = addPlayerResponse.playerId;
        return addPlayerResponse;
    }

    onTurn(pos, playerPublicId){
        var player = this.players[playerPublicId];
        
        if (!player){
            throw new Error({
                message: errors.WRONG_ID,
                id: playerPublicId
            })
        }
        
        if(this._world.getPlayerIdAt(pos) !== player.worldId){
            throw new Error({
                message: errors.NOT_AUTHORIZED_CLICK
            });
        }

        return this._world.onTurn(pos);
    }
    
}


module.exports = Room;