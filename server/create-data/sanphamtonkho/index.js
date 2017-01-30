var MODEL_NAME = 'sanphamtonkho';

var _ = require('lodash');
var path = require('path');
var logger = require('../../util/logger');
var random = require('../../util/random');

var createDoc = require('../util/createDocument');
var model = require('../../api/' + MODEL_NAME + '/model');

var create = function(params) {
    
    logger.log('Mongo - Creating', params.sanphams.length, MODEL_NAME + '(s)');

    var promises = params.sanphams.map(function(item, i){
        return createDoc(model, {
            maSP: item._id,
            soLuong: random(100, 500)
        });
    });

    return Promise.all(promises)
        .then(function(items) {
            return _.merge({sanphamtonkhos: items}, params || {});
        });
}

module.exports = {
    create: create,
    model: model
};