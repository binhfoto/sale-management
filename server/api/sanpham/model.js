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
    donVi: String,
    donGia: Number,
    nhom: String
});

// Duplicate the ID field.
sanphamSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
sanphamSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('sanpham', sanphamSchema);