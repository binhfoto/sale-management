var MODEL_NAME = 'sanpham';

var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var logger = require('../../util/logger');

var content = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
var data = JSON.parse(content);

var createDoc = require('../util/createDocument');
var model = require('../../api/' + MODEL_NAME + '/model');

var create = function(params) {
    
    logger.log('Mongo - Creating', data.length, MODEL_NAME + '(s)');
    
    var promises = data.map(function(item){
        return createDoc(model, item);
    });

    return Promise.all(promises)
        .then(function(items) {
            return _.merge({sanphams: items}, params || {});
        });
}

module.exports = {
    create: create,
    model: model
};