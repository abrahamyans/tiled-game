/**
 * Created by Samvel Abrahamyan on 9/1/16.
 */

"use strict";
var chance = require('chance');

module.exports = (range, container, maxTries) => {
    
    if (!maxTries)
        maxTries = range.max - range.min;
    
    do{
        if (--maxTries < 0)
            throw new Error("No empty id found");
        
        var id = chance.integer(range);    
    }while(container[id]);
    
    return id;
};