/**
 * Created by sam on 9/9/16.
 */

"use strict";


requirejs.config({
    "baseUrl": "/js/game/socket-test/",
    "paths": {

        "io": "https://cdn.socket.io/socket.io-1.4.5",
        "jquery": "https://code.jquery.com/jquery-3.1.0",
        "jquery-json-view": "https://cdnjs.cloudflare.com/ajax/libs/jquery-jsonview/1.2.3/jquery.jsonview",

        "test-page-controller": "test-page-controller",
        "socket-client": "../socket-client",
        "event-emitter": "../event-emitter",
        "Compressor": "../Compressor",

    },
    "shim": {
        "jquery-json-view": ["jquery"],
        "socket-client": ["io", "event-emitter", "Compressor"],
        "test-page-controller": ["socket-client", "jquery-json-view", "event-emitter"]
    }
});

require([
    'socket-client',
    'test-page-controller',
], function(socketClient){
    socketClient.connect();
});