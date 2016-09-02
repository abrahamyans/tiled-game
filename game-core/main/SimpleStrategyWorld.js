/**
 * Created by Samvel Abrahamyan on 8/28/16.
 */

"use strict";
var AbstractWorld = require('./AbstractWorld');
class SimpleStrategyWorld extends AbstractWorld {

    constructor(param) {
        super(param);
    }

    onTurn(pos) {

        this._validateClickPos(pos);
        this._rotate(pos);
        var clickedPlayerId = super.getPlayerIdAt(pos);
        var bfsResults = super._performBfs(pos);


        return bfsResults
            .filter((result) => result.cell.playerId !== clickedPlayerId)
            .reduce((response, result) => {
                    this._chown(result.pos, clickedPlayerId);
                    response.chown.push(result.pos);
                    return response;
                },
                {
                    chown: [],
                    rotate: pos
                });
    }

}

module.exports = SimpleStrategyWorld;