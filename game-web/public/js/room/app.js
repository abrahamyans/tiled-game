/**
 * Created by sam on 9/17/16.
 */

"use strict";

requirejs.config({
    "baseUrl": "/js/room/",
    "paths": {
        "jquery": "https://code.jquery.com/jquery-3.1.0",
        "page-controller": "page-controller"
    },
    "shim": {
        "page-controller": ["jquery"]
    }
});

require([
    "page-controller"
]);