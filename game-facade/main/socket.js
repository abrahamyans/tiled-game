/**
 * Created by sam on 9/3/16.
 */

"use strict";

var roomManager = require('../../game-rooms').roomManager;
var logger = require('log4js').getLogger(__filename);
module.exports = function(server){
    var io = require('socket.io')(server);
    logger.info("Setting up socket listener");
    io.sockets.on('connection', function (socket) {
        logger.info('Client connected');




    })
};