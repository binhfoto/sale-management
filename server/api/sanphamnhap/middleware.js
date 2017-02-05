let async = require('async');
let SanPhamTonKho = require('../sanphamtonkho/model');

/*
    Update:
        - update 'soLuong' in 'sanphamtonkho'
*/
module.exports.preSave01 = function(next) {
    let maSP = this.maSP._id || this.maSP;
    let old_soLuongNhap = (this._soLuongNhap === undefined ? 0 : this._soLuongNhap);
    let soLuongNhap = this.soLuongNhap;

    async.waterfall([
        callback => SanPhamTonKho.findOne({maSP: maSP}, callback),
        (item, callback) => {
            item.soLuong -= old_soLuongNhap;
            item.soLuong += soLuongNhap;
            callback(null, item);
        },
        (item, callback) => item.save(callback)
    ], function(err, result){
        if(err) next(err);
        next();
    });
};

/*
    Update:
        - update 'soLuong' in 'sanphamtonkho'
*/
module.exports.preRemove01 = function(next) {
    let maSP = this.maSP._id || this.maSP;
    
    let soLuongNhap = this.soLuongNhap;

    async.waterfall([
        callback => SanPhamTonKho.findOne({maSP: maSP}, callback),
        (item, callback) => {
            item.soLuong -= soLuongNhap;
            callback(null, item);
        },
        (item, callback) => item.save(callback)
    ], function(err, result){
        if(err) next(err);
        next();
    });
};