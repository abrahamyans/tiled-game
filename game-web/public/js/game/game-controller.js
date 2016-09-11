/**
 * Created by sam on 9/11/16.
 */

"use strict";

define(['event-emitter'], function(eventEmitter){
    console.log("Loaded game-controller");
    eventEmitter.emit('add');
    eventEmitter.subscribe('added', function(data){ console.log(data) });

});