/**
 * Created by sam on 9/12/16.
 */

"use strict";


define(function(){

    var dir = {
        up: {
            r: -1,
            c: 0,
            name: "Up"
        },
        right: {
            r: 0,
            c: 1,
            name: "Right"
        },
        bottom: {
            r: 1,
            c: 0,
            name: "Bottom"
        },
        left: {
            r: 0,
            c: -1,
            name: "Left"
        }
    };


    var shapes = {
        0: {
            rot: 1,
            con: [
                dir.right,
                dir.bottom
            ]
        },

        1: {
            rot: 2,
            con: [
                dir.bottom,
                dir.left
            ]
        },


        2: {
            rot: 3,
            con: [
                dir.left,
                dir.up
            ]
        },

        3: {
            rot: 0,
            con: [
                dir.up,
                dir.right
            ]
        },


        4: {
            rot: 5,
            con: [
                dir.up,
                dir.bottom
            ]
        },

        5: {
            rot: 4,
            con: [
                dir.right,
                dir.left
            ]
        }

    };

    return {
        dir: dir,
        shapes: shapes
    }
});

