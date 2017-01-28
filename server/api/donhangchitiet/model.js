var async = require('async');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DonHang = require('../donhang/model');
var SanPham = require('../sanpham/model');
var _super = require('../abstract/model');
var logger = require('../../util/logger');

var _schema = new Schema({
    // mã đơn hàng
    maDH: {
        selfId: {
            type: String,
            required: true
        },
        refId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'donhang'
        }
    },
    maSP: {
        type: Schema.Types.ObjectId,
        ref: 'sanpham',
        required: true
    },
    soLuongXuat: {
        type: Number,
        required: true
    },
    xuatXuLy: Number,
    chietKhau: Number,
    thanhTien: Number
});

_schema.pre('save', function(next) {
    let self = this;

    /* Runs the tasks array of functions in series, each passing their results to the next in the array. 
    However, if any of the tasks pass an error to their own callback, 
    the next function is not executed, and the main callback is immediately called with the error.*/
    async.waterfall([
        callback => {
            DonHang.findById(self.maDH.refId, callback);
        },
        (donHang, callback) => {
            let tongTien = donHang.tongTien;
            tongTien += self.thanhTien * (1 + donHang.thueVAT/100);
            donHang.tongTien = tongTien;
            callback(null, donHang);
        },
        (donHang, callback) => {
            donHang.save(callback);
        }
    ], function(err, result){
        if(err) next(err);
        next();
    });
});

_super(_schema);

module.exports = mongoose.model('donhangchitiet', _schema);
