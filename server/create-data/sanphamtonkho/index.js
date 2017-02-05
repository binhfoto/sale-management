let MODEL_NAME = 'sanphamtonkho';

let _ = require('lodash');
let async = require('async');
let logger = require('../../util/logger');
let random = require('../../util/random');

let createDoc = require('../util/createDocument');
let model = require('../../api/' + MODEL_NAME + '/model');

let create = function(params) {
    
    logger.log('Mongo - Creating', params.sanphams.length, MODEL_NAME + '(s)');
    
    let promises = params.sanphams.map(function(item, i){
        return new Promise(function(resolve, reject){
            model.findOneAndUpdate({maSP: item._id}, {soLuong: random(100, 500)}, function(err, saved){
                return err ? reject(err) : resolve(saved);
            });
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