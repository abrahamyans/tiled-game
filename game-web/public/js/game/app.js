/**
 * Created by sam on 9/17/16.
 */

"use strict";


requirejs.config({
    "baseUrl": "/js/game/",
    "paths": {

        "jquery": "https://code.jquery.com/jquery-3.1.0",
        "io": "https://cdn.socket.io/socket.io-1.4.5",

        "page-controller": "page-controller",
        "ui-config": "ui-config",
        "game-renderer": "game-renderer",
        "socket-client": "socket-client",
        "event-emitter": "event-emitter",
        "cell-notation": "cell-notation",
        "Cell": "Cell"

    },
    "shim": {
        "socket-client": ["io", "event-emitter"],
        "game-controller": ["event-emitter", "cell-notation"],
        "page-controller": ["event-emitter", "jquery"],
        "game-renderer": ["event-emitter", "ui-config", "jquery"],
        "Cell": ["event-emitter", "ui-config"]
    }
});

require([
    "event-emitter",
    "socket-client",
    "page-controller"
], function (eventEmitter, socketClient) {
    socketClient.connect();
    eventEmitter.emit('add', null, true);
});