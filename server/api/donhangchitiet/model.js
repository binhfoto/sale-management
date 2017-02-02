var async = require('async');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DonHang = require('../donhang/model');
var SanPhamTonKho = require('../sanphamtonkho/model');
var _super = require('../abstract/model');
var logger = require('../../util/logger');

var _schema = new Schema({
    // mã đơn hàng
    maDH: {
        type: String,
        required: true
    },
    refId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'donhang'
    },
    maSP: {
        type: Schema.Types.ObjectId,
        ref: 'sanpham',
        required: true
    },
    soLuongXuat: {
        type: Number,
        required: true,
        set: function(soLuongXuat){
            this._soLuongXuat = this.soLuongXuat;
            return soLuongXuat;
        }
    },
    xuatXuLy: Number,
    chietKhau: Number,
    thanhTien: Number
});

/*
Update: 
    - 'soLuong' in 'sanphamtonkho'
*/
_schema.pre('save', function(next) {
    
    let self = this;
    /*if(self.chietKhau > 100) {
        next(new Error(`Lỗi: Chiết khấu '${self.chietKhau}' lớn hơn 100`));
    }
    if(self.xuatXuLy > self.soLuongXuat) {
        next(new Error(`Lỗi: Số lượng xuất xử lý '${self.xuatXuLy}' lớn hơn số lượng xuất '${self.soLuongXuat}'`));
    }*/
    
    async.waterfall([
        callback => {
            SanPhamTonKho.findOne({maSP: self.maSP._id}, callback);
        },
        (sanPhamTonKho, callback) => {
            
            let soLuongTon = 0;
            
            if(self.isNew) { // create
                soLuongTon = sanPhamTonKho.soLuong;
            } else { // edit
                soLuongTon = sanPhamTonKho.soLuong + (self._soLuongXuat || self.soLuongXuat);
            }

            if(soLuongTon >= self.soLuongXuat){
                sanPhamTonKho.soLuong = soLuongTon - self.soLuongXuat;
                callback(null, sanPhamTonKho);
            }else {
                callback(new Error(`Lỗi: Số lượng xuất '${self.soLuongXuat}' lớn hơn số lượng đang có trong kho '${soLuongTon}'`));
            }
        },
        (sanPhamTonKho, callback) => {
            sanPhamTonKho.save(callback);
        }
    ], function(err, result){
        if(err) next(err);
        next();
    });    
});


/*
Update:
    - 'thanhTien' in 'donhangchitiet'
    - 'tongTien' in 'donhang'
*/
_schema.pre('save', function(next) {
    let self = this;

    let donHang = self.refId;
    let sanPham = self.maSP;

    let cur_thanhTien = self.thanhTien;
    let new_thanhTien = sanPham.donGia * (self.soLuongXuat - self.xuatXuLy);
    new_thanhTien -= new_thanhTien*self.chietKhau/100;
    self.thanhTien = new_thanhTien;

    let tongTien = donHang.tongTien;
    if(tongTien >= cur_thanhTien)
        tongTien -= cur_thanhTien * (1 + donHang.thueVAT/100); // subtract old value
    tongTien += new_thanhTien * (1 + donHang.thueVAT/100); // add new value
    donHang.tongTien = tongTien;

    async.waterfall([
        callback => {
            DonHang.update({_id: donHang._id}, {tongTien: donHang.tongTien}, callback);
        }
    ], function(err, result){
        if(err) next(err);
        next();
    });

});

_schema.post('remove', function(next) {

    console.log('DonHangChiTiet Remove', this);
    //next();
});

_super(_schema);

module.exports = mongoose.model('donhangchitiet', _schema);
