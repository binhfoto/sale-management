var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var donhangSchema = new Schema({
    maDH: {
        type: String,
        required: true,
        unique: true
    },
    ngayTaoDH: {
        type: Date,
        default: Date.now
    },
    maKH: {
        type: Schema.Types.ObjectId,
        ref: 'khachang',
        required: true        
    },
    sanpham:[
        {
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
        }
    ],
    thueVAT: Number,
    tongTien: Number,
    thanhToan: Number,
    duNo: Number
});

module.exports = mongoose.model('donhang', donhangSchema);
