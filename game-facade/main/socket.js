/**
 * Created by sam on 9/3/16.
 */

"use strict";

var logger = require('log4js').getLogger(__filename);
var roomManager = require('./room-manager');


module.exports = function (server) {
    var io = require('socket.io')(server);
    logger.info("Setting up socket listener");
    io.sockets.on('connection', function (socket) {
        logger.info('Client connected');

        socket.on('add', function (params) {

            if (!params.roomAlias) {
                return socket.emit('err', {
                    status: "ILLEGAL_ARGUMENT",
                    message: "Please specify the name of the room"
                })
            }

            try {
                var room = roomManager.getRoomByAlias(params.roomAlias);
            }catch (err) {
                return socket.emit('err', {status: "ROOM_NOT_FOUND", message: err.message});
            }

            try{
                var player = room.addPlayer(params);
            }catch (err){
                return socket.emit('err', {status: "PLAYER_NOT_ADDED", message: err.message})
            }

            socket.emit('added', {
                player: {
                    publicId: player.publicId,
                    privateId: player.privateId,
                    color: player.color,
                    name: player.name
                },
                roomState: room.getRoomState(),
                players: room.getPlayers(),
                roomId: room.id,
                roomAlias: room.alias
            });

            logger.info("Player name=%s joined room with id=%s alias=%s", params.name, room.id, params.roomAlias);

        });

        socket.on('turn', function (turn) {

        });

        socket.on('disconnect', function (client) {
            logger.info("Client disconnected");
        })

    })
};