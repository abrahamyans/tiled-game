/**
 * Created by sam on 9/13/16.
 */

"use strict";

define([ 'event-emitter'], function(eventEmitter){

    function notEmpty(param){
        if (param == undefined || param == null)
            throw new Error("Invalid empty argument");
        return param;
    }

    function Cell(properties) {
        this.row = notEmpty(properties.row);
        this.col = notEmpty(properties.col);
        this.shapeId = notEmpty(properties.shapeId);
        this.shapeWidth = notEmpty(properties.shapeWidth);
        this.color = notEmpty(properties.color);
        this.size = notEmpty(properties.size);
        this.on("click", function(){
            eventEmitter.emit('click', {row: this.row, col: this.col});
        });
    }

    var prototype = createjs.extend(Cell, createjs.Container);

    prototype.draw = function () {
        this.Container_draw();
    };



    return createjs.promote(Cell, "Container");
});