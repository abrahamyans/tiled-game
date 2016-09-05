/**
 * Created by Samvel Abrahamyan on 8/31/16.
 */

"use strict";

var errors = require('./room-errors');
var conf = require('./config.json');
var idGenerator = require('./id-generator');
var randomColor = require('randomcolor');

class Room{

    static require(val, message){
        if (!val)
            throw new Error(message);
        return val;
    }
    
    constructor(params){
        this._world = new (params.world)({
            rows: params.rows,
            cols: params.cols
        });
        this.id = params.id;
        this.players = {};
    }


    addPlayer(params) {
        try {
            var id = idGenerator({min: conf.publicIdMin, max: conf.publicIdMax}, this.players);
        }catch(err){
            throw new Error(errors.FULL_ROOM)
        }
        var addPlayerResponse = this._world.addPlayer();
        var player = {
            name: Room.require(params.name, "No player name is specified"),
            publicId: addPlayerResponse.playerId,
            privateId: id,
            color: randomColor({
                luminosity: 'bright',
                format: 'hex'
            })
        };
        this.players[id] = player;

        return player;
    }

    onTurn(pos, playerPublicId) {
        var player = this.players[playerPublicId];

        if (!player) {
            throw new Error(errors.WRONG_ID + playerPublicId)
        }

        if (this._world.getPlayerIdAt(pos) !== player.publicId) {
            throw new Error(errors.NOT_AUTHORIZED_CLICK);
        }

        return this._world.onTurn(pos);
    }


    getRoomState(){
        return this._world.getWorldState();
    }

    getPlayers(){
        return Object.keys(this.players)
            .map((key) => {
                var player = this.players[key];
                var copiedPlayer = {};
                copiedPlayer.publicId = player.publicId;
                copiedPlayer.color = player.color;
                copiedPlayer.name = player.name;
                return copiedPlayer;
            })
            .reduce((arr, player) =>{ arr.push(player); return arr } , [])
            .sort((a, b) => a.publicId > b.publicId);
    }

    
}


module.exports = Room;