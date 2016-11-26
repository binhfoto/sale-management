//(function (exports, require, module, __filename, __dirname) {});

var express = require('express');
var app = express();
var config = require('./config/config');
var logger = require('./util/logger');
var mongoose = require('mongoose');

// 
mongoose.connect(config.db.url);
if(config.seed){
    require('./util/seed');
}

// setup the global middleware 
var globalMiddleware = require('./middleware/applicationMiddleware');
globalMiddleware(app);

// api router
var api = require('./api');
var auth = require('./auth/route');
// setup the api
app.use('/api', api);
app.use('/auth', auth);

// error handler
app.use(function(err, req, res, next){
    if(err.name === 'UnauthorizedError'){
        res.status(401).send('Invalid token');
        return;
    }
    
    logger.log(err);
    res.status(err.status || 500).send(err.message);
});

//export the app
module.exports = app;