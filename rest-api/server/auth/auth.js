var jwt = require('jsonwebtoken');
var expressJwt = require ('express-jwt');
var config = require('./../config/config');
// Middleware that validates JsonWebTokens and sets req.user
var checkToken = expressJwt({secret: config.secrets.jwt});
var User = require('./../api/user/model');

exports.verifyUser = function(){
    return function(req, res, next){
        var username = req.body.username;
        var password = req.body.password;

        // if no username and password then stop
        if(!username || !password){
            res.status(400).send('You need a username and password');
        }
        
        // look user up in the DB so we can check if the password matches to the user
        User.findOne({username: username})
            .then(function(user){
                if(!user){
                    res.status(401).send('No user with the given username');
                }else{
                    if(!user.authenticate(password)){
                        res.status(401).send('Wrong password');
                    }else{
                        req.user = user;
                        next();
                    }
                }
            }, function(err){
                next(err);
            });

        // user the authenticate() method on a user doc
        // Passing in the posted password, it will hash the password as the same way the current got hashed  
    };
}

exports.decodeToken = function(){
    return function(req, res, next){
        // make it optional to place token on query string
        // if it is, place it on the headers where it should be, so checkToken can see it.
        // See follow the 'Bearer 034930493' format so checkToken can see it and decode it
        if(req.query && req.query.hasOwnProperty('access_token')){
            // 'Bearer' is cruel value for jwt, it's not any value can be input.
            // 'Bearer' is something like namespace of jwt
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }  

        // this will call next if token is valid and send error if its error.
        // It will attach the ddecoded token to req.user
        checkToken(req, res, next);
    };
};

exports.getFreshUser = function(){
    return function(req, res, next){
        // we'll have access to req.user here
        // because we'll use decodeToken in before this function in the middleware stack.
        // req.user will just be an object with the user id on it
        // NOTE that 'req.user' object is not from /api/users/:id, checkToken will create/add 'user' to req, this 'user' represents the user in browser 
        User.findById(req.user._id)
            .then(function(user){
                if(!user){
                    res.status(401).send('Unauthorized');
                }else{
                    req.user = user;
                    next();
                }
            }, function(err){
                next(err);
            });
    };
}

exports.signToken = function(id){
    return jwt.sign(
        {_id: id},
        config.secrets.jwt,
        {expiresIn: config.expireTime}
    );
}