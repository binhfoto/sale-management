var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('sanphamnhap', sanphamnhap);