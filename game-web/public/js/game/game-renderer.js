/**
 * Created by sam on 9/12/16.
 */

"use strict";

define(['event-emitter', 'create', 'ui-config', 'jquery'], function (eventEmitter, createjs, config, $) {
    /**
     * Matrix of objects
     * {
     *      shapeId: int,
     *      color: int
     * }
     */
    var world;

    var stage;

    var init = function(world){
        var dimens = {
            rows: world.length,
            cols: world[0].length,
        };

        var canvas = $("canvas");
        var wrapper = canvas.parent();
        var maxWidth = wrapper.width();
        var maxHeight = wrapper.height();

        dimens.tileSize = Math.min(
            (maxWidth - (dimens.cols + 1) * config.cellGap) / dimens.cols,
            (maxHeight - (dimens.rows + 1) * config.cellGap) / dimens.rows);

        dimens.shapeWidth = dimens.tileSize * config.shapeWidthRatio;
        dimens.height = dimens.tileSize * dimens.rows + (dimens.rows + 1) * config.cellGap;
        dimens.width = dimens.tileSize * dimens.cols + (dimens.cols + 1) * config.cellGap;

        canvas.attr("width", dimens.width);
        canvas.attr("height", dimens.height);
        canvas.css('margin-top', (maxHeight - dimens.height) / 2);
        canvas.css('margin-left', (maxWidth - dimens.width) / 2);
    };



    // eventEmitter.subscribe('render-turn');
    // eventEmitter.subscribe('render-add');
    eventEmitter.subscribe('render-init', init);
});