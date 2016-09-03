/**
 * Created by sam on 9/3/16.
 */

"use strict";

var realGameCore = require('../../game-core');

function pos(row, col) {
    return {
        row: row,
        col: col
    }
}


var turnResponse = {
    chown: [
        pos(5, 7),
        pos(5, 8),
        pos(4, 8)
    ],
    rotate: pos(5, 6)
};


var addPlayerResponse = {
    playerId: 0,
    positions: [
        pos(5, 5),
        pos(5, 6),
        pos(6, 5),
        pos(6, 6)
    ]
};

var gameCore = {

    SimpleStrategyWorld: class {
        onTurn(pos) {
            console.log("Turn was requested on ", JSON.stringify(pos));
            return turnResponse;
        }


        addPlayer() {
            console.log("Player added");
            return addPlayerResponse;
        }


        getShapeIdAt(pos) {
           console.log("Shape id was requested on ", JSON.stringify(pos))
            return 1;
        }

        getPlayerIdAt(pos){
            console.log("Player id was requested on ", JSON.stringify(pos))
            var belongs = addPlayerResponse.positions.reduce((result, p) => {
                return result && p.row === pos.row && p.col === pos.col;
            });
            if (belongs)
                return 0;
            throw new Error();
        }
    },
    notation: realGameCore.notation,
    errors: realGameCore.errors,
    addPlayerResponse: addPlayerResponse,
    turnResponse: turnResponse
};