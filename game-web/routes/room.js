/**
 * Created by sam on 9/3/16.
 */

"use strict";
var express = require('express');
var route = express.Router();
var roomManager = require('../../game-facade').roomManager;
var logger = require('log4js').getLogger(module.filename);
var util = require('util');
logger.info('Mounting router for /room');

route.put('/', (req, res) => {

    req.checkBody({
        rows: {
            notEmpty: true,
            isInt: true,
            errorMessage: "Invalid argument rows"
        },
        cols: {
            notEmpty: true,
            isInt: true,
            errorMessage: "Invalid argument cols"
        },
        alias: {
            notEmpty: true,
            isLength: {
                options: [{min: 4, max:20}]
            },
            errorMessage: "Invalid argument alias"
        },
        strategy: {
            notEmpty: true
        }
    });

    var err = req.validationErrors();
    if (err){
        return res.status(400).json({
            status: "ILLEGAL_ARGUMENTS",
            message: err
        })
    }

    roomManager.addRoom(req.body);
    return res.status(200).json({
        status: "OK"
    });
});


route.get('/test', (req, res) => {
    logger.info('Requested socket integration test page');
    res.render('socket-integration-test-page');
});


route.get('/test/reset', (req, res) => {
    logger.info("Resetting socket integration test")
    roomManager.removeRoom('test');
    roomManager.setupTestRoom();
    res.status(200).send();

})

module.exports = route;