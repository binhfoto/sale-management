var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _super = require('../abstract/model');

var _schema = new Schema({
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
        default: 0
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

_super(_schema);

var formatNumber = {
    "1": "000", // 0001
    "2": "00",  // 0020
    "3": "0",   // 0300
    "4": ""     // 4000
}

_schema.statics = {
    today: new Date(),
    number: 0,
    getNextId: function() {
        var curDate = new Date();
        if(curDate.getDate() != this.today.getDate()/* || curDate.getMonth() == today.getMonth() || curDate.getFullYear() == today.getFullYear()*/){
            this.number = 0;
            this.today = curDate;
        }
        this.number += 1;
        // HD0001/2/3/2016
        return 'HD' + formatNumber[('' + this.number).length] + this.number + '/' + this.today.getDate() + '/' + (this.today.getMonth() + 1) + '/' + this.today.getFullYear();
    }, 
    getIdByDate: function (numberOfReceipt, dateOfReceipt) {
        return 'HD' + formatNumber[('' + numberOfReceipt).length] + numberOfReceipt + '/' + dateOfReceipt.getDate() + '/' + (dateOfReceipt.getMonth() + 1) + '/' + dateOfReceipt.getFullYear();
    }
};


module.exports = mongoose.model('donhang', _schema);
