var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var logger = require('log4js').getLogger(__filename);
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
var bodyParser = require('body-parser');

logger.info("Initializing the express app");

var app = express();

//Pipe morgan to log4js
var httpLogger = morgan("dev", {
    stream: {
        write: str => logger.debug(str.replace('\n', ''))
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(httpLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/room', require('./routes/room'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace

function getStatus(status){
    switch (status){
        case 404: return "NOT_FOUND";
        case 500: return "SERVER_ERROR";
        default: return "UNKNOWN_ERROR"
    }

}

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        logger.error(err.message);
        res.json({
            message: err.message,
            status: getStatus(res.statusCode)
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});


module.exports = app;
