let async = require('async');
let SanPhamTonKho = require('../sanphamtonkho/model');

module.exports.preSave = function(next) {

    if(!this.isNew) {

        // update 'tongTien' according to new 'thueVAT'
        let tongTien = this.tongTien;
        let _old = tongTien / (1 + (this._thueVAT === undefined ? this.thueVAT : this._thueVAT)/100);
        let _new = _old * (1 + this.thueVAT/100);
        this.tongTien = _new;

        // update 'duNo' according to new 'thanhToan'
        this.duNo = this.tongTien - this.thanhToan;
    }
    next();
};

module.exports.postRemove = function(doc, next) {
    let DonHangChiTiet = require('../donhangchitiet/model');
    async.waterfall([
        callback => DonHangChiTiet.find({refId: doc._id}, 'maSP soLuongXuat').exec(callback),
        (items, callback) => {
            let serialFunc = items.map( item => {
                return (cb) => {
                    SanPhamTonKho.findOne({maSP: item.maSP}, function(err, sanphamtonkho) {
                        sanphamtonkho.soLuong += item.soLuongXuat;
                        sanphamtonkho.save(cb);
                    });
                }
            });
            async.series(serialFunc, function(err, results){
                callback(err);
            });
        },
        callback => DonHangChiTiet.remove({refId: doc._id}, callback) // Model.remove will not trigger mongoose middleware
    ], function(err, result){
        if(err) next(err);
        next();
    });
};

