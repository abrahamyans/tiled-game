/**
 * Created by sam on 9/3/16.
 */

"use strict";

var io = require('socket.io')();
var roomManager = require('../../game-rooms').roomManager;
var logger = require('log4js').getLogger(__filename);
module.exports = function(){
    logger.info("Setting up socket listener");
    io.sockets.on('connection', function (socket) {

    })
};