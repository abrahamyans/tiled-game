/**
 * Created by Samvel Abrahamyan on 9/1/16.
 */

"use strict";
var chai = require('chai');
var roomManager = require('../main/room-manager');
describe('Room manager test', () => {

    var room;
    var player;
    it('Add room', () => {
        room = roomManager.addRoom({
            rows: 10, 
            cols: 20,
            strategy: "simple",
            alias: "alias"
        });
        chai.assert.isNotNull(room);
    });

    it("Should return same room", () => {
        chai.assert.equal(roomManager.getRoom(room.id), roomManager.getRoomByAlias('alias'));
    });


    it('Add player to room', () => {
        var params = {name: "Hello"};
        player = room.addPlayer(params);
        chai.assert.isNumber(player.privateId);
        chai.assert.isNumber(player.publicId);
        chai.assert.isArray(player.initialPositions);
        chai.assert.isString(player.name);
        chai.assert.isString(player.color);
    });


    it('Perform turn', () => {
        var turnResponse = room.onTurn(player.initialPositions[0], player.privateId);
        chai.assert.isArray(turnResponse.chown);
        chai.assert.isObject(turnResponse.rotate);
    })


});