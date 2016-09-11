/**
 * Created by sam on 9/11/16.
 */

"use strict";

define(['event-emitter', 'jquery'], function(eventEmitter, $){
    var dimens = {
        rows: 10,
        cols: 20,
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
});