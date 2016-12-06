var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var khachhangSchema = new Schema({
    ten: {
        type: String,
        required: true
    },
    diaChi: String,
    soDienThoai: String
});

module.exports = mongoose.model('khachhang', khachhangSchema);