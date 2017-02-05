let async = require('async');

let DonHang = require('../donhang/model');
let SanPhamTonKho = require('../sanphamtonkho/model');

const reCalculateTongTien = (donHang, {cur_thanhTien, new_thanhTien}, callback) => {
    let tongTien = donHang.tongTien;
    if(tongTien >= cur_thanhTien)
        tongTien -= cur_thanhTien * (1 + donHang.thueVAT/100); // subtract old value
    tongTien += new_thanhTien * (1 + donHang.thueVAT/100); // add new value
    donHang.tongTien = tongTien;

    callback(null, donHang);
}

const updateDonHang = (donHang, callback) => {

    DonHang.findById(donHang._id, function(err, item){
        if(err) callback(err);
        item.tongTien = donHang.tongTien;
        item.save(callback);
    });

    /*DonHang.update({
        _id: donHang._id
    }, {
        tongTien: donHang.tongTien
    }, 
    callback);*/
};

/*
    Update: 
        - decrease 'soLuong' in 'sanphamtonkho'
*/
module.exports.preSave01 = function(next) {
    
    let self = this;
    
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
};

/*
    Update:
        - 'thanhTien' in 'donhangchitiet'
        - 'tongTien' in 'donhang'
*/
module.exports.preSave02 = function(next) {

    let self = this;

    async.waterfall([
        callback => {
            let sanPham = self.maSP;
            let cur_thanhTien = self.thanhTien;
            let new_thanhTien = sanPham.donGia * (self.soLuongXuat - self.xuatXuLy);
            new_thanhTien -= new_thanhTien*self.chietKhau/100;
            self.thanhTien = new_thanhTien;

            callback(null, self.refId, {cur_thanhTien, new_thanhTien});
        },
        reCalculateTongTien,
        updateDonHang
    ], function(err, result){
        if(err) next(err);
        next();
    });
};

/*
    Update:
        - 'tongTien' in 'donhang'
*/
module.exports.preRemove01 = function(next) {
    let self = this;
    async.waterfall([
        callback => callback(null, self.refId, {cur_thanhTien: self.thanhTien, new_thanhTien: 0}),
        reCalculateTongTien,
        updateDonHang        
    ], function(err, result) {
        if(err) next(err);
        next();
    })
};

/*
    Update:
        - increase 'soLuong' in 'sanphamtonkho'
*/
module.exports.preRemove02 = function(next) {
    let self = this;
    
    async.waterfall([
        callback => {
            SanPhamTonKho.findOne({maSP: self.maSP._id}, callback);
        },
        (sanPhamTonKho, callback) => {
            sanPhamTonKho.soLuong += self.soLuongXuat;
            callback(null, sanPhamTonKho);
        },
        (sanPhamTonKho, callback) => {
            sanPhamTonKho.save(callback);
        }
    ], function(err, result){
        if(err) next(err);
        next();
    });
}