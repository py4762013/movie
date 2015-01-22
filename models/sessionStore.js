var mongoose = require('mongoose'),
    express = require('express'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    sessionStore = new MongoStore({ mongooseConnection: mongoose.connection });
module.exports = sessionStore;
