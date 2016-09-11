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


    var setupCanvas = function(addResponse){
        var dimens = {
            rows: addResponse.roomState.length,
            cols: addResponse.roomState[0].length,
            tileMargin: 1
        };

        var canvas = $("canvas");
        var wrapper = canvas.parent();
        var maxWidth = wrapper.width();
        var maxHeight = wrapper.height();

        dimens.tileSize = Math.min(
            (maxWidth - (dimens.cols + 1) * dimens.tileMargin) / dimens.cols,
            (maxHeight - (dimens.rows + 1) * dimens.tileMargin) / dimens.rows);
        dimens.shapeWidth = dimens.tileSize * 0.27;

        dimens.shapeWidth = dimens.tileSize / 5;
        dimens.height = dimens.tileSize * dimens.rows + (dimens.rows + 1) * dimens.tileMargin;
        dimens.width = dimens.tileSize * dimens.cols + (dimens.cols + 1) * dimens.tileMargin;

        canvas.attr("width", dimens.width);
        canvas.attr("height", dimens.height);
        canvas.css('margin-top', (maxHeight - dimens.height) / 2);
        canvas.css('margin-left', (maxWidth - dimens.width) / 2);
    };


    eventEmitter.subscribe('added', setupCanvas);
    eventEmitter.subscribe('added', addPlayersToList);
    eventEmitter.emit('add', null, true);

});