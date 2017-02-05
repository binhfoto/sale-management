var moment = require('moment');

exports.generateDonHangId = function(_date) {
    let id = Math.random().toString(10).substr(2, 4);
    let date = moment(_date || new Date()).format('DD/MM/YYYY').toString();
    return 'HD' + id + '/' + date;
}