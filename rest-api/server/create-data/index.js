var logger = require('../util/logger');

var user = require('./user');
var khachhang = require('./khachhang');

var MODELS = [user.model, khachhang.model];

var cleanDB = function(){
    var cleanPromises = MODELS.map(function(model){
        return model.remove().exec();
    });
    return Promise.all(cleanPromises);
};

cleanDB() // pass data to next function
    .then(user.create) // input data is empty
    .then(khachhang.create)
    .then(logger.log.bind(logger))
    .catch(function(err){
        logger.log(err);
    });