var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _super = require('../abstract/model');

var _schema = new Schema({
    ten: {
        type: String,
        required: true
    },
    diaChi: String,
    soDienThoai: String
});

_super(_schema);

module.exports = mongoose.model('khachhang', _schema);