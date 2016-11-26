var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var khachhangSchema = new Schema({
    maKH: {
        type: String,
        unique: true
    },
    ten: {
        type: String,
        required: true
    },
    diaChi: String,
    soDienThoai: String
});

module.exports = mongoose.model('khachhang', khachhangSchema);