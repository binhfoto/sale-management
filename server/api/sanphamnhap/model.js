let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let middleware = require('./middleware')
let _super = require('../abstract/model');

let _schema = new Schema({
    maSP: {
        type: Schema.Types.ObjectId,
        ref: 'sanpham',
        required: true
    },
    soLuongNhap: {
        type: Number,
        required: true,
        set: function(soLuongNhap) {
            this._soLuongNhap = this.soLuongNhap;
            return soLuongNhap;
        }
    },
    maPhieuNhap: String,
    ngayNhap: {
        type: Date,
        default: Date.now
    }
});

_schema.pre('save', middleware.preSave01);
_schema.pre('remove', middleware.preRemove01);

_super(_schema);

module.exports = mongoose.model('sanphamnhap', _schema);