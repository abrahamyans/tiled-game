/**
 * Created by sam on 9/3/16.
 */

"use strict";
var express = require('express');
var route = express.Router();
var roomManager = require('../../game-socket').roomManager;
var logger = require('log4js').getLogger(module.filename);
var validator = require('express-validator');
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
        }
    });

    var err = req.validationErrors();
    if (err){
        return res.status(400).json({
            status: "ILLEGAL_ARGUMENTS",
            message: err
        })
    }

    res.status(200).json({
        message: "OPK"
    });

});


module.exports = route;