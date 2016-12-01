var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spTonKhoSchema = new Schema({
    maSP: {
        type: Schema.Types.ObjectId,
        ref: 'sanpham',
        required: true
    },
    soLuong: Number /* ton kho */
});

module.exports = mongoose.model('sanphamtonkho', spTonKhoSchema);
