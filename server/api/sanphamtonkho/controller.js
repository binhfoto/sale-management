var SpTonKho = require('./model');
var _ = require('lodash');
var controller = {};

controller.params = function(req, res, next, id) {
    // use the id to find object from DB and attach to req
    SpTonKho
        .findById(id)
        .populate('sanpham')
        .exec()
        .then(
            function(item){
                if(!item){
                    next(new Error('Khong co san pham ton kho voi id=' + id));
                }else{
                    req.sptk = item;
                    next();
                }
            }, 
            function(err){
                next(err);
            }
        );
};

controller.get = function(req, res, next) {
    SpTonKho
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
    var sptk = req.sptk;
    res.json(sptk);
};

controller.put = function(req, res, next) {
    var curSptk = req.sptk;
    var newSptk = req.body;

    _.merge(curSptk, newSptk);

    curSptk.save(function(err, item){
        if(err){
            next(err);
        }else{
            res.json(item);
        }
    });
};

controller.post = function(req, res, next) {
    var newSptk = req.body;
    SpTonKho
        .create(newSptk)
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
    var sptk = req.sptk;
    sptk.remove(function(err, item){
        if(err){
            next(err);
        }else{
            res.json(item);
        }
    });
};

module.exports = controller;