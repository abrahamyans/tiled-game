/**
 * Created by sam on 9/11/16.
 */

"use strict";

requirejs.config({
    "baseUrl": "/js/game/ui-test/",
    "paths": {

        "jquery": "https://code.jquery.com/jquery-3.1.0",
        "create": "https://code.createjs.com/createjs-2015.11.26.min",

        "page-controller": "../page-controller",
        "game-controller": "../game-controller",
        "socket-client": "mock-socket-client",
        "event-emitter": "../event-emitter",

    },
    "shim": {
        "socket-client": ["event-emitter"],
        "page-controller": ["event-emitter", "jquery"],
        "game-controller": ["event-emitter", "create"]
    }
});

require([
    'socket-client',
    'page-controller',
    'game-renderer',
]);