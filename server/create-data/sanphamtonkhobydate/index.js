var MODEL_NAME = 'sanphamtonkhobydate';

var _ = require('lodash');
var moment = require('moment');
var logger = require('../../util/logger');

var createDoc = require('../util/createDocument');
var model = require('../../api/' + MODEL_NAME + '/model');

var create = function(params) {
    
    logger.log('Mongo - Creating', params.sanphamtonkhos.length, MODEL_NAME + '(s)');

    var promises = params.sanphamtonkhos.map(function(item, i){
        var newItem = {};
        newItem.maSP = item.maSP;
        newItem.soLuong = item.soLuong;
        newItem.ngay = moment().subtract(1, 'days').toDate();
        return createDoc(model, newItem);
    });

    return Promise.all(promises)
        .then(function(items) {
            return _.merge({sanphamtonkhobydates: items}, params || {});
        });
}

module.exports = {
    create: create,
    model: model
};