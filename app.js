var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var settings = require('./settings');
var session = require('express-session');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
//var sessionStore = require('./models/sessionStore');
//var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var movie = require('./routes/movie');

var sessionStore = new MongoStore({
    //url: "mongodb://localhost/session",
    url: "mongodb://usession:psession@localhost/session",
    //interval: 120000
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// sesssion
/*app.use(session({
    secret: settings.cookieSecret,
    key: settings.db,
    cookie: { maxAge: 1000 * 60 * 60 * 24 *30 },
    store: new MongoStore({
        db: settings.db,
        host: settings.host,
        port: settings.port
    })
}));*/
/*app.use(session({
    secret: settings.coolieSecret,
    key: settings.db,
    cookie: {  maxAge: 1000 * 60 * 60 * 24 * 30 },
    store: new MongoStore({
        mongoose.connect('mongodb://localhost/movie')
    })
}));*/
app.use(session({
    secret: settings.cookieSecret,
    resave: false,
    saveUninitialized: true,
    key: settings.db,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30  },
    store: sessionStore
}));

// flash
app.use(flash());

app.use('/', routes);
app.use('/users', users);
app.use('/movie', movie);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
