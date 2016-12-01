var MODEL_NAME = 'sanphamnhap';

var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var logger = require('../../util/logger');
var random = require('../../util/random');

var createDoc = require('../util/createDocument');
var model = require('../../api/' + MODEL_NAME + '/model');

var create = function(params) {
    
    logger.log('Mongo - Creating', 10, MODEL_NAME + '(s)');

    var min = 0;
    var max = params.sanphams.length-1;

    var data = [];
    for(var i=0; i<10; i++){
        var randomIndex = random(min, max);
        data.push({
            "maSP": params.sanphams[randomIndex]._id,
            "soLuongNhap": random(100, 1000),
            "maPhieuNhap": '47/11'
        });
    }

    var promises = data.map(function(item){
        return createDoc(model, item);
    });

    return Promise.all(promises)
        .then(function(items) {
            return _.merge({sanphamnhaps: items}, params || {});
        });
};

module.exports = {
    create: create,
    model: model
};

