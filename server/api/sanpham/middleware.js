let SanPhamTonKho = require('../sanphamtonkho/model');

module.exports.postSave = function(doc, next) {
    SanPhamTonKho.create({maSP: doc._id}, function(err, item) {
        if(err) next(err);
        next();
    });
};

module.exports.preRemove = function(next) {
    SanPhamTonKho.findOne({maSP: this._id}, function(err, item) {
        if(err) next(err);

        if(item.soLuong > 0) {
            next(new Error(`Lỗi: Trong kho hàng vẫn còn ${item.soLuong} sản phẩm. Xoá lại khi số lượng bằng 0.`));
        }

        next();
    });
}