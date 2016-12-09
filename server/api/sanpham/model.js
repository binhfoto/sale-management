var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _super = require('../abstract/model');

var _schema = new Schema({
    maSP: {
        type: String,
        unique: true
    },
    ten: {
        type: String,
        required: true
    },
    quyCach: String,
    donVi: String,
    donGia: Number,
    nhom: String
});

_super(_schema);

module.exports = mongoose.model('sanpham', _schema);