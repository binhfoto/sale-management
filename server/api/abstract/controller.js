var _ = require('lodash');
var controller = {};

controller.params = (Model, populate = '') => function(req, res, next, id) {
    // use the id to find object from DB and attach to req
    Model
        .findById(id)
        .populate(populate)
        .exec()
        .then(
            function(item) {
                if(!item) {
                    next(new Error('Cannot found with id=' + id));
                }else {
                    req.item = item;
                    next();
                }
            }, 
            function(err){
                next(err);
            }
        );
};

controller.get = (Model, populate = '') => function(req, res, next) {
    Model
        .find({})
        .populate(populate)
        .exec()
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

controller.getOne = () => function(req, res, next) {
    var item = req.item;
    res.json(item);
};

controller.put = () => function(req, res, next) {
    var currentItem = req.item;
    var newItem = req.body;

    _.merge(currentItem, newItem);

    currentItem.save(function(err, saveditem){
        if(err){
            next(err);
        }else{
            res.json(saveditem);
        }
    });
};

controller.post = (Model) => function(req, res, next) {
    var newItem = req.body;
    Model
        .create(newItem)
        .then(
            function(item){
                res.json(item);
            }, 
            function(err){
                next(err);
            }
        );
};

controller.delete = () => function(req, res, next) {
    var item = req.item;
    item.remove(function(err, removedItem){
        if(err){
            next(err);
        }else{
            res.json(removedItem);
        }
    });
};

module.exports = controller;