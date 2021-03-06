//(function (exports, require, module, __filename, __dirname) {});

var express = require('express');
var app = express();
var config = require('./config/config');
var logger = require('./util/logger');
var mongoose = require('mongoose');

/*
cd home/new-path/project/sale-management/
cd /Users/binhnguyen/home/new-path/tool/mongodb-osx-x86_64-3.2.11/bin
./mongod --dbpath data/db
*/
mongoose.Promise = global.Promise;
mongoose.connect(config.db.url);
if(config.seed){
    //require('./util/seed');
    require('./create-data');
}


// setup schedule
require('./schedule');

// setup the global middleware 
var globalMiddleware = require('./middleware/applicationMiddleware');
globalMiddleware(app);


// api router
var api = require('./api');
var auth = require('./auth/route');
// setup the api
app.use('/api', api);
app.use('/auth', auth);


// public resource
app.use('/', express.static(__dirname + '/../public'));
app.use('/icon', express.static(__dirname + '/../public/icon'));
app.use('/dist', express.static(__dirname + '/../dist'));


// error handler
app.use(function(err, req, res, next){
    if(err.name === 'UnauthorizedError'){
        res.status(401).send('Invalid token');
        return;
    }
    
    logger.log(err);
    res.status(err.status || 500).send({ message: err.message });
});

// Handles all routes so you do not get a not found error
// https://scotch.io/tutorials/routing-react-apps-the-complete-guide
/*app.get('*', function (req, res){
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
})*/

//export the app
module.exports = app;