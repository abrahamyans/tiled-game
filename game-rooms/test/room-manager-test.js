/**
 * Created by Samvel Abrahamyan on 9/1/16.
 */

"use strict";
var chai = require('chai');
var roomManager = require('../main/room-manager');
describe('room-manager-test', () => {
     
    it('should add room', () => {
        roomManager.addRoom({
            rows: 10, 
            cols: 20,
            strategy: "simple"
        });

    })
    
});