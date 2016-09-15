/**
 * Created by sam on 9/12/16.
 */

"use strict";

define(['event-emitter', 'ui-config', 'jquery', 'Cell'], function (eventEmitter, config, $, Cell) {

    var stage;

    var init = function(world){
        var dimens = {
            rows: world.length,
            cols: world[0].length,
            cellSize: null,
            shapeWidth: null,
            width: null,
            height: null
        };

        var canvas = $("canvas");
        var wrapper = canvas.parent();
        var maxWidth = wrapper.width();
        var maxHeight = wrapper.height();

        dimens.cellSize = Math.min(
            (maxWidth - (dimens.cols + 1) * config.cellGap) / dimens.cols,
            (maxHeight - (dimens.rows + 1) * config.cellGap) / dimens.rows);

        dimens.shapeWidth = dimens.cellSize * config.shapeWidthRatio;
        dimens.height = dimens.cellSize * dimens.rows + (dimens.rows + 1) * config.cellGap;
        dimens.width = dimens.cellSize * dimens.cols + (dimens.cols + 1) * config.cellGap;

        canvas.attr("width", dimens.width);
        canvas.attr("height", dimens.height);
        canvas.css('margin-top', (maxHeight - dimens.height) / 2);
        canvas.css('margin-left', (maxWidth - dimens.width) / 2);

        createjs.Stage.prototype.addCell = function (cell) {
            if (!this.cells){
                this.cells = {};
            }
            this.cells[cell.row + ":" + cell.col] = cell;
            this.addChild(cell);

        };

        createjs.Stage.prototype.getCellAt = function(pos){
            if(!this.cells[pos.row + ":" + pos.col])
                throw new Error("Position out of bounds " + JSON.stringify(pos));
            return this.cells[pos.row + ":" + pos.col];
        };

        stage = new createjs.Stage("canvas");
        stage.enableMouseOver();

        world.forEach(function (row, r) {
            row.forEach(function(cell, c){
                 var cellActor = new Cell({
                    row: r,
                    col: c,
                    color: cell.color? cell.color : config.emptyColor,
                    shapeId: cell.shapeId,
                    shapeWidth: dimens.shapeWidth,
                    size: dimens.cellSize
                });
                cellActor.x = (c+1) * config.cellGap + c * dimens.cellSize + dimens.cellSize/2;
                cellActor.y = (r+1) * config.cellGap + r * dimens.cellSize + dimens.cellSize/2;
                stage.addCell(cellActor);
            });
        });

        createjs.Ticker.on("tick", stage);


    };

    var turn = function(turn){
        turn.changeColor.forEach(function(pos){
            var cell = stage.getCellAt(pos);
            cell.changeColor(pos.color);
        });
        stage.getCellAt(turn.rotate).rotation += turn.rotate.angle;
        stage.update();
    };

    eventEmitter.subscribe('render-turn', turn);
    // eventEmitter.subscribe('render-add');
    eventEmitter.subscribe('render-init', init);
});