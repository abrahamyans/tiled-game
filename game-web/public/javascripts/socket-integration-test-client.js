/**
 * Created by sam on 9/4/16.
 */

"use strict";


var socket = io();



socket.on('connect', function () {
    socket.emit("hello", "Test request");
});


socket.on("hello-response", function (data) {
    console.log(data);
});

