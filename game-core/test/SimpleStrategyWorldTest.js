/**
 * Created by Samvel Abrahamyan on 8/28/16.
 */

"use strict";

var mockery = require('mockery');
var chai = require('chai');
var shapes = require('../main/notation').shapes;

describe('SmeStrategyGameplay', () => {
    var world;
    var Pos = function (row, col) {
        this.row = row;
        this.col = col;
    };


    var clickPositions = [
        new Pos(4, 2),
        new Pos(3, 5),
        new Pos(4, 4),
        new Pos(3, 5)
    ];

    var finalState = [
        4,5,2,2,5,3,1,2,
        4,2,4,0,3,0,5,3,
        1,3,3,3,0,0,1,2,
        0,0,1,3,0,1,2,5,
        5,3,3,5,2,3,0,3,
        4,5,0,5,2,5,4,0
    ];  

    before(() => {
        mockery.enable({
            useCleanCache:true,
            warnOnReplace: true,
            warnOnUnregistered: false
        });
        mockery.registerMock('chance', require('./ChanceMock'));
        //test subject
        world = new (require('../main/SimpleStrategyWorld'))({
            rows: 6,
            cols: 8
        });
    });
    after(() => {
        mockery.deregisterAll();
        mockery.disable();
    });


    it("Register players", () => {
        var player1 = world.addPlayer();
        var player2 = world.addPlayer();

        var p1Positions = [
            new Pos(3, 1),
            new Pos(3, 2),
            new Pos(4, 1),
            new Pos(4, 2)
        ];

        var p2Positions = [
            new Pos(2, 5),
            new Pos(2, 6),
            new Pos(3, 5),
            new Pos(3, 6)
        ];

        p1Positions.forEach((pos) => {
            chai.assert.equal(world.getPlayerIdAt(pos), player1.playerId)
        });
        p2Positions.forEach((pos) => {
            chai.assert.equal(world.getPlayerIdAt(pos), player2.playerId)
        });
    });


    it("Run turns", () => {
        var start = new Date().getTime();
        clickPositions.forEach((pos) => {
            //Get the shape before rotation at pos
            var shapeBeforeRotate = shapes[world.getShapeIdAt(pos)];
            //Rotate and get results
            var results = world.onTurn(pos);
            //Assert that the cell is rotated
            chai.assert.equal(shapeBeforeRotate.rot, world.getShapeIdAt(pos));
            //Get player id of rotated cell
            var playerId = world.getPlayerIdAt(results.rotate);
            //Iterate over id changed cells
            results.chown.forEach((pos) => {
                //Assert that ids are changed
                chai.assert.equal(playerId, world.getPlayerIdAt(pos));
            })
        });
        console.log("Time taken" , new Date().getTime() - start + "ms");

    });



    it("Verify world state", () => {
        var count = 0;
        world._grid.forEach((row) => {
            row.forEach((cell) => {
                chai.assert.equal(cell.shapeId, finalState[count++]);
            })
        })
    });


});