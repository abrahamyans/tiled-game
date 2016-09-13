/**
 * Created by sam on 9/11/16.
 * This module is used for holding the game state, nothing more
 */

"use strict";

define(['event-emitter', 'cell-notation'], function(eventEmitter, notation){
    /**
     * Holds a matrix of objects
     * {
     *      shapeId: int
     *      playerId: int
     * }
     * Has a method named cellAt({row: int, col: int}) to get cell at position
     */
    var grid;
    /**
     * Holds an array of objects
     * {
     *      publicId: int
     *      color: string
     *      name: string
     * }
     */
    var players;
    /**
     * Holds a reference to the current player
     */
    var myPlayer;


    var initializeGrid = function(addedPlayerResponse){
        grid = addedPlayerResponse.roomState.map(function(row){
            return row.map(function(cell){
                return {
                    shapeId: cell.shapeId,
                    playerId: cell.playerId
                }
            })
        });
        grid.cellAt = function (pos) {
            return grid[pos.row][pos.col];
        };

        players = addedPlayerResponse.players.map(function(pl){
            return {
                publicId: pl.publicId,
                color: pl.color,
                name: pl.name
            }
        });

        myPlayer = {
            publicId: addedPlayerResponse.player.publicId,
            privateId: addedPlayerResponse.player.privateId,
            color: addedPlayerResponse.player.color,
            name: addedPlayerResponse.player.name
        };

        eventEmitter.emit('render-init', grid.map(function (row) {
            return row.map(function(cell){
                return {
                    shapeId: cell.shapeId,
                    color: players.filter(function(pl){return pl.publicId == cell.playerId})[0].color
                }
            })
        }))
    };

    var addPlayer = function(player){
        players.push({
            publicId: player.publicId,
            color: player.color,
            name: player.name
        });

        player.initialPositions.forEach(function(pos){
            var cell = grid.cellAt({
                row: pos.row,
                col: pos.col
            });
            cell.playerId = player.publicId;
            cell.shapeId = pos.shapeId;
        });

    };

    /**
     * @param turn
     * {
     *      chown: array of {
     *          row: int
     *          col: int
     *      }
     *      rotate: {
     *          row: int
     *          col: int
     *      }
     * }
     */
    var onTurn = function(turn){
        var rotatedCell = grid.cellAt(turn.rotate);
        rotatedCell.shapeId = notation.shapes[rotatedCell.shapeId].rot;
        turn.chown.forEach(function(chownPos){
            grid.cellAt(chownPos).playerId = rotatedCell.playerId;
        });
    };

    //Event handlers
    eventEmitter.subscribe('click', function(pos){
        if (grid.cellAt(pos).playerId !== myPlayer.publicId){
            return;
        }
        eventEmitter.emit('turn', {
            row: pos.row,
            col: pos.col
        });
    });

    eventEmitter.subscribe('added', function(data){
        if (grid == null && players == null){
            initializeGrid(data);
        }else {
            addPlayer(data);
        }
    });

    eventEmitter.subscribe('turned', onTurn);

});