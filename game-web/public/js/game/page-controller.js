/**
 * Created by sam on 9/11/16.
 */

"use strict";

define(['event-emitter', 'jquery'] , function (eventEmitter, $) {


    var addPlayersToList = function (addResponse) {
        var players =  addResponse.hasOwnProperty("player") ? addResponse.players : [addResponse];
        players.forEach(function (player) {
            var row = $('#players-list-item-template').clone(true, true);
            row.css('display', 'block');
            row.find('.player-name').text(player.name);
            row.find('.player-color').css('background', player.color);
            $('#players-list').append(row);
        })
    };



    eventEmitter.subscribe('added', addPlayersToList);

});