/**
 * Created by sam on 9/4/16.
 */

"use strict";



define(['event-emitter', 'jquery'], function(eventEmitter, $){

    var roomState = null;

    function changePageTitle(title){
        document.title = title;
    }


    //Submit button listener
    $("#turn-submit-button").click(function () {
        var request = {
            row: parseInt($("#emit-row").val()),
            col: parseInt($("#emit-col").val())
        };
        $("#json-emit-turn").JSONView(request);
        eventEmitter.emit('turn', request);
    });

    //Connect button listener
    $("#connect-button").click(function () {
        eventEmitter.emit('add',  {
            roomAlias: "test",
            name: Math.random().toString(36).substring(7)
        });
    });


    eventEmitter.subscribe('err', function (err) {
        err.timestamp = new Date().toString();
        $("#json-error").JSONView(err);
        changePageTitle("error: " + err.message);
    });


    eventEmitter.subscribe('added', function (addedResponse) {
        if (!roomState) {
            roomState = {};
            roomState.roomId = addedResponse.roomId;
            roomState.size = {
                rows: addedResponse.roomState.length,
                cols: addedResponse.roomState[0].length
            };
            roomState.grid = addedResponse.grid;
            roomState.playerPublicId = addedResponse.player.publicId;
            roomState.playerPrivateId = addedResponse.player.privateId;
            console.log("wqerqwer");
            addedResponse.roomState = "rows: " + addedResponse.roomState.length + " cols: " + addedResponse.roomState[0].length;
            $("#json-initial-added").JSONView(addedResponse);
        }
        else {
            $("#json-added").JSONView(addedResponse);
            changePageTitle("Player " + addedResponse.name + " added");
        }
    });


    eventEmitter.subscribe('turned', function(turnResult){
        $("#json-turned").JSONView(turnResult);
        changePageTitle("Turned " + JSON.stringify(turnResult.rotate));
    });

});




