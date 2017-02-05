var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _super = require('../abstract/model');

var _schema = new Schema({
    maSP: {
        type: Schema.Types.ObjectId,
        ref: 'sanpham',
        required: true,
        unique: true
    },
    soLuong: { /* ton kho */
        type: Number,
        default: 0
    }
});

_super(_schema);

module.exports = mongoose.model('sanphamtonkho', _schema);
