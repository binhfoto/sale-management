var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SanPhamTonKho = require('../sanphamtonkho/model');

var sanphamnhap = new Schema({
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

sanphamnhap.pre('save', function(next) {
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

// Duplicate the ID field.
sanphamnhap.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
sanphamnhap.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('sanphamnhap', sanphamnhap);