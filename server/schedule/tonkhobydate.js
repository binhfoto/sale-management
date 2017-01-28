
var createJob = require('./createJob');
var logger = require('../util/logger');
var SanPhamTonKho = require('../api/sanphamtonkho/model');
var SanPhamTonKhoByDate = require('../api/sanphamtonkhobydate/model');

var cronTime = '00 30 23 * * 1-6'; // job starts at 23:30:00, Monday through Saturday
//var cronTime = '*/5 * * * * *';
var task = function() {
    SanPhamTonKho.find({}, function (err, items) {
        if(err) {
            logger.log(err);
        } else {
            
            items.map( item => {
                
                var newItem = {};
                newItem.maSP = item.maSP;
                newItem.soLuong = item.soLuong;

                new SanPhamTonKhoByDate(newItem).save(function(newError, saved) {
                    logger.log(newError);
                });
            });
        }
    });
};

module.exports = createJob(cronTime, task);