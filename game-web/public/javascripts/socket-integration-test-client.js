/**
 * Created by sam on 9/4/16.
 */

"use strict";


var socket = io();



socket.on('connect', function () {
    socket.emit("hello", "Test request");
});


socket.on("added", function (data) {
    console.log(data);
});

socket.on('err', function(data){
    console.log(data);
});


socket.emit('add', {
    roomAlias: "test",
    name: Math.random().toString(36).substring(7)
});