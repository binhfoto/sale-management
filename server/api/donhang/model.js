var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var donhangSchema = new Schema({
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
        ref: 'khachang',
        required: true        
    },
    // danh sách sản phẩm
    sanpham:[
        {
            maSP: {
                type: Schema.Types.ObjectId,
                ref: 'sanpham',
                required: true
            },
            soLuongXuat: {
                type: Number,
                required: true
            },
            xuatXuLy: Number,
            chietKhau: Number,
            thanhTien: Number
        }
    ],
    thueVAT: Number, // thuế VAT
    tongTien: Number, // tổng tiền
    thanhToan: Number, // thanh toán
    duNo: Number //dư nợ
});

// Duplicate the ID field.
donhangSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
donhangSchema.set('toJSON', {
    virtuals: true
});

var formatNumber = {
    "1": "000", // 0001
    "2": "00",  // 0020
    "3": "0",   // 0300
    "4": ""     // 4000
}

donhangSchema.statics = {
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
        return 'HD' + formatNumber[('' + this.number).length] + this.number + '/' + this.today.getDate() + '/' + this.today.getMonth() + '/' + this.today.getFullYear();
    }
};


module.exports = mongoose.model('donhang', donhangSchema);
