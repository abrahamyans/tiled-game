/**
 * Created by sam on 9/3/16.
 */

"use strict";
var express = require('express');
var route = express.Router();
var roomManager = require('../../game-rooms').roomManager;
var logger = require('log4js').getAppLogger(module.filename);
var util = require('util');
logger.info('Mounting router for /room');

route.post('/', (req, res) => {

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
        alias: req.body.alias
    });
});




route.get('/*', (req, res) => {
    res.render('game');
});




module.exports = route;