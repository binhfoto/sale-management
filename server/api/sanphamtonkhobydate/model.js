var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _super = require('../abstract/model');

// history table of sanphamtonkho
var _schema = new Schema({
    maSP: {
        type: Schema.Types.ObjectId,
        ref: 'sanpham',
        required: true
    },
    soLuong: Number,  /* ton kho */
    ngay: {
        type: Date,
        default: Date.now
    }
});

_super(_schema);

module.exports = mongoose.model('sanphamtonkhobydate', _schema);
