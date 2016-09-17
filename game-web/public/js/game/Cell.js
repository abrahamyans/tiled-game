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
        this.shapeWidth = notEmpty(properties.shapeWidth);
        this.color = notEmpty(properties.color);
        this.size = notEmpty(properties.size);
        this.shapeType = notEmpty(properties.shapeType);
        this.rotation = notEmpty(properties.rotation);
        this.rectWidth = Math.sqrt(Math.pow(this.size / 2, 2) - Math.pow(this.shapeWidth / 2, 2));
        this.shape = new createjs.Shape();
        this.lock = false;

        this.addChild(this._initShape(this.shape));

        this.on("click", this.onClick);

        createjs.Ticker.setFPS(60);

    }

    var prototype = createjs.extend(Cell, createjs.Container);

    prototype.onClick = function () {
        if (this.lock == false){
            eventEmitter.emit('click', {row: this.row, col: this.col});
        }
        else{
            console.log("Tile is locked, cant click")
        }
    };

    prototype._initShape = function (shape) {
        shape.graphics.beginFill(config.cellBackgroundColor).drawCircle(this.size / 2, this.size / 2, this.size / 2);
        if (this.shapeType === "BENT") {
            this._drawBentShape(shape);
        } else if (this.shapeType = "STRAIGHT") {
            this._drawStraightShape(shape);
        }
        return shape;
    };

    prototype._drawBentShape = function (shape) {
        shape.graphics
            .beginFill(this.color).drawCircle(this.size / 2, this.size / 2, this.shapeWidth / 2)
            .beginFill(this.color).drawRect(this.size / 2, this.size / 2 - this.shapeWidth / 2, this.rectWidth, this.shapeWidth)
            .beginFill(this.color).drawRect(this.size / 2 - this.shapeWidth / 2, this.size / 2, this.shapeWidth, this.rectWidth)
    };

    prototype._drawStraightShape = function (shape) {
        shape.graphics
            .beginFill(this.color).drawRect(this.size / 2 - this.shapeWidth / 2, this.size / 2 - this.rectWidth, this.shapeWidth, this.rectWidth * 2);
    };

    prototype.changeColor = function (color) {
        this.color = color;
        this._initShape(this.shape);
    };

    prototype.resetShape = function (shapeType, rotation) {
        this.shapeType = shapeType;
        this.rotation = rotation;
        this._initShape(this.shape);
    };

    prototype.rotate = function ( lock, callback) {
        var self = this;
        if (lock){
            this.lock = true;
            
        }
        createjs.Tween.get(this)
            .to({rotation: (this.rotation + 90)}, config.myRotateAnimationDuration, createjs.Ease.sineInOut)
            .call(function () {
                self.rotation %= 360;
                self.lock = false;
                console.log("Unlocked");
                if (callback)
                    callback();
            })
    };


    return createjs.promote(Cell, "Container");
});