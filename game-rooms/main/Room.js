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
        this.players = {};
    }


    addPlayer(playerName) {
        try {
            var id = idGenerator({min: conf.publicIdMin, max: conf.publicIdMax}, this.players);
        }catch(err){
            throw new Error(errors.FULL_ROOM)
        }
        var addPlayerResponse = this._world.addPlayer();
        var player = {
            name: Room.require(playerName, "No player name is specified"),
            publicId: addPlayerResponse.playerId,
            privateId: id,
            color: randomColor({
                luminosity: 'bright',
                format: 'hex'
            }),
            initialPositions: addPlayerResponse.positions
        };
        this.players[id] = player;

        return player;
    }

    onTurn(pos, playerPrivateId) {
        var player = this.players[playerPrivateId];

        if (!player) {
            throw new Error("Cannot find player with private id " + playerPrivateId)
        }
        if (this._world.getPlayerIdAt(pos) !== player.publicId) {
            throw new Error("The cell at " + pos.row + ", " + pos.col + " does not belong to player with public id " + player.publicId);
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