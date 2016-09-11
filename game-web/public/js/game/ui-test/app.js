/**
 * Created by sam on 9/11/16.
 */

"use strict";

requirejs.config({
    "baseUrl": "/js/game/ui-test/",
    "paths": {

        "jquery": "https://code.jquery.com/jquery-3.1.0",

        "game-controller": "../game-controller",
        "socket-client": "mock-socket-client",
        "event-emitter": "../event-emitter",

    },
    "shim": {
        "socket-client": ["event-emitter"],
        "game-controller": ["event-emitter"]
    }
});

require([
    'socket-client',
    'game-controller',
]);