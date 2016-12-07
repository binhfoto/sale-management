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

// Duplicate the ID field.
spTonKhoSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
spTonKhoSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('sanphamtonkho', spTonKhoSchema);
