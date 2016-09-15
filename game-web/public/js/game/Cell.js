/**
 * Created by sam on 9/13/16.
 */

"use strict";

define(['event-emitter', 'ui-config'], function (eventEmitter, config) {


    function notEmpty(param) {
        if (param == undefined || param == null)
            throw new Error("Invalid empty argument");
        return param;
    }

    function Cell(properties) {
        this.Container_constructor();

        this.row = notEmpty(properties.row);
        this.col = notEmpty(properties.col);
        this.shapeId = notEmpty(properties.shapeId);
        this.shapeWidth = notEmpty(properties.shapeWidth);
        this.color = notEmpty(properties.color);
        this.size = notEmpty(properties.size);
        this.regX = this.regY = this.size/2;

        this.rectWidth = Math.sqrt(Math.pow(this.size / 2, 2) - Math.pow(this.shapeWidth / 2, 2));
        this.segmentAngle = Math.atan(this.shapeWidth / (2 * this.rectWidth));

        this.on("click", this.onClick);
        this.addChild(this.createShape(this.shapeId));
    }

    var prototype = createjs.extend(Cell, createjs.Container);

    prototype.onClick = function () {
        eventEmitter.emit('click', {row: this.row, col: this.col});
    };

    prototype.createShape = function () {
        var shape = new createjs.Shape();
        shape.graphics.beginFill(config.cellBackgroundColor).drawCircle(this.size / 2, this.size / 2, this.size / 2);
        this.fillCommand = shape.graphics.beginFill(this.color).command;
        if (this.shapeId >= 0 && this.shapeId <= 3) {
            this._drawBentShape(shape);
            this.rotation = 90 * this.shapeId;
        } else if (this.shapeId >= 4 && this.shapeId <= 5) {
            this._drawStraightShape(shape);
            this.rotation = 90 * (this.shapeId - 4);
        }
        return shape;
    };

    prototype._drawBentShape = function (shape) {
        shape.graphics
            .beginFill(this.color).drawCircle(this.size / 2, this.size / 2, this.shapeWidth / 2)
            .beginFill(this.color).drawRect(this.size/2, this.size/2 - this.shapeWidth/2, this.rectWidth, this.shapeWidth)
            .beginFill(this.color).drawRect(this.size/2 - this.shapeWidth/2, this.size/2, this.shapeWidth, this.rectWidth)
    };

    prototype._drawStraightShape = function (shape) {
        shape.graphics
            .beginFill(this.color).drawRect(this.size/2 - this.shapeWidth/2, this.size/2 - this.rectWidth, this.shapeWidth, this.size);
    };
    

    return createjs.promote(Cell, "Container");
});