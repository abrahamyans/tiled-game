/**
 * Created by Samvel Abrahamyan on 9/1/16.
 */

"use strict";
var chai = require('chai');
var roomManager = require('../main/room-manager');
describe('Room manager test', () => {


    var roomId;
    var room;
    var playerAddResponse;
    var player;
    it('Add room', () => {
        roomId = roomManager.addRoom({
            rows: 10, 
            cols: 20,
            strategy: "simple"
        });
        chai.assert.isNotNull(roomId);
    });

    it('Get added room', () => {
        room = roomManager.getRoom(roomId);
        chai.assert.isNotNull(room);
    });


    it('Add player to room', () => {
        player = {name: "Hello"};
        playerAddResponse = room.addPlayer(player);
        chai.assert.isDefined(player.publicId);
        chai.assert.isNotNull(player.publicId);
        chai.assert.isNumber(playerAddResponse.playerId);
        chai.assert.isArray(playerAddResponse.positions);
    });


    it('Perform turn', () => {
        var turnResponse = room.onTurn(playerAddResponse.positions[0], player.publicId);
        chai.assert.isArray(turnResponse.chown);
        chai.assert.isObject(turnResponse.rotate);
    })


});