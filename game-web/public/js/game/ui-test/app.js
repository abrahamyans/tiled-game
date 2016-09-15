/**
 * Created by sam on 9/11/16.
 */

"use strict";

requirejs.config({
    "baseUrl": "/js/game/ui-test/",
    "paths": {

        "jquery": "https://code.jquery.com/jquery-3.1.0",
        "page-controller": "../page-controller",
        "ui-config": "../ui-config",
        "game-renderer": "../game-renderer",
        "socket-client": "mock-socket-client",
        "event-emitter": "../event-emitter",
        "Cell": "../Cell"

    },
    "shim": {
        "socket-client": ["event-emitter"],
        "page-controller": ["event-emitter", "jquery"],
        "game-renderer": ["event-emitter", "ui-config", "jquery"],
        "Cell": ["event-emitter", "ui-config"]
    }
});

require([
    "game-renderer",
    "socket-client",
    "page-controller",
]);