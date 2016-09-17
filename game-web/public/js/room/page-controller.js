/**
 * Created by sam on 9/17/16.
 */

"use strict";


define(["jquery"], function ($) {

    $("#submit").on("click", function () {
        var request = {
            rows: parseInt($("#rows").val()),
            cols: parseInt($("#cols").val()),
            strategy: "simple",
            alias: $("#name").val()
        };

        $.post("/room", request)
            .done(function (data) {
                console.log(data);
                var url = $("#url");
                url.prop("href", window.location.origin + "/room/" + data.alias);
                url.append("Click here to start playing");
            })
    });


});