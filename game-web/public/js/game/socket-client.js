/**
 * Created by sam on 9/7/16.
 */

"use strict";

define(['io', 'event-emitter', 'Compressor'], function (io, eventEmitter, Compressor) {

    return {
        connect: function () {

            var socket = io();
            var compressor;
            socket.on("added", function (data) {
                //If this is the first added event then initialize compressor
                if (data.roomState) {
                    compressor = Compressor(data.roomState.length, data.roomState[0].length);
                }
                eventEmitter.emit("added", data, true);
            });

            //response
            socket.on("r", function (encoded) {
                var data = compressor.decodeServerResponse(encoded);
                eventEmitter.emit("turned", data, true);
            });

            socket.on('err', function (data) {
                eventEmitter.emit("err", data, true);
            });

            eventEmitter.subscribe("add", function (data) {
                socket.emit('add', data);
            });

            eventEmitter.subscribe("turn", function (data) {
                var encoded = compressor.encodeClientRequest(data);
                //turn
                socket.emit('t', encoded);
            });

            eventEmitter.subscribe("err", function (data) {
                console.log(data);
            })

        }
    }

});