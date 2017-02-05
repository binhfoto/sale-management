let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let middleware = require('./middleware');
let _super = require('../abstract/model');

let _schema = new Schema({
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

_schema.post('save', middleware.postSave);

_super(_schema);

module.exports = mongoose.model('sanpham', _schema);