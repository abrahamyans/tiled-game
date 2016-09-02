/**
 * Created by Samvel Abrahamyan on 8/31/16.
 */

"use strict";

var errors = require('./main/core-errors');
var notation = require('./main/notation');
var SimpleStrategyWorld = require('./main/SimpleStrategyWorld');



module.exports = {
    SimpleStrategyWorld: SimpleStrategyWorld,
    notation: notation,
    errors: errors
};