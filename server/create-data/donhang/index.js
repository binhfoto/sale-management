var MODEL_NAME = 'donhang';

var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var logger = require('../../util/logger');
var random = require('../../util/random');

var createDoc = require('../util/createDocument');
var model = require('../../api/' + MODEL_NAME + '/model');

var create = function(params) {
    
    var khachhangs = params.khachhangs;
    var sanphams = params.sanphams;

    var data = [];
    for(let i=0; i<20; i++){
        
        let now = Date.now();
        let maKH = khachhangs[random(0, khachhangs.length-1)];

        data.push({
            maDH: model.getNextId(),
            ngayTaoDH: now,
            maKH: maKH,
            sanpham: createProduct(sanphams),
            thueVAT: 10, // thuế VAT
            tongTien: 100000, // tổng tiền
            thanhToan: 100000, // thanh toán
            duNo: 100000 //dư nợ
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

var createProduct = function(sanphams) {
    var number = random(1, sanphams.length-1);
    var results = [];

    for(let i=0; i<number; i++){
        results.push({
            maSP: sanphams[random(0, sanphams.length-1)],
            soLuongXuat: random(100, 1000),
            xuatXuLy: random(5, 20),
            chietKhau: random(5, 10),
            thanhTien: 1000000
        });
    }

    return results;
}

module.exports = {
    create: create,
    model: model
};

