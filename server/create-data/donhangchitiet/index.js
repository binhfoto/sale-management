'use strict'
var MODEL_NAME = 'donhangchitiet';

var _ = require('lodash');
var async = require('async');
var logger = require('../../util/logger');
var random = require('../../util/random');

var model = require('../../api/' + MODEL_NAME + '/model');

var create = function(params) {
    
    var data = [];
    var donhangs = params.donhangs;
    var sanphams = params.sanphams;
    var sanphamtonkhos = params.sanphamtonkhos;

    logger.log('Mongo - Creating', donhangs.length * 10, MODEL_NAME + '(s)');
    
    for(let i=0; i<donhangs.length; i++) {
        
        let maDH = donhangs[i].maDH;
        let refId = donhangs[i]._id;

        for(let j=0; j<10; j++){

            let maSP = sanphams[j]._id;
            let soLuongXuat = random(20, sanphamtonkhos[j].soLuong);
            let xuatXuLy = random(0, Math.round(soLuongXuat/2));
            let chietKhau = 10;
            let thanhTien = sanphams[j].donGia * (soLuongXuat - xuatXuLy);
            thanhTien -= thanhTien*chietKhau/100;

            data.push({
                maDH,
                refId,
                maSP,
                soLuongXuat,
                xuatXuLy,
                chietKhau,
                thanhTien
            });
        }
    }
    
    let serialFunc = data.map(item => {
        return (callback) => {
            new model(item).save(callback);
        };
    });

    /* Run the functions in the tasks collection in series, each one running once the previous function has completed. 
    If any functions in the series pass an error to its callback, no more functions are run, 
    and callback is immediately called with the value of the error. 
    Otherwise, callback receives an array of results when tasks have completed.*/
    async.series(serialFunc, function(err, results) {
        return _.merge({donhangchitiets: results}, params || {});
    });
};

module.exports = {
    create: create,
    model: model
};

