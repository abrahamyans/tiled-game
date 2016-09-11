/**
 * Created by sam on 9/9/16.
 */

"use strict";

define(function(){

    var events = {};

    function validate(ev, listener){
        if (typeof ev !== 'string')
            throw new Error("Event handle should be string");

        if (typeof listener !== 'function')
            throw new Error("The listener should be a function");
    }

    return {
        subscribe: function (ev, listener) {
            validate(ev, listener);

            if (!events[ev])
                events[ev] = [];
            events[ev].push(listener);
        },
        
        unsubscribe: function (ev, listener) {
            validate(ev, listener);

            events[ev] = events[ev].reduce(function(result, value){
                if (value !== listener)
                    result.push(value);
            }, []);
        },

        emit: function(ev, data, required){
            if (required === true && !events.hasOwnProperty(ev) && events[ev].length >= 1)
                throw new Error("There is no listener for event " + ev);

            events[ev].forEach(function(listener, i){
               listener(data);
            });

        }
    }

});