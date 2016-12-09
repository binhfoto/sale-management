var Model = require('./model.js');
var signToken = require('../../auth/auth').signToken;
var _ = require('lodash');
var _super = require('../abstract/controller');

var controller = {};

controller.params = function(req, res, next, id){
    Model
        .findById(id)
        .select('-password') // '-' means exclude this property from querying
        .exec()
        .then(
            function(item){
                if(!item){
                    next(new Error('No item with ' + id));
                }
                else {
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
    Model
        .find()
        .select('-password') // '-' means exclude this property from querying
        .exec()
        .then(
            function(items){
                res.json(items);
            },
            function(err){
                next(err);
            }
        );
};

controller.getOne = function(req, res, next) {
    res.json(req.item.toJson());
};


controller.put = _super.put();
controller.post = _super.post(Model);
controller.delete = _super.delete();

/*controller.put = function(req, res, next) {
    var newitem = req.body;
    var curitem = req.item; // mongoose object 

    _.merge(curitem, newitem);

    curitem.save(function(err, saveditem){
        if(err){
            next(err);
        }else{
            res.json(saveditem.toJson());
        }
    });
};

controller.post = function(req, res, next) {
    var newitem = new Model(req.body);
    
    newitem.save(function(err, item){
        if(err) return next(err);

        var token = signToken(item._id);
        res.json({token: token});
    });
};

controller.delete = function(req, res, next) {
    var item = req.item;
    item.remove(function(err, item){
        if(err){
            next(err);
        } else{
            res.json(item.toJson());
        }

    });
};*/

controller.me = function(req, res, next){
    res.json(req.item.toJson());
};

module.exports = controller;
