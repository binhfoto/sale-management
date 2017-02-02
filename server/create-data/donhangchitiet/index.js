'use strict'
var MODEL_NAME = 'donhangchitiet';

var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');
var logger = require('../../util/logger');
var random = require('../../util/random');

var model = require('../../api/' + MODEL_NAME + '/model');

var getRefId = (donhang) => {
    
    let _id = donhang._id.toString();
    let refId = new mongoose.mongo.ObjectID(_id);
    
    refId._id = _id;
    refId.duNo = donhang.duNo;
    refId.maDH = donhang.maDH;
    refId.maKH = donhang.maKH.toString();
    refId.ngayTaoDH = donhang.ngayTaoDH;
    refId.thanhToan = donhang.thanhToan;
    refId.thueVAT = donhang.thueVAT;
    refId.tongTien = donhang.tongTien;

    return refId;
};

var getMaSP = (sanpham) => {
    
    let _id = sanpham._id.toString();
    let maSP = new mongoose.mongo.ObjectID(sanpham._id.toString());

    maSP._id = _id;
    maSP.donVi = sanpham.donVi;
    maSP.donGia = sanpham.donGia;
    maSP.quyCach = sanpham.quyCach;
    maSP.maSP = sanpham.maSP;
    maSP.nhom = sanpham.nhom;
    maSP.ten = sanpham.ten;

    return maSP;
}

var create = function(params) {
    
    var data = [];
    var donhangs = params.donhangs;
    var sanphams = params.sanphams;
    var sanphamtonkhos = params.sanphamtonkhos;

    logger.log('Mongo - Creating', donhangs.length * 10, MODEL_NAME + '(s)');
    
    for(let i=0; i<donhangs.length; i++) {
        
        let maDH = donhangs[i].maDH;
        let refId = getRefId(donhangs[i]);

        for(let j=0; j<10; j++) {

            let maSP = getMaSP(sanphams[j]);
            let soLuongXuat = random(10, sanphamtonkhos[j].soLuong);
            let xuatXuLy = random(0, Math.round(soLuongXuat/2));
            let chietKhau = 10;
            let thanhTien = 0;
            /*let thanhTien = sanphams[j].donGia * (soLuongXuat - xuatXuLy);
            thanhTien -= thanhTien*chietKhau/100;*/

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

