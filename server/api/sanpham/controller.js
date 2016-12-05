var SanPham = require('./model');
var _ = require('lodash');
var controller = {};

controller.params = function(req, res, next, id) {
    // use the id to find object from DB and attach to req
    SanPham
        .findById(id)
        .then(
            function(item) {
                if(!item) {
                    next(new Error('Khong co san pham voi id=' + id));
                }else {
                    req.sanpham = item;
                    next();
                }
            }, 
            function(err){
                next(err);
            }
        );
};

controller.get = function(req, res, next) {
    SanPham
        .find({})
        .then(
            function(items){
                //res.header("Access-Control-Expose-Headers", "x-total-count");
                res.header("X-Total-Count", items.length);
                res.json(items);
            }, 
            function(err){
                next(err);
            }
        );
};

controller.getOne = function(req, res, next) {
    var sanpham = req.sanpham;
    res.json(sanpham);
};

controller.put = function(req, res, next) {
    var cursanpham = req.sanpham;
    var newsanpham = req.body;

    _.merge(cursanpham, newsanpham);

    cursanpham.save(function(err, savedsanpham){
        if(err){
            next(err);
        }else{
            res.json(savedsanpham);
        }
    });
};

controller.post = function(req, res, next) {
    var newsanpham = req.body;
    SanPham
        .create(newsanpham)
        .then(
            function(sanpham){
                res.json(sanpham);
            }, 
            function(err){
                next(err);
            }
        );
};

controller.delete = function(req, res, next) {
    var sanpham = req.sanpham;
    sanpham.remove(function(err, removedItem){
        if(err){
            next(err);
        }else{
            res.json(removedItem);
        }
    });
};

module.exports = controller;