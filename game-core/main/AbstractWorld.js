/**
 * Created by Samvel Abrahamyan on 8/28/16.
 */

"use strict";
var shapes = require('./notation').shapes;
var directions = require('./notation').dir;
var Chance = require('chance');
var Cell = require('./Cell');
var Queue = require('double-ended-queue');
var errors = require('./core-errors');

var chance = new Chance();


class AbstractWorld {

    static createGrid(rows, cols) {
        var grid;
        grid = new Array(rows);
        var r, c;
        for (r = 0; r < rows; ++r) {
            grid[r] = new Array(cols);
            for (c = 0; c < cols; ++c) {
                grid[r][c] = new Cell();
            }
        }
        return grid;
    }

    constructor(param) {
        this._grid = AbstractWorld.createGrid(param.rows, param.cols);
        this._size = {
            rows: param.rows,
            cols: param.cols
        };
        this._lastPlayerId = 0;
    }


    //Protected utility methods
    _isWithinBounds(pos) {
        return !!(this._grid[pos.row] && this._grid[pos.row][pos.col]);

    }

    _isFree(args) {
        var positions = [];
        positions = positions.concat(args);
        return positions
            .map((pos) =>this._isWithinBounds(pos) && this._grid[pos.row][pos.col].playerId == null)
            .reduce(((result, wasValid) => result & wasValid), true);
    }

    _validateClickPos(pos) {
        if (!this._isWithinBounds(pos))
            throw new Error( errors.POSITION_OUT_OF_BOUNDS);
        if (this.getPlayerIdAt(pos) == null)
            throw new Error( errors.CLICK_AT_UNOWNED_CELL);
    }

    _performBfs(clickPos) {
        this._validateClickPos(clickPos);
        var bfs = (() => {
            var visitedPath = {};
            var cells = [];

            return {
                markAsVisited: (cell, pos)=> {
                    visitedPath[pos.row + ":" + pos.col] = true;
                    cells.push({
                        cell: cell,
                        pos: pos
                    });
                },
                isVisited: (pos)=> {
                    return !!(visitedPath[pos.row + ":" + pos.col]);
                },
                getCells: () => {
                    return cells;
                }
            }
        })();

        var queue = new Queue();
        queue.enqueue(clickPos);
        var cell;
        var pos;
        while (!queue.isEmpty()) {
            pos = queue.dequeue();
            cell = this._getCellReference(pos);
            bfs.markAsVisited(cell, pos);
            var shape = shapes[cell.shapeId];
            shape.con
                .map((dir) => {
                    return {
                        row: pos.row + dir.r,
                        col: pos.col + dir.c,
                        connectedBy: dir.name
                    }
                })
                .filter((nextPos) => {
                    return this._isWithinBounds(nextPos) && !bfs.isVisited(nextPos)
                })
                .filter((nextPos) => {
                    var nextShape = shapes[this._getCellReference(nextPos).shapeId];
                    return nextShape.con.reduce((wasConnected, con) => {
                        return wasConnected || con.opposite === nextPos.connectedBy
                    }, false);
                })
                .forEach((nextPos) => {
                    queue.push(nextPos);
                });
        }

        return bfs.getCells();
    }

    _chown(pos, id){
        this._grid[pos.row][pos.col].playerId = id;
    }

    _rotate(pos) {
        var currShapeId =  this._grid[pos.row][pos.col].shapeId;
        this._grid[pos.row][pos.col].shapeId = shapes[currShapeId].rot;
    }

    _getCellReference(pos){
        if (!this._isWithinBounds(pos))
            throw new Error("The size is " + JSON.stringify(this._size) + " request position is " + JSON.stringify(pos));
        return this._grid[pos.row][pos.col];
    }

    //Public interface methods

    getWorldState(){
        return JSON.parse(JSON.stringify(this._grid));
    }

    getPlayerIdAt(pos) {
        return this._getCellReference(pos).playerId;
    }

    getShapeIdAt(pos){
        return this._getCellReference(pos).shapeId;
    }
    
    addPlayer() {
        var tryCount = 0;
        do {
            tryCount++;
            if (tryCount >= 1000)
                throw new Error(errors.FULL_ROOM);
            var pos = {
                row: chance.integer({
                    min: 0,
                    max: this._size.rows - 1
                }),
                col: chance.integer({
                    min: 0,
                    max: this._size.cols - 1
                })
            };
            var positions = [
                {
                    row: pos.row,
                    col: pos.col,
                    shapeId: 0
                },
                {
                    row: pos.row,
                    col: pos.col +1,
                    shapeId: 1
                },
                {
                    row: pos.row + 1,
                    col: pos.col + 1,
                    shapeId: 2
                },
                {
                    row: pos.row  + 1,
                    col: pos.col,
                    shapeId: 3
                }
            ]
        } while (!this._isFree(positions));
        ++this._lastPlayerId;
        positions.forEach((pos) => {
            this._grid[pos.row][pos.col].playerId = this._lastPlayerId;
            this._grid[pos.row][pos.col].shapeId = pos.shapeId;
        });
        return {
            playerId: this._lastPlayerId,
            positions: positions
        }
    }

    onTurn(pos) {
        throw new Error( "Not implemented");
    }

}


module.exports = AbstractWorld;