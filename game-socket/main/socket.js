/**
 * Created by sam on 9/3/16.
 */

"use strict";

var logger = require('log4js').getAppLogger(__filename);
var roomManager = require('../../game-rooms').roomManager;

var Compressor = require('./Compressor');

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
                var player = room.addPlayer(params.name);
            } catch (err) {
                return socket.emit('err', {status: "PLAYER_NOT_ADDED", message: err.message})
            }
            var roomState = room.getRoomState();
            //Set properties for current client
            socket.roomId = room.id;
            socket.playerPrivateId = player.privateId;
            socket.compressor = Compressor(roomState.length, roomState[0].length);
            //Join current client to the room
            socket.join(room.id);
            //Respond to the current client
            socket.emit('added', {
                player: {
                    publicId: player.publicId,
                    privateId: player.privateId,
                    color: player.color,
                    name: player.name,
                    initialPositions: player.initialPositions
                },
                roomState: roomState,
                players: room.getPlayers(),
                roomId: room.id,
                roomAlias: room.alias
            });
            //Notify all other players in room
            socket.broadcast.to(room.id).emit('added', {
                publicId: player.publicId,
                color: player.color,
                name: player.name,
                initialPositions: player.initialPositions
            });

            logger.info("Player name=%s joined room with id=%s alias=%s", params.name, room.id, params.roomAlias);

        });

        socket.on('turn', function (encoded) {
            var turnPos = socket.compressor.decodeClientRequest(encoded);
            turnPos.row = parseInt(turnPos.row);
            turnPos.col = parseInt(turnPos.col);
            if (!turnPos.hasOwnProperty("row") || !turnPos.hasOwnProperty('col')){
                return socket.emit('err', {
                    status: "ILLEGAL_ARGUMENT",
                    message: "Properties row and col are required and should be integers"
                })
            }
            try{
                var room = roomManager.getRoom(socket.roomId);
                var turnResult = room.onTurn(turnPos, socket.playerPrivateId);
                io.in(room.id).emit('turned', socket.compressor.encodeServerResponse(turnResult));
            }catch(err){
                return socket.emit('err', {status: "FAILED_TURN", message: err.message});
            }
        });

        socket.on('disconnect', function (client) {
            logger.info("Client disconnected");
        })

    })
};