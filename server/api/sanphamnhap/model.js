var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SanPhamTonKho = require('../sanphamtonkho/model');
var _super = require('../abstract/model');

var _schema = new Schema({
    maSP: {
        type: Schema.Types.ObjectId,
        ref: 'sanpham',
        required: true
    },
    soLuongNhap: {
        type: Number,
        required: true
    },
    maPhieuNhap: String,
    ngayNhap: {
        type: Date,
        default: Date.now
    }
});

_schema.pre('save', function(next) {
    var maSP = this.maSP;
    var soLuongNhap = this.soLuongNhap;

    SanPhamTonKho.findOne({maSP: maSP}, function(err, item) {
        if(err) next(err);
        else {
            item.soLuong += soLuongNhap;
            item.save(function(err, item) {
                if(err) next(err);
                next();
            });
        }
    });
});

_super(_schema);

module.exports = mongoose.model('sanphamnhap', _schema);