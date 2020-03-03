var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

// Start producer/consumer processes on startup
require('./consumers/metricItem.consumer');
require('./producers/generic.producer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Establish an initial MongoDB connection
mongoose.connect(dbConfig[process.env.NODE_ENV].url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err) {
    const shouldLog = process.env.NODE_ENV === 'development';
    if (err) {
        if (shouldLog) console.log(`Unable to initialize or connect to MongoDB: ${err}`);
        process.exit(1);
    } else {
        if (shouldLog) console.log('MongoDB successfully initialized and connected.');
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
