'use strict'
var MODEL_NAME = 'donhang';

var _ = require('lodash');
var moment = require('moment');
var logger = require('../../util/logger');
var random = require('../../util/random');
var generateDonHangId = require('../../util/common').generateDonHangId;

var createDoc = require('../util/createDocument');
var model = require('../../api/' + MODEL_NAME + '/model');

var createNgayTaoDH = (number) => {
    let subtractNumber = 0;
    if(number%2 == 0) {
        subtractNumber = 0;
    }else if(number%3 == 0) {
        subtractNumber = 1;
    }else {
        subtractNumber = 2;
    }
    return moment().subtract(subtractNumber, 'days').toDate();
};

var create = function(params) {
    
    logger.log('Mongo - Creating', params.khachhangs.length, MODEL_NAME + '(s)');

    var khachhangs = params.khachhangs;
    var sanphamtonkhos = params.sanphamtonkhos;

    var data = [];
    
    for(let i=0; i<params.khachhangs.length; i++) {
        let ngayTaoDH = createNgayTaoDH(i);
        let maDH = generateDonHangId(ngayTaoDH);
        let maKH = khachhangs[i]._id;
        let thueVAT = 10;

        data.push({
            maDH,
            ngayTaoDH,
            maKH,
            thueVAT // thuế VAT
        })
    }
    
    var promises = data.map(function(item){
        return createDoc(model, item);
    });

    return Promise.all(promises)
        .then(function(items) {
            return _.merge({donhangs: items}, params || {});
        });
};

module.exports = {
    create: create,
    model: model
};

