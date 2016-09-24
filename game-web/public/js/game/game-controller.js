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
     * Holds a publicId -> player mapping of objects
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

        players = addedPlayerResponse.players.reduce(function(map, pl){
            map[pl.publicId] = {
                publicId: pl.publicId,
                color: pl.color,
                name: pl.name
            };
            return map;
        }, {});

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
                    color: cell.playerId ? players[cell.playerId].color : null
                }
            })
        }))
    };

    var addPlayer = function(player){
        players[player.publicId] = {
            publicId: player.publicId,
            color: player.color,
            name: player.name
        };

        player.initialPositions.forEach(function(pos){
            var cell = grid.cellAt({
                row: pos.row,
                col: pos.col
            });
            cell.playerId = player.publicId;
            cell.shapeId = pos.shapeId;
        });

        eventEmitter.emit('render-add', {
            changeColor: player.initialPositions.map(function(pos){
                return {
                    row: pos.row,
                    col: pos.col,
                    color: player.color
                }
            }),
            changeShape: player.initialPositions.map(function(pos){
                return {
                    row: pos.row,
                    col: pos.col,
                    shapeId: pos.shapeId
                }
            })
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

        eventEmitter.emit('render-turn', {
            rotate: {
                row: turn.rotate.row,
                col: turn.rotate.col
            },
            changeColor: turn.chown.map(function(pos){
                return {
                    row: pos.row,
                    col: pos.col,
                    color: players[rotatedCell.playerId].color
                }
            })
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