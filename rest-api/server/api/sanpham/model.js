var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sanphamSchema = new Schema({
    maSP: {
        type: String,
        unique: true
    },
    ten: {
        type: String,
        required: true
    },
    quyCach: String,
    donVi: Number,
    donGia: Number
});

module.exports = mongoose.model('sanpham', sanphamSchema);