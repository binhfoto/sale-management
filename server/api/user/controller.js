var User = require('./model.js');
var signToken = require('../../auth/auth').signToken;
var _ = require('lodash');

var controller = {};

controller.params = function(req, res, next, id){
    User
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

controller.get = function(req, res, next){
    User
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
    var newUser = req.body;
    var curUser = req.user; // mongoose object 

    _.merge(curUser, newUser);

    curUser.save(function(err, savedUser){
        if(err){
            next(err);
        }else{
            res.json(savedUser.toJson());
        }
    });
};

controller.post = function(req, res, next) {
    var newUser = new User(req.body);
    
    newUser.save(function(err, user){
        if(err) return next(err);

        var token = signToken(user._id);
        res.json({token: token});
    });

    /*var newUser = req.body;
    User
        .create(newUser)
        .then(
            function(user){
                res.json(user);
            },
            function(err){
                next(err);
            }
        );*/
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

    /*
    User.remove(user, function(err){

    });*/
};

controller.me = function(req, res, next){
    res.json(req.user.toJson());
};

module.exports = controller;
