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
            function(user){
                if(!user){
                    next(new Error('No user with ' + id));
                }
                else {
                    req.user = user;
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
            function(users){
                res.json(users);
            },
            function(err){
                next(err);
            }
        );
};

controller.getOne = function(req, res, next) {
    res.json(req.user.toJson());
};

controller.put = function(req, res, next) {
    var newuser = req.body;
    var curuser = req.user; // mongoose object 

    _.merge(curuser, newuser);

    curuser.save(function(err, saveduser){
        if(err){
            next(err);
        }else{
            res.json(saveduser.toJson());
        }
    });
};

controller.post = function(req, res, next) {
    var newuser = new Model(req.body);
    
    newuser.save(function(err, user){
        if(err) return next(err);

        var token = signToken(user);
        res.json({token: token});
    });
};

controller.delete = function(req, res, next) {
    var user = req.user;
    user.remove(function(err, user){
        if(err){
            next(err);
        } else{
            res.json(user.toJson());
        }

    });
};

controller.me = function(req, res, next){
    res.json(req.user.toJson());
};

module.exports = controller;
