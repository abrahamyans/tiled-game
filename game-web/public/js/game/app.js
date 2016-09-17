/**
 * Created by sam on 9/17/16.
 */

"use strict";


requirejs.config({
    "baseUrl": "/js/game/",
    "paths": {

        "jquery": "https://code.jquery.com/jquery-3.1.0",
        "io": "https://cdn.socket.io/socket.io-1.4.5",

        "cell-notation": "cell-notation",
        "Cell": "Cell",
        "event-emitter": "event-emitter",
        "ui-config": "ui-config",

        "socket-client": "socket-client",
        "game-controller": "game-controller",
        "page-controller": "page-controller",
        "game-renderer": "game-renderer"

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
    "page-controller",
    "game-controller",
    "game-renderer"
], function (eventEmitter, socketClient) {
    socketClient.connect();
    eventEmitter.emit('add', {
        roomAlias: "test",
        name: Math.random().toString(36).substring(7)
    }, true);
});