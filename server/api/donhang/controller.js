var Model = require('./model');
var _ = require('lodash');
var _super = require('../abstract/controller');

var controller = {};
controller.params = _super.params(Model, 'maKH');
controller.get = _super.get(Model, 'maKH');
controller.getOne = _super.getOne();
controller.put = _super.put(Model);
controller.post = _super.post(Model);
controller.delete = _super.delete();

/*
controller.params = function(req, res, next, id) {
    // use the id to find object from DB and attach to req
    DonHang
        .findById(id)
        .populate('khachhang sanpham')
        .exec()
        .then(
            function(item){
                if(!item){
                    next(new Error('Khong co don hang voi id=' + id));
                }else{
                    req.donhang = item;
                    next();
                }
            }, 
            function(err){
                next(err);
            }
        );
};

controller.get = function(req, res, next) {
    DonHang
        .find({})
        .populate('khachhang sanpham')
        .exec()
        .then(
            function(items){
                res.header("X-Total-Count", items.length);
                res.json(items);
            }, 
            function(err){
                next(err);
            }
        );
};

controller.getOne = function(req, res, next) {
    var donhang = req.donhang;
    res.json(donhang);
};

controller.put = function(req, res, next) {
    var curdonhang = req.donhang;
    var newdonhang = req.body;

    _.merge(curdonhang, newdonhang);

    curdonhang.save(function(err, item){
        if(err){
            next(err);
        }else{
            res.json(item);
        }
    });
};

controller.post = function(req, res, next) {
    var newdonhang = req.body;
    DonHang
        .create(newdonhang)
        .then(
            function(item){
                res.json(item);
            }, 
            function(err){
                next(err);
            }
        );
};

controller.delete = function(req, res, next) {
    var donhang = req.donhang;
    donhang.remove(function(err, item){
        if(err){
            next(err);
        }else{
            res.json(item);
        }
    });
};*/

module.exports = controller;