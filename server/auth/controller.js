var User = require('../api/user/model');
var signToken = require('./auth').signToken;

exports.signin = function(req, res, next){
    // req.user will be there from the middleware 'verifyUser''
    // then we can just create a token and send it back for the client to consume
    var token = signToken(req.user);
    res.json({token:token});
}