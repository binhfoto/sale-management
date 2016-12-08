var _ = require('lodash');

// default config object for our api
var config = {
    // just placing the name of our possible NDOE_ENV values for later
    // depend on what env we are in, corresponding env file will be loaded (development.js || testing.js || production.js)
    dev: 'development', // same name as development.js
    test: 'tesing', // same name as testing.js
    prod: 'production', // same name as production.js 
    url: process.env.SERVER_URI || 'http://localhost:3000',
    port: process.env.PORT || 3000,
    // 10 days in minute
    expireTime: 24*60*10,
    secrets: {
        jwt: process.env.JWT || 'gumball'
    } 
};

// check to see if the NODE_ENV was set, if not, then set it to dev
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

// set config.env to whatever the NODE_ENV is
config.env = process.env.NODE_ENV;

var envConfig;
try{
    envConfig = require('./' + config.env);
    envConfig = envConfig || {}; 
}catch (err){
    envConfig = {};
}

module.exports = _.merge(config, envConfig);