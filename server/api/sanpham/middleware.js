let SanPhamTonKho = require('../sanphamtonkho/model');

module.exports.postSave = function(doc, next) {
    SanPhamTonKho.create({maSP: doc._id}, function(err, item) {
        if(err) next(err);
        next();
    });
};