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
        "ui-config": "../ui-config",
        "game-renderer": "../game-renderer",
        "socket-client": "mock-socket-client",
        "event-emitter": "../event-emitter",

    },
    "shim": {
        "socket-client": ["event-emitter"],
        "page-controller": ["event-emitter", "jquery"],
        "game-renderer": ["event-emitter", "create", "ui-config", "jquery"]
    }
});

require([
    'game-renderer',
    'socket-client',
    'page-controller',
]);