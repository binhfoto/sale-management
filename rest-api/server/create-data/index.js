var logger = require('../util/logger');

var user = require('./user');
var khachhang = require('./khachhang');
var sanpham = require('./sanpham');
var sanphamtonkho = require('./sanphamtonkho');
var sanphamnhap = require('./sanphamnhap');

var MODELS = [user.model, khachhang.model, sanpham.model, sanphamtonkho.model, sanphamnhap.model];

var cleanDB = function(){
    var cleanPromises = MODELS.map(function(model){
        return model.remove().exec();
    });
    return Promise.all(cleanPromises);
};

cleanDB() // pass data to next function
    .then(user.create)
    .then(khachhang.create)
    .then(sanpham.create)
    .then(sanphamtonkho.create)
    .then(sanphamnhap.create)
    .then(logger.log.bind(logger))
    .catch(function(err){
        logger.log(err);
    });