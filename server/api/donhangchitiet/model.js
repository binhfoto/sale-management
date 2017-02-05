let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let _super = require('../abstract/model');
let middleware = require('./middleware');
let logger = require('../../util/logger');

let _schema = new Schema({
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
            this._soLuongXuat = this.soLuongXuat; // save previous value for later use
            return soLuongXuat;
        }
    },
    xuatXuLy: Number,
    chietKhau: Number,
    thanhTien: {
        type: Number,
        set: function(thanhTien){
            this._thanhTien = this.thanhTien; // save previous value for later use
            return thanhTien;
        }
    }
});

_schema.pre('save', middleware.preSave01);
_schema.pre('save', middleware.preSave02);
_schema.pre('remove', middleware.preRemove01);
_schema.pre('remove', middleware.preRemove02);

_super(_schema);

module.exports = mongoose.model('donhangchitiet', _schema);
