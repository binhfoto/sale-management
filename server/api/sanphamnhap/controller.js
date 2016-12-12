var Model = require('./model');
var _ = require('lodash');
var _super = require('../abstract/controller');

var controller = {};
controller.params = _super.params(Model, 'sanpham');
controller.get = _super.get(Model, 'sanpham');
controller.getOne = _super.getOne();
controller.put = _super.put();
controller.post = _super.post(Model);
controller.delete = _super.delete();

/*controller.params = function(req, res, next, id) {
    // use the id to find object from DB and attach to req
    SanPhamNhap
        .findById(id)
        .populate('sanpham')
        .exec()
        .then(
            function(item){
                if(!item){
                    next(new Error('Cannot found with id=' + id));
                }else{
                    req.item = item;
                    next();
                }
            }, 
            function(err){
                next(err);
            }
        );
};

controller.get = function(req, res, next) {
    SanPhamNhap
        .find({})
        .populate('sanpham')
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
    var spnhap = req.sanphamnhap;
    res.json(spnhap);
};

controller.put = function(req, res, next) {
    var curspnhap = req.sanphamnhap;
    var newspnhap = req.body;

    _.merge(curspnhap, newspnhap);

    curspnhap.save(function(err, item){
        if(err){
            next(err);
        }else{
            res.json(item);
        }
    });
};

controller.post = function(req, res, next) {
    var newspnhap = req.body;
    SanPhamNhap
        .create(newspnhap)
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
    var spnhap = req.sanphamnhap;
    spnhap.remove(function(err, item){
        if(err){
            next(err);
        }else{
            res.json(item);
        }
    });
};*/

module.exports = controller;