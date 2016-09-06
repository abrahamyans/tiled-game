/**
 * Created by sam on 9/4/16.
 */

"use strict";

var socket;
var roomState = null;


var socketEventHandlers = {
    err: function (err) {
        err.timestamp = new Date().toString();
        $("#json-error").JSONView(err);
    },

    added: function (addedResponse) {
        if (!roomState) {
            roomState = {};
            roomState.roomId = addedResponse.roomId;
            roomState.size = {
                rows: addedResponse.roomState.length,
                cols: addedResponse.roomState[0].length
            };
            roomState.playerPublicId = addedResponse.player.publicId;
            roomState.playerPrivateId = addedResponse.player.privateId;
            console.log("wqerqwer");
            addedResponse.roomState = "rows: " + addedResponse.roomState.length + " cols: " + addedResponse.roomState[0].length;
            $("#json-initial-added").JSONView(addedResponse);
        }
        else {
            $("#json-added").JSONView(addedResponse);
        }
    },

    turned: function(turnResult){
        $("#json-turned").JSONView(turnResult);
    }
};


//register ui events
$(function () {

    //Connect button listener
    $("#connect-button").click(function () {
        socket = io();

        socket.on("turned", function (data) {
            socketEventHandlers["turned"](data);
        });

        socket.on("added", function (data) {
            socketEventHandlers["added"](data);
        });

        socket.on('err', function (data) {
            socketEventHandlers["err"](data);
        });

        socket.emit('add', {
            roomAlias: "test",
            name: Math.random().toString(36).substring(7)
        });
    });

    //Submit button listener
    $("#turn-submit-button").click(function () {
        var request = {
            row: parseInt($("#emit-row").val()),
            col: parseInt($("#emit-col").val())
        };
        $("#json-emit-turn").JSONView(request);
        if (socket)
            socket.emit('turn', request);
    });


});




