/*var _ = require('lodash');
var logger = require('../../util/logger');*/

var createDoc = function(model, item) {
    return new Promise(function(resolve, reject) {
        new model(item).save(function(err, saved) {
            return err ? reject(err) : resolve(saved);
        });
    });
};

module.exports = createDoc;