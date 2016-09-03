/**
 * Created by sam on 9/3/16.
 */

"use strict";
var express = require('express');
var route = express.Router();
var roomManager = require('../../game-rooms').roomManager;
var logger = require('log4js').getLogger(module.filename);

logger.info('Mounting router for /room');

route.put('/', (req, res) => {

    res.status(200).json({
        message: req.message
    });

});


module.exports = route;