let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let _super = require('../abstract/model');
let middleware = require('./middleware');

let _schema = new Schema({
    // mã đơn hàng
    maDH: {
        type: String,
        required: true,
        unique: true
    },
    // ngày tạo đơn hàng
    ngayTaoDH: {
        type: Date,
        default: Date.now
    },
    // mã khách hàng
    maKH: {
        type: Schema.Types.ObjectId,
        ref: 'khachhang',
        required: true
    },

    thueVAT: { // thuế VAT
        type: Number,
        default: 0,
        set: function (thueVAT){
            this._thueVAT = this.thueVAT;
            return thueVAT;
        }
    },
    tongTien: { // tổng tiền
        type: Number,
        default: 0
    },
    thanhToan: { // thanh toán
        type: Number,
        default: 0
    }, 
    duNo: { //dư nợ
        type: Number,
        default: 0
    }
});

_schema.pre('save', middleware.preSave);
_schema.post('remove', middleware.postRemove);

_super(_schema);

module.exports = mongoose.model('donhang', _schema);
