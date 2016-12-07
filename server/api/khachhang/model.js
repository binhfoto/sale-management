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

// Duplicate the ID field.
khachhangSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
khachhangSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('khachhang', khachhangSchema);