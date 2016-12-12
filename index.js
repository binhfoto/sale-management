
// entry point for our server

// setup config right before anything by requiring it
var config = require('./server/config/config');
var server = require('./server/server');

// logger is a wrapper around console.log that adds color
// and logs JSON objects and can be conditionally turned off
// so you don't have to erase all calls to it
var logger = require('./server/util/logger');

// start server
console.log(`Server is listened on port ${config.port}`);
server.listen(config.port);

module.exports = server