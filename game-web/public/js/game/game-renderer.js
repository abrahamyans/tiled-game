/**
 * Created by sam on 9/12/16.
 */

"use strict";

define(['event-emitter', 'create'], function (eventEmitter, create) {








    eventEmitter.subscribe('render-turn');
    eventEmitter.subscribe('render-add');
    eventEmitter.subscribe('render-init');
});