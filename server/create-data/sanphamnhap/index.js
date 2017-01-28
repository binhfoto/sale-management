var MODEL_NAME = 'sanphamnhap';

var _ = require('lodash');
var moment = require('moment');
var logger = require('../../util/logger');
var random = require('../../util/random');

var createDoc = require('../util/createDocument');
var model = require('../../api/' + MODEL_NAME + '/model');

var create = function(params) {
    
    logger.log('Mongo - Creating', 20, MODEL_NAME + '(s)');
    
    var data = [];
    var min = 0;
    var max = params.sanphams.length-1;

    var phieuNhaps = [
        {
            maPhieuNhap: '10/20',
            soLuong: 5,
            ngayNhap: moment().toDate()
        },
        {
            maPhieuNhap: '47/11',
            soLuong: 5,
            ngayNhap: moment().subtract(1, 'days').toDate()
        },
        {
            maPhieuNhap: '43/12',
            soLuong: 10,
            ngayNhap: moment().subtract(2, 'days').toDate()
        }
    ];

    phieuNhaps.map( (phieuNhap) => {
        for(var i=0; i<phieuNhap.soLuong; i++) {
            var randomIndex = random(min, max);
            data.push({
                "maSP": params.sanphams[randomIndex]._id,
                "soLuongNhap": random(500, 1500),
                "maPhieuNhap": phieuNhap.maPhieuNhap,
                "ngayNhap": phieuNhap.ngayNhap
            });
        }
    });

    var promises = data.map(function(item){
        return createDoc(model, item);
    });

    return Promise.all(promises)
        .then(function(items) {
            return _.merge({sanphamnhaps: items}, params || {});
        });
};

module.exports = {
    create: create,
    model: model
};

